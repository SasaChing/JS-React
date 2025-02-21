export interface CalendarState {
    currentMonth: number;
    currentYear: number;
    selectedStartDate: Date | null;
    selectedEndDate: Date | null;
}

export interface DayButtonStyledProps {
    isToday?: boolean;
    isActive?: boolean;
    isInRange?: boolean;
    isNonCurrentMonth?: boolean;
}
