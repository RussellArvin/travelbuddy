import { z } from "zod";
import { db } from "../../db"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { plan, review, user } from "../../db/schema";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const reviewRouter = createTRPCRouter({
  getPlanReviews: protectedProcedure
  .input(z.object({
    planId:z.string()
  }))
  .query(async ({ctx,input})=>{
    const { planId } = input;

    const reviewData = await db.select({
        id: review.id,
        content:review.content,
        rating: review.rating,
        username: user.username,
        userId: user.id,
    })
    .from(review)
    .leftJoin(user,eq(user.id,review.userId))
    .where(eq(review.planId,planId))


    return {
        reviews: reviewData,
        hasReviewed: reviewData.some(({userId}) => userId == ctx.auth.userId)
        //Checks if there is at least one element that matches the condition
    }

  }),
  create: protectedProcedure
  .input(z.object({
    planId: z.string(),
    content: z.string(),
    rating: z.number()
      .min(1, { message: "Rating must be at least 1." })
      .max(5, { message: "Rating must be no more than 5." })
  }))
  .mutation(async({ctx,input})=>{
    const rawPlan = await db
    .select({
        id: plan.id
    })
    .from(plan)
    .where(eq(plan.id,input.planId))

    if(!rawPlan[0] || rawPlan.length == 0) return new TRPCError({
        code:"NOT_FOUND"
    })

    const rawReviews = await db
    .select({
        id: review.id
    })
    .from(review)
    .where(and(
        eq(review.userId,ctx.auth.userId),
        eq(review.planId,input.planId)
    ))
    .limit(1)

    if(rawReviews[0] || rawReviews.length != 0) return new TRPCError({
        code:"FORBIDDEN"
    })

    await db.insert(review).values({
        planId:input.planId,
        userId:ctx.auth.userId,
        content:input.content,
        rating: input.rating
    })

    return
  })
});
