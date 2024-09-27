import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const DatePicker = ({ initialDate }) => {
    const [selectedDate, setSelectedDate] = useState(initialDate || new Date());
    const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());

    useEffect(() => {
        setCurrentYear(selectedDate.getFullYear());
        setCurrentMonth(selectedDate.getMonth());
    }, [selectedDate]);

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const generateDates = () => {
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
        const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
        const dates = [];

        // Previous month's dates
        const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1);
        for (let i = firstDay - 1; i >= 0; i--) {
            dates.push(new Date(currentYear, currentMonth - 1, prevMonthDays - i));
        }

        // Current month's dates
        for (let i = 1; i <= daysInMonth; i++) {
            dates.push(new Date(currentYear, currentMonth, i));
        }

        // Next month's dates
        const remainingDays = 21 - dates.length;
        for (let i = 1; i <= remainingDays; i++) {
            dates.push(new Date(currentYear, currentMonth + 1, i));
        }

        return dates;
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleYearChange = (increment) => {
        setCurrentYear(currentYear + increment);
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const isCurrentDate = (date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const isSelectedDate = (date) => {
        return date.toDateString() === selectedDate.toDateString();
    };

    const dates = generateDates();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="flex border rounded-lg overflow-hidden shadow-lg">
            {/* Box A */}
            <div className="flex w-64">
                {/* Box B */}
                <div className="w-16 bg-gray-100 flex flex-col items-center justify-center">
                    <button onClick={() => handleYearChange(1)} className="p-2">
                        <ChevronUp size={20} />
                    </button>
                    <div className="font-bold text-lg">{currentYear}</div>
                    <button onClick={() => handleYearChange(-1)} className="p-2">
                        <ChevronDown size={20} />
                    </button>
                </div>
                {/* Box C */}
                <div className="flex-1 p-2">
                    <div className="grid grid-cols-7 gap-1">
                        {weekDays.map((day) => (
                            <div key={day} className="text-center font-semibold text-xs p-1">
                                {day}
                            </div>
                        ))}
                        {dates.map((date, index) => (
                            <button
                                key={index}
                                onClick={() => handleDateClick(date)}
                                className={`text-center p-1 rounded ${isSelectedDate(date)
                                        ? 'bg-blue-500 text-white'
                                        : isCurrentDate(date)
                                            ? 'bg-blue-100'
                                            : ''
                                    }`}
                            >
                                <div className="text-sm">{date.getDate()}</div>
                                {(date.getDate() === 1 || date.getDay() === 0) && (
                                    <div className="text-xs text-gray-500">
                                        {date.toLocaleDateString('en-US', { month: 'short' })}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatePicker;