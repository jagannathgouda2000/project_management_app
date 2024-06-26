import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import Error from "next/error";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        members: z.array(z.string()),
      }),
    )
    .mutation(({ ctx, input }) => {
      const user = ctx.session.user;
      const check = input.members.find((member) => member == user.id);
      if (!check) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You must include yourself in your project.",
        });
      }
      const response = ctx.db.project.create({
        data: {
          title: input.title,
          description: input.description,
          createdById: user.id,
          members: {
            connect: input.members.map((id) => ({ id })),
          },
        },
      });
      return response;
    }),
  getAllProjectDetails: protectedProcedure.query(async ({ ctx, input }) => {
    const user = ctx.session.user;
    const projects = await ctx.db.project.findMany({
      where: {
        isDeleted: false,
        members: {
          some: {
            id: user.id,
          },
        },
      },
      include: {
        members: true,
        tasks: {
          include: {
            assignedTo: true,
          },
        },
        createdBy: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return projects;
  }),
  getProjectById: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const project = await ctx.db.project.findUnique({
        where: {
          id: input.id,
        },
        include: {
          members: true,
          tasks: {
            include: {
              assignedTo: true,
            },
          },
          createdBy: true,
        },
      });
      if(!project?.members.some((member) => member.id === user.id)){
        throw new TRPCError({
          code:"BAD_REQUEST",
          message:"Project Not Found"
        })
      }
      return project
    }),
  updateProject: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
        members: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const check = input.members.find((member) => member == user.id);
      if (!check) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You must include yourself in your project.",
        });
      }
      const response = ctx.db.project.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          createdById: user.id,
          members: {
            set: input.members.map((id) => ({ id })),
          },
        },
      });
      return response;
    }),
});
