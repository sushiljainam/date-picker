import React, { useState } from 'react';
import ComponentA from './ComponentA';

const ComponentB = () => {
    const [props, setProps] = useState({
        title: 'Sample Title',
        description: 'This is a sample description.',
        theme: 'light',
        showButton: true,
    });

    const handleChange = (prop, value) => {
        setProps(prevProps => ({ ...prevProps, [prop]: value }));
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 p-4">
            <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Props Control Panel</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={props.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className="mt-1 w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <input
                            type="text"
                            value={props.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            className="mt-1 w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Theme</label>
                        <select
                            value={props.theme}
                            onChange={(e) => handleChange('theme', e.target.value)}
                            className="mt-1 w-full px-3 py-2 border rounded-md"
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={props.showButton}
                            onChange={(e) => handleChange('showButton', e.target.checked)}
                            className="mr-2"
                        />
                        <label className="text-sm font-medium text-gray-700">Show Button</label>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Component Preview</h2>
                <ComponentA {...props} />
            </div>
        </div>
    );
};

export default ComponentB;