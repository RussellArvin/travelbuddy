import { Fragment } from "react";
import { DayItemType, PlanItem } from "../../utils/types";
import { Box, Container, Typography } from "@mui/material";
import DayItem from "./DayItem";
import { uuid } from "uuidv4";
import { RouterOutputs } from "../../utils/api";



export default function Day({ dayItems }: { dayItems: PlanItem[] }) {
    // You can now use dayItems in your component
    return (
        <Container>
            <Typography variant="h3">Day {dayItems[0]?.day}</Typography>
            {dayItems.map((dayItem) => (
                <DayItem key={uuid()} dayItem={dayItem} />
            ))}
        </Container>
    );
}