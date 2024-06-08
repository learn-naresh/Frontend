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

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

let persistor = persistStore(appStore);

function App() {
  return (
    <Provider store={appStore}>
      <PersistGate persistor={persistor}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Facilities />} />
          <Route path="/facility/:id" element={<FacilityDetails />} />
          <Route path="/booking/:id" element={<BookingForm />} />
          <Route path="/confirm-booking/:id" element={<BookingConfirmation />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
