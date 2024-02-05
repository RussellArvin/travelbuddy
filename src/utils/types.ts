import { RouterOutputs } from "./api";

export interface ItineraryItemType {
    id:number;
    location: string;
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