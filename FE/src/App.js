import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Test from './component/Test';
import Home from './component/Home';
function App() {
  return (
    <div className="App h-screen ">
      <Router>
          <Routes>
          <Route path="/" element={<Test />} /> 
          <Route path="/Test" element={<Home />} /> 
          </Routes>
      </Router>
    </div>
  );
}

export default App;
