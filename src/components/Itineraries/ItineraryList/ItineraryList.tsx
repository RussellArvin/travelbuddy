import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ItineraryItem from '../ItineraryItem/ItineraryItem';
import { ItineraryItemType } from '../../../utils/types';
import { uuid } from "uuidv4";

const cityImages = new Map([
    ["Jakarta", "https://s7g10.scene7.com/is/image/barcelo/things-to-do-in-jakarta_jakarta-tourist-spots?&&fmt=webp-alpha&qlt=75&wid=1300&fit=crop,1"],
    ["New York", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/800px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg"],
    ["Seoul", "https://static.independent.co.uk/2022/12/29/14/iStock-464629385.jpg"],
    ["Taipei", "https://res.klook.com/image/upload/fl_lossy.progressive,w_800,c_fill,q_85/Taipei_CP1125X624_1.jpg"],
    ["Tokyo", "https://media.cntraveller.com/photos/6343df288d5d266e2e66f082/16:9/w_2560%2Cc_limit/tokyoGettyImages-1031467664.jpeg"],
]);


const DUMMY_ARR: ItineraryItemType[] = [
    { location: "New York", startBudget: 1000, endBudget: 4000, duration: 3, pax: 4, rating: true },
    { location: "Tokyo", startBudget: 1000, endBudget: 4000, duration: 3, pax: 4, rating: true },
    { location: "Jakarta", startBudget: 1000, endBudget: 4000, duration: 3, pax: 4, rating: false },
    { location: "Taipei", startBudget: 1000, endBudget: 4000, duration: 3, pax: 4, rating: true },
    { location: "Seoul", startBudget: 1000, endBudget: 4000, duration: 3, pax: 4, rating: true }
];



const itineraries = DUMMY_ARR.map((itinerary: ItineraryItemType) => (
    <ItineraryItem
      key={uuid()}
      cityImage={cityImages.get(itinerary.location)}
      itineraryDetail={itinerary} // Corrected typo: itineratDetails to itineraryDetails
    />
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