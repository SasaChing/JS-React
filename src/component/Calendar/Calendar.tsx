import { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CalendarLayout, CalendarHeader, MonthSelect, DayButton, DaysGrid } from "./Calendar.style";
import { prevMonth, nextMonth, setSelectedDates } from "../../store/slice/calendarReducer";
import { CalendarState } from "./Calendar.type";
import { ChevronRight, ChevronLeft } from "lucide-react";

export const Calendar = () => {
    const { currentMonth, currentYear, selectedStartDate, selectedEndDate } = useSelector(
        (state: { calendar: CalendarState }) => state.calendar
    );
    const dispatch = useDispatch();
    const today = new Date();

    const daysInMonth = useMemo(
        () => new Date(currentYear, currentMonth + 1, 0).getDate(),
        [currentYear, currentMonth]
    );
    const firstDayIndex = useMemo(
        () => new Date(currentYear, currentMonth, 1).getDay(),
        [currentYear, currentMonth]
    );

    // 上個月資訊
    const prevMonthInfo = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYearInfo = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = useMemo(
        () => new Date(prevYearInfo, prevMonthInfo + 1, 0).getDate(),
        [prevYearInfo, prevMonthInfo]
    );

    // 計算總格子數
    const totalCells = useMemo(() => {
        const totalDays = firstDayIndex + daysInMonth; // 上個月填充 + 當月
        const rowsNeeded = Math.ceil(totalDays / 7); // 需要的行數
        return rowsNeeded <= 5 ? 35 : 42; // 5行35,6行42
    }, [firstDayIndex, daysInMonth]);

    const handleDateClick = useCallback((day: number) => {
        const selectedDate = new Date(currentYear, currentMonth, day);
        if (!selectedStartDate || selectedDate < selectedStartDate) {
            dispatch(setSelectedDates({ startDate: selectedDate, endDate: null }));
        } else if (selectedStartDate && selectedDate >= selectedStartDate) {
            dispatch(setSelectedDates({ startDate: selectedStartDate, endDate: selectedDate }));
        }
    }, [currentYear, currentMonth, selectedStartDate, dispatch]);

    const handlePrevMonth = useCallback(() => dispatch(prevMonth()), [dispatch]);
    const handleNextMonth = useCallback(() => dispatch(nextMonth()), [dispatch]);

    // 日期是否在選擇範圍內
    const isDateInRange = (date: Date): boolean => {
        if (selectedStartDate === null || selectedEndDate === null) {
            return false;
        }
        return date >= selectedStartDate && date <= selectedEndDate;
    };

    // 日期格子
    const renderDays = () => {
        const days = [];
        // 上個月日期
        const prevMonthStart = daysInPrevMonth - firstDayIndex + 1;
        for (let i = 0; i < firstDayIndex; i++) {
            const day = prevMonthStart + i;
            days.push(
                <DayButton key={`prev-${day}`} isNonCurrentMonth>
                    {day}日
                </DayButton>
            );
        }
        // 當前月份
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            days.push(
                <DayButton
                    key={`current-${day}`}
                    isToday={date.toDateString() === today.toDateString()}
                    isActive={
                        selectedStartDate !== null &&
                        date.toDateString() === selectedStartDate.toDateString()
                    }
                    isInRange={isDateInRange(date)}
                    onClick={() => handleDateClick(day)}>
                    {day}日
                </DayButton>
            );
        }
        // 下個月日期
        const currentMonthCells = firstDayIndex + daysInMonth;
        const nextMonthDays = totalCells - currentMonthCells;
        for (let day = 1; day <= nextMonthDays; day++) {
            days.push(
                <DayButton key={`next-${day}`} isNonCurrentMonth>
                    {day}日
                </DayButton>
            );
        }
        return days;
    };

    return (
        <CalendarLayout>
            <CalendarHeader>
                <MonthSelect onClick={handlePrevMonth}>
                    <ChevronLeft size={14} />
                </MonthSelect>
                {`${currentYear}年 ${currentMonth + 1}月`}
                <MonthSelect onClick={handleNextMonth}>
                    <ChevronRight size={14} />
                </MonthSelect>
            </CalendarHeader>
            <DaysGrid>
                {renderDays()}
            </DaysGrid>
        </CalendarLayout>
    );
};