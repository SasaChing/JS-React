import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CalendarState } from '../../component';

const initialState: CalendarState = {
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    selectedStartDate: null,
    selectedEndDate: null,
};

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        prevMonth(state) {
            const newMonth = state.currentMonth - 1;
            if (newMonth < 0) {
                state.currentMonth = 11;
                state.currentYear -= 1;
            } else {
                state.currentMonth = newMonth;
            }
        },
        nextMonth(state) {
            const newMonth = state.currentMonth + 1;
            if (newMonth > 11) {
                state.currentMonth = 0;
                state.currentYear += 1;
            } else {
                state.currentMonth = newMonth;
            }
        },
        setSelectedDates(
            state,
            action: PayloadAction<{ startDate: Date | null; endDate: Date | null }>
        ) {
            state.selectedStartDate = action.payload.startDate;
            state.selectedEndDate = action.payload.endDate;
        }
    },
});

export const { prevMonth, nextMonth, setSelectedDates } = calendarSlice.actions;
export default calendarSlice.reducer;
