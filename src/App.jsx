import React from 'react';
import Dashboard from './pages/DashBoard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreationSuccess from "./components/CreationSuccess";

function App() {

  return (
  <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/creation-success" element={<CreationSuccess />} />
      </Routes>
    </Router>
  )
}

export default App
