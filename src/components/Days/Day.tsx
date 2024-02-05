import { Fragment } from "react";
import { DayItemType, PlanItem } from "../../utils/types";
import { Box, Container } from "@mui/material";
import DayItem from "./DayItem";
import { uuid } from "uuidv4";
import { RouterOutputs } from "../../utils/api";



export default function Day({ dayItems }: { dayItems: PlanItem[] }) {
    // You can now use dayItems in your component
    return (
        <Container>
            <h1>Day {dayItems[0]?.day}</h1>
            {dayItems.map((dayItem) => (
                <DayItem key={uuid()} dayItem={dayItem} />
            ))}
        </Container>
    );
}