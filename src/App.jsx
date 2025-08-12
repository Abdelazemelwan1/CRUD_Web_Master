import React from 'react';
import Dashboard from './pages/DashBoard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreationSuccess from "./components/CreationSuccess";
import AddItemModal from './pages/AddItem';
import UpdateItem from './pages/UpdateItem';
import { Toaster } from 'react-hot-toast';

function App() {

  return (<>
      <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/creation-success" element={<CreationSuccess />} />
            <Route path="/add" element={<AddItemModal />} />
            <Route path="/user/:id/edit" element={<UpdateItem />} />
          </Routes>
      </Router>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App
