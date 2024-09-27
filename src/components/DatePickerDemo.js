import React, { useState } from 'react';
import DatePicker from './DatePicker';

const DatePickerDemo = () => {
    const [settings, setSettings] = useState({
        initialDate: new Date(),
        language: 'en',
        size: 'medium',
    });

    const handleSettingChange = (setting, value) => {
        setSettings(prev => ({ ...prev, [setting]: value }));
    };

    const handleDateChange = (date) => {
        console.log('Selected date:', date);
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">DatePicker Demo</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <h2 className="text-lg font-semibold mb-2">Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Initial Date:
                            </label>
                            <input
                                type="date"
                                value={settings.initialDate.toISOString().split('T')[0]}
                                onChange={(e) => handleSettingChange('initialDate', new Date(e.target.value))}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Language:
                            </label>
                            <select
                                value={settings.language}
                                onChange={(e) => handleSettingChange('language', e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                                <option value="en">English</option>
                                <option value="hi">Hindi</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Size:
                            </label>
                            <select
                                value={settings.size}
                                onChange={(e) => handleSettingChange('size', e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                                <option value="compact">Compact</option>
                                <option value="medium">Medium</option>
                                <option value="cozy">Cozy</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-2">DatePicker Component</h2>
                    <DatePicker
                        initialDate={settings.initialDate}
                        language={settings.language}
                        size={settings.size}
                        onChange={handleDateChange}
                    />
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">Current Settings:</h2>
                <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
                    {JSON.stringify(settings, null, 2)}
                </pre>
            </div>
        </div>
    );
};

export default DatePickerDemo;