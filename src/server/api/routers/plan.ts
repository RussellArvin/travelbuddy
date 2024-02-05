import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "../../db"
import { TRPCError } from "@trpc/server";
import { asc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { conversation, plan, planItems } from "../../db/schema";
import { uuid } from "uuidv4";
import { resumeChat, startChat } from "../utils/gpt";
import OpenAI from "openai";
import { PgBooleanBuilder } from "drizzle-orm/pg-core";

export const planRouter = createTRPCRouter({
    findAll: protectedProcedure
    .query(async({ctx})=>{
        const planData = await db
        .select({
            id: plan.id,
            userId: plan.userId,
            startBudget: plan.startBudget,
            endBudget: plan.endBudget,
            startDate: plan.startDate,
            endDate: plan.endDate,
            rating: plan.rating
        })
        .from(plan)

        if(!planData || planData.length == 0) throw new TRPCError({
            code:"NOT_FOUND"
        })
        return planData
    }),
    findOne: protectedProcedure
    .input(
        z.object({
            id: z.string()
        })
    )
    .query(async ({ctx, input})=>{
        const planData = await db
            .select({
                id: plan.id,
                userId: plan.userId,
                startBudget: plan.startBudget,
                endBudget: plan.endBudget,
                startDate: plan.startDate,
                endDate: plan.endDate,
                rating: plan.rating
            })
            .from(plan)
            .where(eq(plan.id,input.id))

        if(!planData[0]) throw new TRPCError({
            code:"NOT_FOUND"
        })

        return planData[0]
    }),
    getPlanItems: protectedProcedure
    .input(z.object({
        id: z.string()
    }))
    .query(async({ctx,input})=>{
        const rawPlanData = await db
            .select({
                id:plan.id
            })
            .from(plan)
            .where(eq(plan.id,input.id))

        const planData = rawPlanData[0]

        if(!planData) throw new TRPCError({code:"NOT_FOUND"})

        const rawPlanItems = await db
            .select({
                id: planItems.id,
                activity: planItems.activity,
                startDate: planItems.startDate,
                endDate: planItems.endDate,
                location: planItems.location,
                isHalal: planItems.isHalal
            })
            .from(planItems)
            .where(eq(planItems.planId,input.id))
        
        const itemData = rawPlanItems[0]

        if(!itemData) throw new TRPCError({code:'NOT_FOUND'})

        return itemData
    }),
    create: protectedProcedure
    .input(
        z.object({
            startBudget: z.number(),
            endBudget: z.number(),
            city: z.string(),
            startDate: z.date(),
            endDate: z.date(),
            groupSize: z.number()
        })
    )
    .mutation(async ({ctx,input})=>{

        const {
            endBudget,
            startBudget,
            city,
            startDate,
            endDate,
            groupSize
        } = input;

        const planId = uuid();

        await db.insert(plan)
        .values({
            // @ts-ignore
            id: planId,
            userId: ctx.auth.userId,
            startBudget,
            endBudget,
            city,
            startDate,
            endDate,
            groupSize
        })

        return planId
    }),
    chat:protectedProcedure
    .input(z.object({
        id: z.string(),
        message: z.string()
    }))
    .mutation(async({ctx,input}) => {
        const rawPlanData = await db
            .select({
                id: plan.id,
                userId: plan.userId,
                startBudget: plan.startBudget,
                endBudget: plan.endBudget,
                startDate: plan.startDate,
                endDate: plan.endDate,
                groupSize: plan.groupSize,
                city: plan.city,
            })
            .from(plan)
            .where(eq(plan.id,input.id))

        if(!rawPlanData[0]) throw new TRPCError({
            code:"NOT_FOUND"
        })

        const planData: Plan = rawPlanData[0]
        
        if(planData.userId !== ctx.auth.userId) throw new TRPCError({
            code:"UNAUTHORIZED"
        })

        const chatHistory = await db.select({
            role:conversation.role,
            content:conversation.content
        })
        .from(conversation)
        .where(eq(conversation.planId,planData.id))
        .orderBy(asc(conversation.createdAt))

        const reply = chatHistory.length > 0 ? 
            await resumeChat(chatHistory as OpenAI.Chat.Completions.ChatCompletionMessageParam[],input.message,input.id,planData.city)
            : await startChat(planData)

        return reply;
    }),
    getChatHistory: protectedProcedure
    .input(z.object({
        id:z.string()
    }))
    .query(async ({ctx,input})=>{
        const rawPlanData = await db
            .select({
                id: plan.id,
                userId: plan.userId,
                startBudget: plan.startBudget,
                endBudget: plan.endBudget,
                startDate: plan.startDate,
                endDate: plan.endDate,
                groupSize: plan.groupSize,
                city: plan.city,
            })
            .from(plan)
            .where(eq(plan.id,input.id))

        if(!rawPlanData[0]) throw new TRPCError({
            code:"NOT_FOUND"
        })

        const planData: Plan = rawPlanData[0]

        if(planData.userId != ctx.auth.userId) throw new TRPCError({
            code:"UNAUTHORIZED"
        })

        const chatHistory = await getChatHistory(input.id)

        if(!chatHistory || chatHistory.length == 0){
            await startChat(planData)
            return (await getChatHistory(input.id))
        }
        else return (chatHistory)

    })

})

const getChatHistory = async (planId: string)=> {
    const chatHistory = await db.select({
        role:conversation.role,
        content:conversation.content
    })
    .from(conversation)
    .where(eq(conversation.planId,planId))
    .orderBy(asc(conversation.createdAt))

    return chatHistory;
}

interface ChatHistory {
    content: string;
    role:string;
}

const handleChat = (chatHistory: ChatHistory[]) => {
    //chatHistory = chatHistory.splice(1);

    if(chatHistory[chatHistory.length-1]?.content.includes('THE JSON IS')){
        chatHistory.pop()
        return chatHistory
    }
}