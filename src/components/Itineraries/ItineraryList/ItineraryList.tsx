import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ItineraryItem from '../ItineraryItem/ItineraryItem';
import { ItineraryItemType } from '../../../utils/types';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const DUMMY_ARR: ItineraryItemType[] = [{id: 1, location: "Jakarta"},{id: 3, location: "BOb"},{id: 2, location: "pop"},{id: 4, location: "dog"}];

// const DUMMY_ARR2 = [
//     {id: "m1", location:""}
// ]

const itineraries = DUMMY_ARR.map((itinerary: ItineraryItemType) => (
    <Grid item xs={4} md={4} key={itinerary.id}>
      <Item>
        <ItineraryItem  
            id={itinerary.id}
            location={itinerary.location}
        />
      </Item>
    </Grid>
  ));
  

export default function ItineraryList() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {itineraries}
            </Grid>
        </Box>
    );
}