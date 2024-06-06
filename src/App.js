import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Facilities from './components/Facilities';
import FacilityDetails from './components/FacilityDetails';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

function App() {
  return (
    <Provider store={appStore} >
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Facilities />} />
        <Route path="/facility/:id" element={<FacilityDetails />} />
        <Route path="/booking/:id" element={<BookingForm />} />
        <Route path="/confirm-booking/:id" element={<BookingConfirmation />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
