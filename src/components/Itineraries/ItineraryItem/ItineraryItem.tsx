import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container, IconButton, Paper } from '@mui/material';
import { ItineraryItemType } from '../../../utils/types';
import { styled } from '@mui/material/styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#427AA1' : '##427AA1',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  margin: "1vw",
  cursor: "pointer",
}));

const cityImages = new Map([
  ["Jakarta", "https://s7g10.scene7.com/is/image/barcelo/things-to-do-in-jakarta_jakarta-tourist-spots?&&fmt=webp-alpha&qlt=75&wid=1300&fit=crop,1"],
  ["New York", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/800px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg"],
  ["Seoul", "https://static.independent.co.uk/2022/12/29/14/iStock-464629385.jpg"],
  ["Taipei", "https://res.klook.com/image/upload/fl_lossy.progressive,w_800,c_fill,q_85/Taipei_CP1125X624_1.jpg"],
  ["Tokyo", "https://media.cntraveller.com/photos/6343df288d5d266e2e66f082/16:9/w_2560%2Cc_limit/tokyoGettyImages-1031467664.jpeg"],
]);



export default function ItineraryItem(details: ItineraryItemType) {
  const { location, startBudget, endBudget, duration, groupSize } = details

  return (
    <Grid item xs={4} md={4}>
      <Item>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 160 }}
            image={cityImages.get(location)}
            title="city"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {location}
            </Typography>
            <Container sx={{ display: "flex", }}>
              <Typography variant="body2" color="text.secondary">
                Budget: ${startBudget}-{endBudget}
              </Typography>
              <Typography>
                {duration} days
              </Typography>
              <Typography>
                {groupSize} pax
              </Typography>
            </Container>
          </CardContent>
        </Card>
      </Item>
    </Grid>
  );
}