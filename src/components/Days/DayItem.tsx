import { Fragment } from "react";
import { DayItemType, PlanItem } from "../../utils/types";
import { Box, Grid, Typography } from "@mui/material";
import { RouterOutputs } from "../../utils/api";



export default function DayItem({ dayItem }: { dayItem: PlanItem }) {
    const { activity, startDate, endDate, isHalal, location, imgUrl } = dayItem;

    const changeDateFormat = (date: Date) => {
        let hours: number = date.getHours();

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
                <Grid container spacing={6} sx={{ marginBottom: "60px" }}>
                    <Grid item xs={5}>
                        <img src={imgUrl} style={{ display: 'block', width: '100%' }}></img>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="h4">{activity}</Typography>
                        <Typography variant="h6">start time: {changeDateFormat(startDate)}</Typography>
                        <Typography variant="h6">end time: {changeDateFormat(endDate)}</Typography>
                        { isHalal && <Typography variant="h6">isHalal</Typography>}
                        <Typography variant="h6">location: {location}</Typography>
                    </Grid>
                </Grid>
            </Fragment>
        </Fragment>
    );
};