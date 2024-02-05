import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ItineraryItem from '../ItineraryItem/ItineraryItem';
import { ItineraryItemType } from '../../../utils/types';
import { uuid } from 'uuidv4';

export default function ItineraryList({ itineraries }: { itineraries: ItineraryItemType[] }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {itineraries.map((itinerary: ItineraryItemType) => (
                    <ItineraryItem
                    id={itinerary.id}
                    userId={itinerary.userId}
                    location={itinerary.location}
                    startBudget={itinerary.startBudget}
                    endBudget={itinerary.endBudget}
                    duration={itinerary.duration}
                    groupSize={itinerary.groupSize}
                    />
                ))}
            </Grid>
        </Box>
    );
}
