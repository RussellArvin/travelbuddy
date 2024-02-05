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



export default function ItineraryItem({ itineraryDetail, cityImage }: ItineraryItemType) {
  const { location, startBudget, endBudget, duration, pax, rating } = itineraryDetail;
  return (
    <Grid item xs={4} md={4}>
      <Item>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 160 }}
            image={cityImage}
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
                {pax} pax
              </Typography>
              {rating ?
                <IconButton color="secondary" aria-label="add an alarm">
                  <ThumbUpIcon />
                </IconButton> : <IconButton color="secondary" aria-label="add an alarm">
                  <ThumbDownIcon />
                </IconButton>}
            </Container>
          </CardContent>
        </Card>
      </Item>
    </Grid>
  );
}