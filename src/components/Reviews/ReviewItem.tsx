import { Fragment } from "react";
import { Review } from "../../utils/types";
import { Card, ListItem } from "@mui/material";
export default function ReviewItem({ reviewItem }: { reviewItem: Review }) {
    const { id, username, content, rating } = reviewItem
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
    };

    return (
        <ListItem sx={style}>
            <div>
                <h1>{username}</h1>
                <h1>Rating: {rating}/5</h1>
                <p>{content}</p>
            </div>
        </ListItem>
    );
};