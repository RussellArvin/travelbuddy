import { Fragment } from "react";
import { DayItemType, PlanItem } from "../../utils/types";
import { Box, Grid } from "@mui/material";
import { RouterOutputs } from "../../utils/api";



export default function DayItem({ dayItem }: { dayItem: PlanItem }) {
    const { activity, startDate, endDate, isHalal, location, imgUrl } = dayItem;
    console.log(dayItem)

    const changeDateFormat = (inputTime: string) => {
        console.log(inputTime)
        //console.log(typeof inputTime)
        const WithZeroOffset = inputTime.replace(/([+-])(\d:\d\d)/, "$10$2");
        const time = new Date(WithZeroOffset);
        const formattedTime = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: true }).format(time);
        return formattedTime;
    };

    return (
        <Fragment>
            <Fragment>
                <Grid container spacing={6} sx={{ marginBottom: "20px" }}>
                    <Grid item xs={5}>
                        <img src={imgUrl} style={{ display: 'block', width: '100%' }}></img>
                    </Grid>
                    <Grid item xs={7}>
                        <h1>{activity}</h1>
                        <h1>start time: {changeDateFormat(new Date(startDate).toISOString())}</h1>
                        <h1>end time: {changeDateFormat(new Date(endDate).toISOString())}</h1>
                        {{ isHalal } && <h1>isHalal</h1>}
                        <h1>location: {location}</h1>
                    </Grid>
                </Grid>
            </Fragment>
        </Fragment>
    );
};