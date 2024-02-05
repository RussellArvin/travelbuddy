import { type NextPage } from "next";
import { useState, Fragment, ChangeEvent, useRef } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Box, Typography, TextField, MenuItem, Menu, Autocomplete, Button } from "@mui/material";
import toast from "react-hot-toast"
import { api } from "../utils/api";
import { useRouter } from "next/router";

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
        { label: 'Jakarta' },
        { label: 'London' },
        { label: 'New York' },
        { label: 'Seoul' },
        { label: 'Taipei' },
    ];

    return (
        <Box>
            <Typography variant="h4" align="center">Select Options</Typography>
            <Box mx={3}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={cityInfo}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select City"
                        />
                    )}
                    onChange={(event, newValue) => setCity(newValue ? newValue.label : '')}
                />
                <TextField
                    label="noOfPax"
                    type="number"
                    value={paxNo}
                    onChange={(event) => {
                        let value = Number(event.target.value);
                        setPaxNo(value > 0 ? value : 1);
                    }}
                />

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
                                console.log(differenceInDays);
                            }

                            // else {

                            // }
                            console.log(startDateVal);
                            setStartDate(startDateObj);
                        }}
                    />
                </LocalizationProvider>
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
                                console.log(differenceInDays);
                            }
                            // }
                            console.log(endDateVal);
                            setEndDate(endDateObj);
                        }}
                    />
                </LocalizationProvider>
                <TextField
                    label="start budget"
                    type="number"
                    value={startBudget} onChange={(event) => {
                        let value = Number(event.target.value);
                        setStartBudget(value >= 0 ? value : 0);
                    }}>
                </TextField>
                <TextField
                    label="end budget"
                    type="number"
                    value={endBudget} onChange={(event) => {
                        let value = Number(event.target.value);
                        setEndBudget(value >= 0 ? value : 0);
                    }}>
                </TextField>
                <Button variant="contained" onClick={onSubmit}>Contained</Button>
            </Box>
        </Box>
    )
};

export default Chat;
