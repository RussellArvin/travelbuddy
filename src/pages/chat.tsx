import { type NextPage } from "next";
import { useState, Fragment, ChangeEvent, useRef } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Box, Typography, TextField, MenuItem, Menu, Autocomplete, Button, Paper, Grid } from "@mui/material";
import toast from "react-hot-toast"
import { api } from "../utils/api";
import { useRouter } from "next/router";
import { MainHeader } from "../components/Layout/MainHeader/MainHeader";

const Chat: NextPage = () => {
    const [city, setCity] = useState('');
    const [paxNo, setPaxNo] = useState(1);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startBudget, setStartBudget] = useState(0);
    const [endBudget, setEndBudget] = useState(0);

    const router = useRouter();

    const {
        mutate: createPlanMutation,
        isLoading: isCreatePlanLoading
    } = api.plan.create.useMutation()

    const onSubmit = () => {

        createPlanMutation(
            {
                startBudget,
                endBudget,
                city,
                startDate,
                endDate,
                groupSize: paxNo
            },
            {
                onSuccess: (planId) => {
                    router.push(`/plans/${planId}/chatbox`)
                },
                onError: (error) => {
                    console.log(error);
                },
            },
        );
    }

    const cityInfo = [
        { label: 'Tokyo' },
        { label: 'London' },
        { label: 'New York' },
        { label: 'Seoul' },
        { label: 'Taipei' },
    ];

    return (
        <Fragment>
            <MainHeader />
            <Box sx={{ marginBottom: "20vh", }}>
                <Box mx={3} sx={{ margin: "0" }}>
                    <Paper variant="outlined" sx={{ marginBottom: "0", position: "relative", border: "0" }}>
                        <Box style={{ width: "100%", display: "block", height: "650px", backgroundImage: "url(https://wallpapers.com/images/featured/travel-ibk7fgrvtvhs7qzg.jpg)" }} />
                        <div style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            height: "150px", // Adjust the height of the gradient overlay as needed
                            background: "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 11))",
                        }}></div>
                    </Paper>
                    <Grid container spacing={1}>
                        <Grid item xs={3}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={cityInfo}
                                sx={{ width: "20vw", marginLeft: "2vw"}}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select City"
                                    />
                                )}
                                onChange={(event, newValue) => setCity(newValue ? newValue.label : '')}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <TextField
                                label="noOfPax"
                                type="number"
                                value={paxNo}
                                onChange={(event) => {
                                    let value = Number(event.target.value);
                                    setPaxNo(value > 0 ? value : 1);
                                }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    format="DD MMMM YYYY"
                                    onChange={(newValue) => {
                                        const startDateVal = dayjs(newValue).format('DD MMMM YYYY');
                                        let startDateObj = new Date(startDateVal);
                                        // date object
                                        // check difference in dates
                                        if (endDate != null) {
                                            const differenceInDays = (endDate - startDateObj) / (1000 * 60 * 60 * 24);
                                        }

                                        // else {

                                        // }
                                        console.log(startDateVal);
                                        setStartDate(startDateObj);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={2}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    format="DD MMMM YYYY"
                                    onChange={(newValue) => {
                                        const endDateVal = dayjs(newValue).format('DD MMMM YYYY');
                                        let endDateObj = new Date(endDateVal);
                                        // date object
                                        // check difference in dates
                                        if (startDate != null) {
                                            const differenceInDays = (endDateObj - startDate) / (1000 * 60 * 60 * 24);
                                        }
                                        // }
                                        setEndDate(endDateObj);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                label="start budget"
                                type="number"
                                value={startBudget} onChange={(event) => {
                                    let value = Number(event.target.value);
                                    setStartBudget(value >= 0 ? value : 0);
                                }}>
                            </TextField>
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                label="end budget"
                                type="number"
                                value={endBudget} onChange={(event) => {
                                    let value = Number(event.target.value);
                                    setEndBudget(value >= 0 ? value : 0);
                                }}>
                            </TextField>
                        </Grid>
                        <Grid item xs={11} />
                        <Grid item xs={1} sx={{ marginTop: "2vh" }}>
                            <Button variant="outlined" onClick={onSubmit}>Submit</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Fragment>
    )
};

export default Chat;
