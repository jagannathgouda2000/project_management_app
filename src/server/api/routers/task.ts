import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const taskRouter = createTRPCRouter({
  createTask: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string(),
        assignedTo: z.array(z.string()),
        priority: z.string(),
        status: z.string(),
        projectId: z.string().min(1),
        deadline: z.any(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const response = await ctx.db.task.create({
        data: {
          title: input.title,
          description: input.description,
          status: input.status,
          createdById: user.id,
          deadline: input.deadline,
          priority: input.priority,
          projectId: input.projectId,
          assignedTo: {
            connect: input.assignedTo.map((k) => ({ id: k })),
          },
        },
      });
      return response;
    }),
  updateTask: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        description: z.string(),
        assignedTo: z.array(z.string()),
        priority: z.string(),
        status: z.string().min(1),
        projectId: z.string().min(1),
        deadline: z.any(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const response = await ctx.db.task.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          status: input.status,
          createdById: user.id,
          deadline: input.deadline,
          priority: input.priority,
          projectId: input.projectId,
          assignedTo: {
            connect: input.assignedTo.map((k) => ({ id: k })),
          },
        },
      });
      return response;
    }),
  getTasksByprojectId: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const response = await ctx.db.task.findMany({
        where: {
          projectId: input.id,
        },
        include: {
          assignedTo: true,
          createdBy: true,
        },
      });
      if (!response) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "NO tasks found for the project",
        });
      }
      return response;
    }),
  deleteTaskById: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.db.task.delete({
        where: {
          id: input.id,
        },
      });
      return response;
    }),
});
