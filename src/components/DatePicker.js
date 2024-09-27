import React, { useState, useEffect, useRef } from 'react';

const DatePicker = ({ initialDate }) => {
    const [selectedDate, setSelectedDate] = useState(initialDate || new Date());
    const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
    const dateRowRef = useRef(null);

    useEffect(() => {
        setCurrentYear(selectedDate.getFullYear());
        setCurrentMonth(selectedDate.getMonth());
    }, [selectedDate]);

    useEffect(() => {
        if (dateRowRef.current) {
            dateRowRef.current.scrollTo({
                top: dateRowRef.current.scrollHeight / 3,
                behavior: 'smooth'
            });
        }
    }, [selectedDate, currentYear, currentMonth]);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

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
      const remainingDays = 42 - dates.length; // 6 weeks total
      for (let i = 1; i <= remainingDays; i++) {
          dates.push(new Date(currentYear, currentMonth + 1, i));
      }

      return dates;
  };

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleYearClick = (year) => {
        setCurrentYear(year);
      setSelectedDate(new Date(year, 0, 1)); // Set to January 1st of the selected year
  };

    const handleMonthClick = (month) => {
      if (month < 0) {
          setCurrentYear(prev => prev - 1);
          setCurrentMonth(11);
      } else if (month > 11) {
          setCurrentYear(prev => prev + 1);
          setCurrentMonth(0);
      } else {
        setCurrentMonth(month);
      }
      setSelectedDate(new Date(currentYear, month, 1)); // Set to 1st of the selected month
  };

    const isSelectedDate = (date) => {
        return date.toDateString() === selectedDate.toDateString();
    };

    const dates = generateDates();

    const getVisibleMonths = () => {
      const monthIndex = currentMonth;
      return [-2, -1, 0, 1, 2].map(offset => {
          const index = (monthIndex + offset + 12) % 12;
          return months[index];
      });
  };

    return (
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
          <div className="w-16 bg-gray-100 flex flex-col items-center justify-center">
              {getVisibleMonths().map((month, index) => (
                  <button
                      key={index}
                      onClick={() => handleMonthClick(months.indexOf(month))}
                className={`w-full p-2 transition-colors duration-300 ${month === months[currentMonth] ? 'font-bold bg-blue-100' : 'hover:bg-gray-200'}`}
            >
                {month}
            </button>
        ))}
          </div>
          {/* Calendar */}
          <div className="flex-1 p-2">
              <div className="grid grid-cols-7 gap-1">
                  {weekDays.map((day) => (
                      <div key={day} className="text-center font-semibold text-xs p-1">
                          {day}
                      </div>
                  ))}
              </div>
              <div ref={dateRowRef} className="h-[180px] overflow-y-auto">
                  <div className="grid grid-cols-7 gap-1">
                      {dates.map((date, index) => (
                          <button
                              key={index}
                              onClick={() => handleDateClick(date)}
                    className={`text-center p-1 rounded transition-colors duration-300 ${isSelectedDate(date) ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
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