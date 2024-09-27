import React, { useState, useEffect } from 'react';

const DatePicker = ({ initialDate, onChange }) => {
    const [selectedDate, setSelectedDate] = useState(initialDate || new Date());
    const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
    const [visibleDates, setVisibleDates] = useState([]);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const weekDaysFull = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const generateDates = (centerDate) => {
        const dates = [];
        const startDate = new Date(centerDate);
        startDate.setDate(centerDate.getDate() - centerDate.getDay() - 7);

    for (let i = 0; i < 21; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        dates.push(date);
    }

    return dates;
};

    useEffect(() => {
        setVisibleDates(generateDates(selectedDate));
        if (onChange) {
            onChange(selectedDate);
        }
}, [selectedDate, onChange]);

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setCurrentYear(date.getFullYear());
        setCurrentMonth(date.getMonth());
    };

    const handleYearClick = (year) => {
        const newDate = new Date(selectedDate);
        newDate.setFullYear(year);
        setSelectedDate(newDate);
        setCurrentYear(year);
    };

    const handleMonthClick = (month) => {
        let year = currentYear;
        if (currentMonth === 11 && month === 0) {
            year++;
        } else if (currentMonth === 0 && month === 11) {
            year--;
        }
        const newDate = new Date(selectedDate);
        newDate.setFullYear(year);
        newDate.setMonth(month);
        setSelectedDate(newDate);
        setCurrentYear(year);
        setCurrentMonth(month);
    };

    const isSelectedDate = (date) => {
        return date.toDateString() === selectedDate.toDateString();
    };

    const isSelectedDay = (day) => {
        return day === selectedDate.getDay();
    };

    const getVisibleMonths = () => {
        const monthIndex = currentMonth;
        return [-2, -1, 0, 1, 2].map(offset => {
            const index = (monthIndex + offset + 12) % 12;
            const year = currentYear + Math.floor((monthIndex + offset) / 12);
            return { month: months[index], year };
        });
    };

    const shouldShowMonth = (date) => {
        return date.getDate() === 1 || date.getDay() === 0 || isSelectedDate(date);
    };

    return (
        <div>
            <div className="flex border rounded-lg overflow-hidden shadow-lg">
                {/* Year selector */}
                <div className="w-20 bg-gray-100 flex flex-col items-center justify-center">
                    {[currentYear - 1, currentYear, currentYear + 1].map((year) => (
                        <button
                            key={year}
                            onClick={() => handleYearClick(year)}
                            className={`w-full p-2 transition-colors duration-300 ${year === currentYear ? 'font-bold bg-blue-100' : 'hover:bg-gray-200'}`}
                        >
                            {year}
                        </button>
                    ))}
                </div>
                {/* Month selector */}
                <div className="w-20 bg-gray-100 flex flex-col items-center justify-center">
                    {getVisibleMonths().map(({ month, year }, index) => (
                        <button
                            key={index}
                            onClick={() => handleMonthClick(months.indexOf(month))}
                            className={`w-full p-2 transition-colors duration-300 ${month === months[currentMonth] ? 'font-bold bg-blue-100' : 'hover:bg-gray-200'}`}
                        >
                            <div>{month}</div>
                            {(month === 'Jan' || month === 'Dec') && (
                                <div className="text-xs text-gray-500">{year}</div>
                            )}
                        </button>
                    ))}
                </div>
                {/* Calendar */}
                <div className="flex-1 p-2">
                    <div className="grid grid-cols-7 gap-1">
                        {weekDays.map((day, index) => (
                            <div
                                key={day}
                                className={`text-center font-semibold text-xs p-1 ${isSelectedDay(index) ? 'bg-blue-100' : ''}`}
                            >
                                {isSelectedDay(index) ? weekDaysFull[index] : day}
                            </div>
                        ))}
                    </div>
                    <div className="h-[120px] overflow-hidden">
                        <div className="grid grid-cols-7 gap-1">
                            {visibleDates.map((date, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDateClick(date)}
                                    className={`text-center p-1 rounded transition-colors duration-300 ${isSelectedDate(date) ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                        } ${date.getMonth() !== currentMonth ? 'text-gray-400' : ''}`}
                                >
                                    <div className="text-sm">{date.getDate()}</div>
                                    {shouldShowMonth(date) && (
            <div className={`text-xs ${isSelectedDate(date) ? 'text-white' : 'text-gray-500'}`}>
                {date.toLocaleDateString('en-US', { month: 'short' })}
            </div>
        )}
    </button>
))}
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-2 p-2 border rounded">
            Selected Date: {selectedDate.toDateString()}
        </div>
    </div>
);
};

export default DatePicker;