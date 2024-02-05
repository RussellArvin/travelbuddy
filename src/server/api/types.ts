export interface Plan {
    id:string,
    userId: string,
    city: string,
    startDate: string,
    endDate: string,
    startBudget: number,
    endBudget: number,
    groupSize:number
}

interface PlanItems {
    location:string,
    startDate: Date,
    endDate: Date,
    activity: string,
    imgUrl: string,
    day:number
}

export interface FullPlan extends Plan{
    items: PlanItems[]
}