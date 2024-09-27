import React from 'react';
import ComponentB from './components/ComponentB';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Component A Demo</h1>
      <ComponentB />
    </div>
  );
};

export default App;