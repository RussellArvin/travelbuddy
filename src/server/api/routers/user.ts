import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "../../db"
import { getUserDataFromClerk } from "../utils/getUserDataFromClerk";
import { user } from "../../db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
    register: protectedProcedure.mutation(async ({ctx})=>{
            const { email, username } = await getUserDataFromClerk(ctx.auth.userId);

            const userData = await db
                .insert(user)
                .values({
                    id: ctx.auth.userId,
                    email,
                    username
                })
                .returning()

            if(!userData[0]) throw new TRPCError({
                code:"INTERNAL_SERVER_ERROR",
                message: "Error in creating user"
            })

            return userData[0]
    }),
    get: protectedProcedure.query(async ({ctx})=>{
        const userData = await db
            .select({
                username: user.username,
                email:user.email
            })
            .from(user)
            .where(eq(user.id,ctx.auth.userId))

        if(!userData[0]) throw new TRPCError({
            code:"NOT_FOUND"
        })    

        return userData[0]
    })
})