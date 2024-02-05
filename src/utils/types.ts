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