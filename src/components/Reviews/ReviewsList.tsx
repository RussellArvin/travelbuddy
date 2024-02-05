import { Container } from "@mui/system";
import { Review } from "../../utils/types";
import { uuid } from "uuidv4";
import ReviewItem from "./ReviewItem";
import { List } from "@mui/material";

export default function ReviewsList({ reviewItems }: { reviewItems: Review[] }) {
    return (
        <List sx={{
            backgroundColor: "beige",
            overflowY: "scroll",
            maxHeight: "900px",
            border: "3px solid #427AA1"
        }}>
            {reviewItems.map((reviewItem) => (
                <ReviewItem key={uuid()} reviewItem={reviewItem} />
            ))}
        </List>
    );
}