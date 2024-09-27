import React from 'react';

const ComponentA = ({ title, description, theme, showButton }) => {
    return (
        <div className={`w-full max-w-md p-4 border rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p>{description}</p>
            {showButton && (
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Click me!
                </button>
            )}
        </div>
    );
};

export default ComponentA;