import React, { useState, useEffect } from 'react';

const DatePicker = ({ initialDate }) => {
    const [selectedDate, setSelectedDate] = useState(initialDate || new Date());
    const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());

    useEffect(() => {
        setCurrentYear(selectedDate.getFullYear());
        setCurrentMonth(selectedDate.getMonth());
    }, [selectedDate]);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const generateDates = () => {
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
        const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
        const dates = [];

      // Calculate the start date (two weeks before the selected date)
      const startDate = new Date(selectedDate);
      startDate.setDate(selectedDate.getDate() - 14);

      // Generate 21 days (3 weeks)
      for (let i = 0; i < 21; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          dates.push(date);
      }

      return dates;
  };

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleYearClick = (year) => {
        setCurrentYear(year);
    };

    const handleMonthClick = (month) => {
        setCurrentMonth(month);
    };

    const isSelectedDate = (date) => {
        return date.toDateString() === selectedDate.toDateString();
    };

    const dates = generateDates();

    const getVisibleMonths = () => {
        const monthIndex = months.indexOf(months[currentMonth]);
        const visibleMonths = [];
        for (let i = -2; i <= 2; i++) {
            const index = (monthIndex + i + 12) % 12;
            visibleMonths.push(months[index]);
        }
        return visibleMonths;
    };

    return (
        <div className="flex border rounded-lg overflow-hidden shadow-lg">
          {/* Year and Month selectors */}
          <div className="w-20 bg-gray-100 flex flex-col items-center justify-center">
              {[currentYear - 1, currentYear, currentYear + 1].map((year) => (
                  <button
                      key={year}
                      onClick={() => handleYearClick(year)}
                      className={`w-full p-2 ${year === currentYear ? 'font-bold bg-blue-100' : ''}`}
                  >
                      {year}
                  </button>
              ))}
          </div>
          <div className="w-16 bg-gray-100 flex flex-col items-center justify-center">
              {getVisibleMonths().map((month, index) => (
                  <button
                      key={index}
                      onClick={() => handleMonthClick(months.indexOf(month))}
                      className={`w-full p-2 ${month === months[currentMonth] ? 'font-bold bg-blue-100' : ''}`}
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
                  {dates.map((date, index) => (
                      <button
                          key={index}
                          onClick={() => handleDateClick(date)}
                  className={`text-center p-1 rounded ${isSelectedDate(date) ? 'bg-blue-500 text-white' : ''
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
  );
};

export default DatePicker;