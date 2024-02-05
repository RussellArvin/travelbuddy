import { Fragment } from "react";
import { DayItemType } from "../../utils/types";
import { Box, Grid } from "@mui/material";


export default function DayItem({ dayItem }: { dayItem: DayItemType }) {
    const { activity, startDateTime, endDateTime, isHalal, location } = dayItem;

    const changeDateFormat = (inputTime: string) => {
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
                        <img src="https://travelbuddy-public-images.s3.ap-southeast-1.amazonaws.com/placeholder.jpg" style={{ display: 'block', width: '100%' }}></img>
                    </Grid>
                    <Grid item xs={7}>
                        <h1>{activity}</h1>
                        <h1>start time: {changeDateFormat(startDateTime)}</h1>
                        <h1>end time: {changeDateFormat(endDateTime)}</h1>
                        {{ isHalal } && <h1>isHalal</h1>}
                        <h1>location: {location}</h1>
                    </Grid>
                </Grid>
            </Fragment>
        </Fragment>
    );
};