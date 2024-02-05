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
import cityImages from '../../../utils/cityImages';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#427AA1' : '##427AA1',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "center",
  margin: "1vw",
  cursor: "pointer",
  "&:hover": {
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",  // Add box shadow on hover
},
}));



export default function ItineraryItem(details: ItineraryItemType) {
  const { location, startBudget, endBudget, duration, groupSize } = details

  return (
    <Grid item xs={4} md={4}>
      <Item>
        <Card sx={{ maxWidth: 500, height: "300px" }}>
          <CardMedia
            sx={{ height: 160 , width: "30vw"}}
            image={cityImages.get(location)}
            title="city"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {location}
            </Typography>
            <Container sx={{ display: "block", }}>
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