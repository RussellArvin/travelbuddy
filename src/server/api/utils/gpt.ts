import OpenAI from "openai"
import { db } from "../../db";
import { conversation, planItems } from "../../db/schema";

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

   return await createCompletion(messages,plan.id)

}

export const resumeChat = async (messages:ChatMessage[], reply:string, planId:string): Promise<string> => {

    messages.push({
        role:"user",
        content:reply
    })

    return await createCompletion(messages,planId)
}


const createCompletion = async (messages: ChatMessage[], planId: string) => {
    const completion  = await openai.chat.completions.create({
        messages,
    //model: "gpt-3.5-turbo",
    model: "gpt-4-1106-preview",
    max_tokens:4000
    })

    const reply = completion.choices[0]?.message.content!
    console.log(reply)

    await Promise.all([
        insertChatToDB("user",messages[messages.length-1]?.content as string,planId),
        insertChatToDB("assistant",reply,planId),
    ])

    console.log("Items saved!")

    const jsonRegex = /```json\n([\s\S]*?)\n```/;

    const match = reply.match(jsonRegex)

    if(match) saveItems(reply,planId)

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


const saveItems = async (rawData: string, planId: string) => {
    console.log("HERE IS WHEN THE THING IS BEING SAVED")
    const jsonRegex = /```json\n([\s\S]*?)\n```/;

    const match = rawData.match(jsonRegex)

    if(!match || !match[1]) throw Error

    const activities: Activity[] = JSON.parse(match[1]);

    const insertValues = activities.map(({activity,day,startDateTime,endDateTime,location,isHalal})=>{
        return {
            planId,
            activity,
            day,
            location,
            isHalal,
            startDate: startDateTime,
            endDate: endDateTime
        }
    })

    await db.insert(planItems).values(insertValues)
    return;
}