import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const connectionRequest = createTRPCRouter({
  sendRequest: protectedProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const sendingUser = ctx.session.user;
      const receivingUser = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (sendingUser.email === receivingUser?.email) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Sender and receiver cant be same.",
        });
      }

      if (!receivingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User with this email not found",
        });
      }

      const pendingRequest = await ctx.db.connectionRequest.findFirst({
        where: {
          status: "pending",
          OR: [
            {
              fromId: sendingUser.id,
              toId: receivingUser.id,
            },
            {
              fromId: receivingUser.id,
              toId: sendingUser.id,
            },
          ],
        },
      });
      if (pendingRequest) {
        if (pendingRequest.fromId === sendingUser.id) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Request alrready in pending",
          });
        } else {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "You already get a connection request from the user",
          });
        }
      }
      const response = await ctx.db.connectionRequest.create({
        data: {
          fromId: sendingUser.id,
          toId: receivingUser.id,
        },
      });
      return response;
    }),
  getConnections: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    if (!user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Session expired, Please Login Again.",
      });
    }
    const connections = await ctx.db.connectionRequest.findMany({
      where: {
        status: "pending",
        OR: [
          {
            fromId: user.id,
          },
          {
            toId: user.id,
          },
        ],
      },
      include: {
        from: true,
        to: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return connections;
  }),
  sendConnectionResponse: protectedProcedure
    .input(z.object({ response: z.boolean(), reqId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.db.connectionRequest.update({
        where: { id: input.reqId, status: "pending" },
        data: {
          status: input?.response ? "accepted" : "rejected",
        },
      });
      return response;
    }),
  deleteConnection: protectedProcedure
    .input(z.object({ reqId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.db.connectionRequest.delete({
        where: { id: input.reqId },
      });
      return response;
    }),
});
