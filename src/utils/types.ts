import { RouterOutputs } from "./api";

export interface ItineraryItemType {
    location: string;
    startBudget: number,
    endBudget: number,
    duration: number,
    pax: number,
    rating: boolean,
}

export interface DayItemType {  
    activity: string;
    day: number;
    endDateTime: string;
    isHalal: boolean;
    location: string;
    startDateTime: string;
}

type FullPlan = RouterOutputs["plan"]["getFullPlan"]
export type PlanItems = FullPlan["items"]
export type PlanItem = PlanItems[number]