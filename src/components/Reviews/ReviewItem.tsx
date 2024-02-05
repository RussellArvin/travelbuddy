import { Fragment } from "react";
import { Review } from "../../utils/types";
import { ListItem, Typography, Rating} from "@mui/material";

export default function ReviewItem({ reviewItem }: { reviewItem: Review }) {
    const { id, username, content, rating } = reviewItem;

    const style = {
        py: 0,
        width: '100%',
        maxWidth: 400,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        margin: "auto",
        marginBottom: "20px",
        minHeight: "250px",
        display: "block",
        padding: "1vw",
        position: "relative",
    };


    return (
        <ListItem sx={style}>
            <Typography variant="h5">{username}</Typography>
            <div style={{ padding: "10px 0" }}>
                <p>{content}</p>
            </div>
            <h1 style={{
                position: "absolute",
                bottom: 10,
                right: 10,
            }}>
                <Rating name="read-only" value={rating} readOnly />
            </h1>
        </ListItem >
    );
}