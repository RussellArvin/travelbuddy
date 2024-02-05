import React, { Fragment, useEffect, useState } from 'react';
import { Container, TextField, Button, Box, Grid, List, ListItem } from '@mui/material';
import { NextPage } from 'next';
import { api, RouterOutputs } from '../../../utils/api'
import { useRouter } from 'next/router';
import { MainHeader } from '../../../components/Layout/MainHeader/MainHeader';
import Day from '../../../components/Days/Day';
import { uuid } from "uuidv4";
import { PlanItem } from '../../../utils/types';
import ReviewsList from '../../../components/Reviews/ReviewsList';
import AddReview from '../../../components/Reviews/AddReview';

const Overview: NextPage = () => {
    const router = useRouter()
    const { data: planData, isLoading: isPlanDataLoading } = api.plan.getFullPlan.useQuery({
        id: router.query.id as string
    }, {
        enabled: router.isReady
    })



    // toggle navbar state
    const [toggleNavbar, setToggleNavBar] = useState(false)
    

    // check if need to can Review
    const [canAddReview, setCanAddReview] = useState(true);

    const handleNavigationOnClick = () => {
        setToggleNavBar(!toggleNavbar);
    }

    const tripDetailItemStyle = {
        p: 0,
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'background.paper',
    };

    if(isPlanDataLoading || !planData){
        return (
            <>
            <h1>Loading</h1>
            </>
        )
    }

    const planItems = planData.items

    const groupedByDay: PlanItem[][] = planItems.reduce(
        (result: PlanItem[][], item: PlanItem) => {
            const dayIndex = item.day - 1; // Adjust to 0-based index
            result[dayIndex] = result[dayIndex] || []; // Initialize if undefined
            result[dayIndex]!.push(item); // Non-null assertion
            return result;
        },
        []
    );

    const daysDisplayed = groupedByDay.map((item: PlanItem[]) => (
        <Day key={uuid()} dayItems={item} />
    ));

    const countryImages = new Map([
        ["Jakarta", "https://s7g10.scene7.com/is/image/barcelo/things-to-do-in-jakarta_jakarta-tourist-spots?&&fmt=webp-alpha&qlt=75&wid=1300&fit=crop,1"],
        ["New York", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/800px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg"],
        ["Seoul", "https://static.independent.co.uk/2022/12/29/14/iStock-464629385.jpg"],
        ["Taipei", "https://res.klook.com/image/upload/fl_lossy.progressive,w_800,c_fill,q_85/Taipei_CP1125X624_1.jpg"],
        ["Tokyo", "https://media.cntraveller.com/photos/6343df288d5d266e2e66f082/16:9/w_2560%2Cc_limit/tokyoGettyImages-1031467664.jpeg"],
    ]);

    const formatDate = (date: Date): string => {
        // Extract the parts of the date
        let day: string | number = date.getDate();
        let month: string | number = date.getMonth() + 1; // getMonth() returns month from 0 to 11
        let year: string = date.getFullYear().toString().substr(-2); // Get last two digits of the year
      
        // Format the day and month to ensure they are in 'MM' or 'DD' format
        day = (day < 10 ? '0' : '') + day;
        month = (month < 10 ? '0' : '') + month;
      
        // Combine the parts into the final format
        return `${month}/${day}/${year}`;
    }
    
    const DUMMY_REVIEWS = [
        {id: "m1", username: "Donald", content: "this place damn solid bro", rating: 5},
        {id: "m2", username: "Bob", content: "this sucks bro", rating: 4},
        {id: "m3", username: "Sarah", content: "very solid bro", rating: 3},
        {id: "m4", username: "Gary", content: "very dope and solid sis", rating: 3},
        {id: "m5", username: "Poppy", content: "I love food here", rating: 5},
        {id: "m6", username: "Tiny", content: "take me to church pls", rating: 2},
    ]


    return (
        <Fragment>
            <MainHeader toggleNav={handleNavigationOnClick} />
            <Container sx={{ margin: "1vw 2vw 0 2vw", }}>
                <Grid container>
                    <Grid item xs={5} sx={{}}>
                        <Box sx={{ height: "256px", width: "100%" }}>
                            <img src={countryImages.get(planData.city)}></img>
                        </Box>
                        <List style={tripDetailItemStyle} aria-label="Trip details">
                            <ListItem>Trip to {planData.city}</ListItem>
                            <ListItem>{formatDate(new Date(planData.startDate))}- {formatDate(new Date(planData.endDate))}</ListItem>
                            <ListItem>{planData.groupSize} Pax</ListItem>
                            <ListItem>Budget: ${planData.startBudget}-{planData.endBudget}</ListItem>
                        </List>
                        {canAddReview && <AddReview />}
                        <ReviewsList reviewItems={DUMMY_REVIEWS}/>
                    </Grid>
                    <Grid item xs={7}>
                        {daysDisplayed}
                    </Grid>
                </Grid>

            </Container>
        </Fragment>
    );
};

export default Overview;