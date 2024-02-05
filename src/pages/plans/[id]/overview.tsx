import React, { Fragment, useEffect, useState } from 'react';
import { Container, TextField, Button, Box, Grid, List, ListItem } from '@mui/material';
import { NextPage } from 'next';
import { api, RouterOutputs } from '../../../utils/api'
import { useRouter } from 'next/router';
import { MainHeader } from '../../../components/Layout/MainHeader/MainHeader';
import Day from '../../../components/Days/Day';
import { uuid } from "uuidv4";
import { PlanItem } from '../../../utils/types';



const Overview: NextPage = () => {
    const router = useRouter()
    const { data: planData, isLoading: isPlanDataLoading } = api.plan.getFullPlan.useQuery({
        id: router.query.id as string
    }, {
        enabled: router.isReady
    })



    // toggle navbar state
    const [toggleNavbar, setToggleNavBar] = useState(false)

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

    return (
        <Fragment>
            <MainHeader toggleNav={handleNavigationOnClick} />
            <Container sx={{ margin: "1vw 2vw 0 2vw", }}>
                <Grid container>
                    <Grid item xs={4} sx={{ border: "2px solid black" }}>
                        <Box sx={{ height: "256px", width: "100%" }}>
                            <img src={countryImages.get(planData.city)}></img>
                        </Box>
                        <List style={tripDetailItemStyle} aria-label="Trip details">
                            <ListItem>Trip to {planData.city}</ListItem>
                            <ListItem>11/3/22 - 11/5/22</ListItem>
                            <ListItem>{planData.groupSize} Pax</ListItem>
                            <ListItem>Budget: ${planData.startBudget}-{planData.endBudget}</ListItem>
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

export default Overview;