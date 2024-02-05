import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Paper, Card, CardMedia , Typography, Container, CardContent} from '@mui/material';
import ItineraryItem from '../ItineraryItem/ItineraryItem';
import { ItineraryItemType } from '../../../utils/types';
import { uuid } from 'uuidv4';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#427AA1' : '##427AA1',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    display:"flex",
    justifyContent: "center",
    color: theme.palette.text.secondary,
    margin: "1vw",
    cursor: "pointer",
    transition: "box-shadow 0.3s",  // Add transition for a smooth effect
    "&:hover": {
        boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",  // Add box shadow on hover
    },
  }));


export default function ItineraryList({ itineraries }: { itineraries: ItineraryItemType[] }) {
    const router = useRouter()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4} md={4}>
                    <Item
                    onClick={()=>{
                        router.push('/chat')
                    }}>
                        <Card sx={{ width: "30vw", height: "300px",}}>
                            <CardContent>
                                <AddIcon sx={{ fontSize:"15vw"}} />
                                <Typography gutterBottom variant="h5" component="div">
                                    generate a new Itinerary
                                </Typography>
                            </CardContent>
                        </Card>
                    </Item>
            </Grid>
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
        </Box >
    );
}
