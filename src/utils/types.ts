import { RouterOutputs } from "./api";


export interface DayItemType {  
    activity: string;
    day: number;
    endDateTime: string;
    isHalal: boolean;
    location: string;
    startDateTime: string;
}

export interface Review {
    id: string,
    username: string,
    content: string,
    rating: number,
}

type FullPlan = RouterOutputs["plan"]["getFullPlan"]
export type PlanItems = FullPlan["items"]
export type PlanItem = PlanItems[number]

export type ItineraryItemType = RouterOutputs['plan']['findAll'][number]
export type Reviews = RouterOutputs['review']['getPlanReviews']['reviews']