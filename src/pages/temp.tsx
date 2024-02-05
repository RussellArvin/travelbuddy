import React, { Fragment, useEffect, useState } from 'react';
import ChatWindow from '../components/Chatbox/ChatWindow';
import { Container, TextField, Button, Box, Grid, List, ListItem } from '@mui/material';
import { NextPage } from 'next';
import { api, RouterOutputs } from '../utils/api';
import { useRouter } from 'next/router';
import LoadingSpinner from '../components/LoadingSpinner';
import { MainHeader } from '../components/Layout/MainHeader/MainHeader';
import { DayItemType } from '../utils/types';
import Day from '../components/Days/Day';
import { uuid } from "uuidv4";


const temp: NextPage = () => {
    const tripDetailItemStyle = {
        p: 0,
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'background.paper',
    };

    const DUMMY_ITINERARY: DayItemType[] = [{
        activity: "1Check-in at Hotel",
        day: 1,
        isHalal: false,
        location: "The LOOSOOASDOASD-Carlton Jakarta, Mega Kuningan",
        startDateTime: "2024-02-06T08:00:00+8:00",
        endDateTime: "2024-02-06T10:00:00+08:00",
    }, {
        activity: "2Check-asdasd at Hotel",
        day: 1,
        isHalal: false,
        location: "The asdasdasdasd-Carlton Jakarta, Mega Kuningan",
        startDateTime: "2024-02-06T10:00:00+8:00",
        endDateTime: "2024-02-06T11:00:00+08:00",
    }, {
        activity: "3Check-IM COOL at Hotel",
        day: 1,
        isHalal: false,
        location: "The DOG-Carlton Jakarta, Mega Kuningan",
        startDateTime: "2024-02-06T11:00:00+8:00",
        endDateTime: "2024-02-06T15:00:00+08:00",
    }, {
        activity: "4-in at Hotel",
        day: 2,
        isHalal: false,
        location: "The Ritz-Carlton Jakarta, Mega Kuningan",
        startDateTime: "2024-02-06T15:00:00+8:00",
        endDateTime: "2024-02-06T11:00:00+08:00",
    }, {
        activity: "5IM ADMSJKASD-in at Hotel",
        day: 2,
        isHalal: false,
        location: "The Ritz-Carlton Jakarta, Mega Kuningan",
        startDateTime: "2024-02-06T15:00:00+8:00",
        endDateTime: "2024-02-06T18:00:00+08:00",
    }, {
        activity: "6asd-in at Hotel",
        day: 3,
        isHalal: false,
        location: "The BO THE BUIAS-Carlton Jakarta, Mega Kuningan",
        startDateTime: "2024-02-06T08:00:00+8:00",
        endDateTime: "2024-02-06T13:00:00+08:00",
    }]


    const groupedByDay: DayItemType[][] = DUMMY_ITINERARY.reduce(
        (result: DayItemType[][], item: DayItemType) => {
            const dayIndex = item.day - 1; // Adjust to 0-based index
            result[dayIndex] = result[dayIndex] || []; // Initialize if undefined
            result[dayIndex]!.push(item); // Non-null assertion
            return result;
        },
        []
    );

    const daysDisplayed = groupedByDay.map((item: DayItemType[]) => (
        <Day key={uuid()} dayItems={item} />
    ));

    const countryImages = new Map([
        ["Jakarta", "https://s7g10.scene7.com/is/image/barcelo/things-to-do-in-jakarta_jakarta-tourist-spots?&&fmt=webp-alpha&qlt=75&wid=1300&fit=crop,1"],
        ["New York", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/800px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg"],
        ["Seoul", "https://static.independent.co.uk/2022/12/29/14/iStock-464629385.jpg"],
        ["Taipei", "https://res.klook.com/image/upload/fl_lossy.progressive,w_800,c_fill,q_85/Taipei_CP1125X624_1.jpg"],
        ["Tokyo", "https://media.cntraveller.com/photos/6343df288d5d266e2e66f082/16:9/w_2560%2Cc_limit/tokyoGettyImages-1031467664.jpeg"],
    ]);

    const city = "Jakarta";

    return (
        <Fragment>
            <MainHeader />
            <Container sx={{ margin: "1vw 2vw 0 2vw", }}>
                <Grid container>
                    <Grid item xs={4} sx={{ border: "2px solid black" }}>
                        <Box sx={{ height: "256px", width: "100%" }}>
                            <img src={countryImages.get(city)}></img>
                        </Box>
                        <List style={tripDetailItemStyle} aria-label="Trip details">
                            <ListItem>Trip to Jakarta</ListItem>
                            <ListItem>11/3/22 - 11/5/22</ListItem>
                            <ListItem>3-8 Pax</ListItem>
                            <ListItem>Budget: $1000-4000</ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={8}>
                        {daysDisplayed}
                    </Grid>
                </Grid>

            </Container>
        </Fragment>
    );
};

export default temp;