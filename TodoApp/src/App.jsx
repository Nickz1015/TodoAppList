// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoApp from './TodoApp';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoApp />} />
        {/* Add more routes as needed */}
        {/* <Route path="/another-page" element={<AnotherPageComponent />} /> */}
        {/* Default route (if none of the above match) */}
        {/* <Route path="/" element={<TodoApp />} /> */}
      </Routes>
    </Router>
  );
};

// const Home = () => {
//   return <h1>Home Page</h1>;
// };

// Optional: Add more components for additional routes

export default App;
