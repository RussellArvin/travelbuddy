import React, { Fragment, useEffect, useState } from 'react';
import { Container, TextField, Button, Box, Grid, List, ListItem, Card, Typography } from '@mui/material';
import { NextPage } from 'next';
import { api, RouterOutputs } from '../../../utils/api'
import { useRouter } from 'next/router';
import { MainHeader } from '../../../components/Layout/MainHeader/MainHeader';
import Day from '../../../components/Days/Day';
import { uuid } from "uuidv4";
import { PlanItem } from '../../../utils/types';
import ReviewsList from '../../../components/Reviews/ReviewsList';
import AddReview from '../../../components/Reviews/AddReview';
import LoadingSpinner from '../../../components/LoadingSpinner';
import cityImages from '../../../utils/cityImages';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import downloadBase64AsFile from '../../../utils/downloadBase64AsFile';

const Overview: NextPage = () => {
    const router = useRouter()
    const reviewContext = api.useUtils().review

    // check if need to can Review
    const [canAddReview, setCanAddReview] = useState(true);
    const { data: planData, isLoading: isPlanDataLoading } = api.plan.getFullPlan.useQuery({
        id: router.query.id as string
    }, {
        enabled: router.isReady
    })

    const { data: reviewData, isLoading: isReviewsLoading } = api.review.getPlanReviews.useQuery({
        planId: router.query.id as string
    }, {
        enabled: router.isReady
    })

    const {
        mutate: saveReviewMutation,
        isLoading: isSaveReviewLoading
    } = api.review.create.useMutation()

    const {
        mutate: downloadProjectMutation,
        isLoading: isProjectDownloading
    } = api.plan.download.useMutation()


    useEffect(() => {
        if (reviewData) {
            setCanAddReview(!reviewData.hasReviewed)
        }
    })

    const [currentDay, setCurrentDay] = useState(1);


    const handleAddReview = (content: string, rating: number) => {
        saveReviewMutation({
            planId: router.query.id as string,
            content,
            rating
        },
            {
                onSuccess: () => {
                    reviewContext.getPlanReviews.invalidate()
                },
                onError: (error) => {
                    console.log(error);
                },
            },)
    }

    const tripDetailItemStyle = {
        p: 0,
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'background.paper',
    };

    if (!planData) {
        return (
            <>
                <LoadingSpinner isLoading={true} ></LoadingSpinner>
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

    const setCurrentDayHandler = (action: string) => {
        let dayNum = currentDay;

        if (action === "increment" && dayNum < groupedByDay.length) {
            setCurrentDay((prev) => prev + 1);
        } else if (action === "decrement" && dayNum > 1) {
            setCurrentDay((prev) => prev - 1);
        }
    }

    const dayDisplayed = <Day key={uuid()} dayItems={groupedByDay[currentDay - 1]} />



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

    const handleDownloadProject = () => {
        downloadProjectMutation({
            id: planData.id
        },
            {
                onSuccess: (base64String) => {
                    downloadBase64AsFile(base64String, `${planData.city}.pdf`);
                },
                onError: (error) => {
                    console.log(error);
                },
            },)
    }

    const DUMMY_REVIEWS = [
        { id: "m1", username: "Donald", content: "this place damn solid bro", rating: 5 },
        { id: "m2", username: "Bob", content: "this sucks bro", rating: 4 },
        { id: "m3", username: "Sarah", content: "very solid bro", rating: 3 },
        { id: "m4", username: "Gary", content: "very dope and solid sis", rating: 3 },
        { id: "m5", username: "Poppy", content: "I love food here", rating: 5 },
        { id: "m6", username: "Tiny", content: "take me to church pls", rating: 2 },
    ]

    return (
        <Fragment>
            <MainHeader />
            <Container sx={{ margin: "1vw 2vw 0 2vw", }}>
                <Grid container>
                    <Grid item xs={5} sx={{}}>
                        <Box sx={{ height: "256px", width: "100%" }}>
                            <img src={cityImages.get(planData.city)}></img>
                        </Box>
                        <List style={tripDetailItemStyle} aria-label="Trip details">
                            <ListItem sx={{ padding: "0.3vw" }}>
                                <Typography variant='h4'>
                                    Trip to {planData.city}
                                </Typography>
                            </ListItem>
                            <ListItem sx={{ padding: "0.3vw" }}>
                                <Typography variant='h5'>
                                    {formatDate(new Date(planData.startDate))}- {formatDate(new Date(planData.endDate))}
                                </Typography>
                            </ListItem>
                            <ListItem sx={{ padding: "0.3vw" }}>
                                <Typography variant='h5'>
                                    {planData.groupSize} Pax
                                </Typography>
                            </ListItem>
                            <ListItem sx={{ padding: "0.3vw" }}>
                                <Typography variant='h5'>
                                    Budget: ${planData.startBudget}-{planData.endBudget}
                                </Typography>
                            </ListItem>
                        </List>
                        {canAddReview && <AddReview handleAddReview={handleAddReview} />}
                        <ReviewsList reviewItems={DUMMY_REVIEWS} />
                    </Grid>
                    <Grid item xs={7}>
                        <div style={{ width: "100%", padding: "1vw", margin: "1vw", borderBottom: "2px solid #EBF2FA", display: "flex", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", flexDirection: "column", width: "25%", height: "80px", }}>
                                <Typography variant='h6' style={{ marginBottom: '10px' }}>Itinerary PDF</Typography>
                                <Button variant="outlined"
                                onClick={handleDownloadProject}
                                >Download</Button>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-around", width: "25%", height: "" }}>
                                {currentDay > 1 ? <Button variant="outlined" onClick={() => setCurrentDayHandler("decrement")}><ArrowBackIosIcon /></Button> : <Button disabled><ArrowBackIosIcon /></Button>}
                                {(currentDay < groupedByDay.length) ? <Button variant="outlined" onClick={() => setCurrentDayHandler("increment")}><ArrowForwardIosIcon /></Button> : <Button disabled><ArrowForwardIosIcon /></Button>}
                            </div>
                        </div>
                        {dayDisplayed}
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    );
};

export default Overview;