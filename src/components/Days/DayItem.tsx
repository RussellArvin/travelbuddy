import { Fragment } from "react";
import { DayItemType, PlanItem } from "../../utils/types";
import { Box, Grid } from "@mui/material";
import { RouterOutputs } from "../../utils/api";



export default function DayItem({ dayItem }: { dayItem: PlanItem }) {
    const { activity, startDate, endDate, isHalal, location, imgUrl } = dayItem;

    const changeDateFormat = (date: Date) => {
        let hours: number = date.getUTCHours();

        // Determine AM or PM suffix
        const amPm: string = hours >= 12 ? 'PM' : 'AM';

        // Convert 24h time to 12h time format
        hours = hours % 12 || 12;

        // Return the formatted string
        return `${hours}${amPm}`;
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
                        <h1>start time: {changeDateFormat(startDate)}</h1>
                        <h1>end time: {changeDateFormat(endDate)}</h1>
                        { isHalal && <h1>isHalal</h1>}
                        <h1>location: {location}</h1>
                    </Grid>
                </Grid>
            </Fragment>
        </Fragment>
    );
};