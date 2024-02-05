import OpenAI from "openai"
import { db } from "../../db";
import { conversation, planItems } from "../../db/schema";
import { getImgOfPlace } from "./googlePlaces";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

type ChatMessage = OpenAI.Chat.Completions.ChatCompletionMessageParam;
type ChatRole = ChatMessage["role"]

type Activity = {
    day: number;
    activity: string;
    location: string;
    startDateTime: string;
    endDateTime: string;
    isHalal: boolean;
}



export const startChat = async (plan: Plan): Promise<string> => {

    const prompt = `${process.env.INITIAL_PROMPT1} We want to go to ${plan.city}, with a budget from $${plan.startBudget} - $${plan.endBudget} and we have ${plan.groupSize} people going.  The trip starts on ${plan.startDate} and ends on ${plan.endDate}. ${process.env.INITIAL_PROMPT2}`

   const messages : ChatMessage[] = [
    {
        role:"system",
        content: prompt
       }
   ]

   return await createCompletion(messages,plan.id,plan.city)

}

export const resumeChat = async (messages:ChatMessage[], reply:string, planId:string, city: string): Promise<string> => {

    messages.push({
        role:"user",
        content:reply
    })

    return await createCompletion(messages,planId,city)
}


const createCompletion = async (messages: ChatMessage[], planId: string, city: string) => {
    const completion  = await openai.chat.completions.create({
        messages,
    //model: "gpt-3.5-turbo",
    model: "gpt-4-1106-preview",
    max_tokens:4000
    })

    const reply = completion.choices[0]?.message.content!


        await insertChatToDB("user",messages[messages.length-1]?.content as string,planId)
        await insertChatToDB("assistant",reply,planId)


    const jsonRegex = /```json\n([\s\S]*?)\n```/;

    const match = reply.match(jsonRegex)

    if(match) saveItems(reply,planId,city)

    return reply
}

const insertChatToDB = async (role: ChatRole, content: string, planId: string) => {
    await db.insert(conversation)
    .values({
        planId,
        role,
        content
    })
}


const saveItems = async (rawData: string, planId: string, city: string) => {
    const jsonRegex = /```json\n([\s\S]*?)\n```/;

    const match = rawData.match(jsonRegex)

    if(!match || !match[1]) throw Error

    const activities: Activity[] = JSON.parse(match[1]);

    const insertValuesPromises = activities.map(async({activity,day,startDateTime,endDateTime,location,isHalal})=>{
        return {
            planId,
            activity,
            day,
            location,
            isHalal: !!isHalal, //Used double negation as the value can be null sometimes
            startDate: new Date(startDateTime),
            endDate: new Date(endDateTime),
            imgUrl: await getImgOfPlace(`${location} ${city}`)
        }
    })

    const insertValues = await Promise.all(insertValuesPromises)

    await db.insert(planItems).values(insertValues)
    return;
}