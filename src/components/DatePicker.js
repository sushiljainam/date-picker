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

    const generateDates = () => {
      const dates = [];
      const startDate = new Date(selectedDate);
      startDate.setDate(selectedDate.getDate() - 7); // Start from a week before

      for (let i = 0; i < 21; i++) { // Generate 3 weeks of dates
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          dates.push(date);
      }

      return dates;
  };

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

    const dates = generateDates();

    const getVisibleMonths = () => {
        const monthIndex = currentMonth;
        return [-2, -1, 0, 1, 2].map(offset => {
            const index = (monthIndex + offset + 12) % 12;
        const year = currentYear + Math.floor((monthIndex + offset) / 12);
        return { month: months[index], year };
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
                  {weekDays.map((day) => (
                      <div key={day} className="text-center font-semibold text-xs p-1">
                          {day}
                      </div>
                  ))}
              </div>
              <div ref={dateRowRef} className="h-[120px] overflow-y-auto">
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