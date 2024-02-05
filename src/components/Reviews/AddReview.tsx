import { Button, Card, Container, TextField } from "@mui/material"
import { borderBottom } from "@mui/system"
import { useState } from "react";

interface AddReviewProps {
    handleAddReview: (content:string, rating: number) => void;
}



const AddReview = (props: AddReviewProps) => {
    const { handleAddReview } = props

    const [reviewDetails, setReviewDetails] = useState("");
    const mainContainerStyle = {
        border: "1px solid #05668D",
        margin: "2px 0 30px 0",
        padding: "10px",
        backgroundColor: "#EBF2FA",
    }

    return <Card sx={mainContainerStyle}>
        <h1>Write your review!</h1>
        <TextField 
            sx={{ width: "100%", marginBottom: "20px"}}
            multiline
            maxRows={4}
            onChange={(e) => setReviewDetails(e.target.value)}
        ></TextField>
        <Button variant="contained" sx={{float: "right"}} onClick={()=> handleAddReview(reviewDetails,5)}>Submit</Button>
        {reviewDetails}
    </Card>
}

export default AddReview