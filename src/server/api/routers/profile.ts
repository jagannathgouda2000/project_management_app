import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const profileRouter = createTRPCRouter({
    updateUser: protectedProcedure.input(z.object({ name: z.string() }))
    .mutation(async({ctx,input}) => {
        const updatedUser = await ctx.db.user.update({
            where:{
                id: ctx.session.user.id
            },
            data:{
                name:input.name,
            }
        })
        return updatedUser
    })
})
