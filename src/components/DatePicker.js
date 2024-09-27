import React, { useState, useEffect, useRef } from 'react';

const DatePicker = ({
    initialDate,
    onChange,
    language = 'en', // 'en', 'hi'
    size = 'medium' // 'compact', 'medium', or 'cozy'
}) => {
    const [selectedDate, setSelectedDate] = useState(initialDate || new Date());
    const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
    const [visibleDates, setVisibleDates] = useState([]);
    const [focusedDate, setFocusedDate] = useState(null);
    const datePickerRef = useRef(null);
    const prevInitialDateRef = useRef(initialDate);

    const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        hi: ['जन', 'फर', 'मार्च', 'अप्रै', 'मई', 'जून', 'जुल', 'अग', 'सित', 'अक्टू', 'नव', 'दिस']
    };
    const weekDays = {
        en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        hi: ['र', 'सो', 'मं', 'बु', 'गु', 'शु', 'श']
    };
    const weekDaysFull = {
        en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        hi: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि']
    };

    const labels = {
        en: {
            today: 'Today',
            selected: 'Selected Date:',
            year: 'Year',
            month: 'Month'
        },
        hi: {
            today: 'आज',
            selected: 'चयनित दिनांक:',
            year: 'वर्ष',
            month: 'माह'
        }
    };

    const sizeClasses = {
        compact: 'text-xs p-1',
        medium: 'text-sm p-2',
        cozy: 'text-base p-3'
    };

    const containerClasses = {
        compact: 'w-64 sm:w-72',
        medium: 'w-72 sm:w-80 md:w-96',
        cozy: ''
    };

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
        if (initialDate && initialDate.getTime() !== prevInitialDateRef.current?.getTime()) {
            setSelectedDate(initialDate);
            setCurrentYear(initialDate.getFullYear());
            setCurrentMonth(initialDate.getMonth());
            setVisibleDates(generateDates(initialDate));
            prevInitialDateRef.current = initialDate;
        }
    }, [initialDate]);

    useEffect(() => {
        setVisibleDates(generateDates(selectedDate));
        if (onChange && selectedDate.getTime() !== prevInitialDateRef.current?.getTime()) {
            onChange(selectedDate);
        }
    }, [selectedDate, onChange]);

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setCurrentYear(date.getFullYear());
        setCurrentMonth(date.getMonth());
    };

    const handleYearClick = (year) => {
        if (currentYear === year) {
            return;
        }
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

    const handleTodayClick = () => {
        const today = new Date();
        setSelectedDate(today);
        setCurrentYear(today.getFullYear());
        setCurrentMonth(today.getMonth());
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
            return { month: months[language][index], year };
        });
    };

    const shouldShowMonth = (date) => {
        return date.getDate() === 1 || date.getDay() === 0;
    };

    const getDateDisplay = (date) => {
        if (isSelectedDate(date)) {
            return `${months[language][date.getMonth()]} ${date.getFullYear()}`;
        } else if (shouldShowMonth(date)) {
            return months[language][date.getMonth()];
        }
        return '';
    };

    const handleKeyDown = (e) => {
        console.log('if (!focusedDate) return;');
        if (!focusedDate) return;

        console.log('const currentIndex = visibleDates.findIndex(date => date.toDateString() === focusedDate.toDateString());');
        const currentIndex = visibleDates.findIndex(date => date.toDateString() === focusedDate.toDateString());
        let newIndex;

        switch (e.key) {
            case 'ArrowLeft':
                newIndex = Math.max(0, currentIndex - 1);
                break;
            case 'ArrowRight':
                newIndex = Math.min(visibleDates.length - 1, currentIndex + 1);
                break;
            case 'ArrowUp':
                newIndex = Math.max(0, currentIndex - 7);
                break;
            case 'ArrowDown':
                newIndex = Math.min(visibleDates.length - 1, currentIndex + 7);
                break;
            case 'Enter':
                handleDateClick(focusedDate);
                return;
            default:
                return;
        }

        setFocusedDate(visibleDates[newIndex]);
        e.preventDefault();
    };

    useEffect(() => {
        if (datePickerRef.current) {
            datePickerRef.current.focus();
        }
    }, []);

    return (
        <div
            ref={datePickerRef}
            tabIndex="0"
            onKeyDown={handleKeyDown}
            className={`focus:outline-none ${containerClasses[size]}`}
            role="application"
            aria-label="Date picker"
        >
            <div className="flex flex-col sm:flex-row border rounded-lg overflow-hidden shadow-lg">
                {/* Year and Month selectors */}
                <div className="flex flex-col sm:flex-row">
                    {/* Year selector */}
                    <div className="sm:w-20 bg-gray-100 flex flex-row sm:flex-col items-center justify-center" role="group" aria-label={labels[language].year}>
                        {[currentYear - 2, currentYear - 1, currentYear, currentYear + 1, currentYear + 2].map((year) => (
                            <button
                                key={year}
                                onClick={() => handleYearClick(year)}
                                className={`w-full ${sizeClasses[size]} transition-colors duration-300 ${year === currentYear ? 'font-bold bg-blue-100' : 'hover:bg-gray-200'}`}
                                aria-selected={year === currentYear}
                                role="option"
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                    {/* Month selector */}
                    <div className="sm:w-20 bg-gray-100 flex flex-row sm:flex-col items-center justify-center" role="group" aria-label={labels[language].month}>
                        {getVisibleMonths().map(({ month, year }, index) => (
                            <button
                                key={index}
                                onClick={() => handleMonthClick(months[language].indexOf(month))}
                                className={`w-full ${sizeClasses[size]} transition-colors duration-300 ${month === months[language][currentMonth] ? 'font-bold bg-blue-100' : 'hover:bg-gray-200'}`}
                                aria-selected={month === months[language][currentMonth]}
                                role="option"
                            >
                                <div>{month}</div>
                                {size !== 'compact' && (month === months[language][0] || month === months[language][11]) && (
                                    <div className="text-xs text-gray-500">{year}</div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Calendar */}
                <div className="flex-1 p-2">
                    <div className="grid grid-cols-7 gap-1" role="row">
                        {weekDays[language].map((day, index) => (
                            <div
                                key={index}
                                className={`text-center font-semibold ${sizeClasses[size]} ${isSelectedDay(index) ? 'bg-blue-100' : ''}`}
                                role="columnheader"
                            >
                                {(isSelectedDay(index) || index === 0) && size === 'cozy' ? weekDaysFull[language][index] : day}
                            </div>
                        ))}
                    </div>
                    <div className={`h-[${size === 'cozy' || size === 'medium' ? '150' : '120'}px] overflow-hidden`} role="grid">
                        <div className="grid grid-cols-7 gap-1">
                            {visibleDates.map((date, index) => (
                                <button
                                    key={date.toDateString() + '__' + index}
                                    onClick={() => handleDateClick(date)}
                                    onFocus={() => setFocusedDate(date)}
                                    className={`text-center ${sizeClasses[size]} rounded transition-colors duration-300 ${isSelectedDate(date) ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                        } ${date.getMonth() !== currentMonth ? 'text-gray-400' : ''} ${focusedDate && focusedDate.toDateString() === date.toDateString() ? 'ring-2 ring-blue-300' : ''
                                        }`}
                                    aria-selected={isSelectedDate(date)}
                                    role="gridcell"
                                    tabIndex={focusedDate && focusedDate.toDateString() === date.toDateString() ? 0 : -1}
                                    aria-label={`${date.getDate()} ${months[language][date.getMonth()]} ${date.getFullYear()}`}
                                >
                                    <div className={sizeClasses[size]}>{date.getDate()}</div>
                                    {size === 'cozy' && getDateDisplay(date) && (
                                        <div className={`text-xs ${isSelectedDate(date) ? 'text-white' : 'text-gray-500'} ${isSelectedDate(date) ? 'text-[0.65rem]' : ''} whitespace-nowrap overflow-hidden text-ellipsis`}>
                                            {getDateDisplay(date)}
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-2 flex flex-col sm:flex-row justify-between items-center">
                <button
                    onClick={handleTodayClick}
                    className={`mb-2 sm:mb-0 bg-blue-500 text-white rounded ${sizeClasses[size]} hover:bg-blue-600 transition-colors duration-300`}
                    aria-label={labels[language].today}
                >
                    {labels[language].today}
                </button>
                <div className="text-sm sm:text-base p-2 border rounded" role="status" aria-live="polite">
                    {labels[language].selected} {selectedDate.toLocaleDateString(language === 'en' ? 'en-US' : 'hi-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </div>
            </div>
        </div>
    );
};

export default DatePicker;