import React, { useState } from 'react';
import DatePicker from './DatePicker';

const DatePickerDemo = () => {
    const [initialDate, setInitialDate] = useState(new Date());

    const handleInitialDateChange = (event) => {
        const date = new Date(event.target.value);
        if (!isNaN(date.getTime())) {
            setInitialDate(date);
        }
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">DatePicker Demo</h1>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Initial Date:
                </label>
                <input
                    type="date"
                    value={initialDate.toISOString().split('T')[0]}
                    onChange={handleInitialDateChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">DatePicker Component:</h2>
                <DatePicker initialDate={initialDate} />
            </div>

            <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Selected Date:</h2>
                <p className="text-gray-700">
                    {initialDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
            </div>
        </div>
    );
};

export default DatePickerDemo;