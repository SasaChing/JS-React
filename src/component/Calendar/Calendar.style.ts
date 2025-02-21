
import styled from "styled-components";
import { DayButtonStyledProps } from "./Calendar.type";

export const CalendarLayout = styled.div`
    width: 350px;
    height: 240px;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CalendarHeader = styled.div`
    width: 350px;
    height: 44px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
`;

export const MonthSelect = styled.button`
    width: 44px;
    height: 44px;
    background-color: #FFFFFF;
    border: none;
    cursor: pointer;
    &:hover {
    background-color: #e6e6e6;
    }
`;

export const DayButton = styled.button<DayButtonStyledProps>`
    width: 50px;
    height: 36px;
    border: none;
    cursor: ${({ isNonCurrentMonth }) => (isNonCurrentMonth ? "not-allowed" : "pointer")};
    color: ${({ isNonCurrentMonth }) => (isNonCurrentMonth ? "#757575" : "black")};
    background-color: ${({ isToday, isActive, isInRange }) =>
        isActive ? "#006edc" :
            isInRange ? "#006edc" :
                isToday ? "#ffff76" :
                    "white"};

    &:hover {
    background-color: ${({ isNonCurrentMonth }) => (isNonCurrentMonth ? "none" : "#e6e6e6")};
    }
`;

export const DaysGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 50px);
    justify-content: center;
`;

