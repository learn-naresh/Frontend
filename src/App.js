import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Facilities from './components/Facilities';
import FacilityDetails from './components/FacilityDetails';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';
import Register from './components/Register';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact';
import Service from './components/Service';
import Pricing from './components/Pricing';
import Root from './components/Root';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(appStore);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "", element: <Facilities /> },
      { path: "facility/:id", element: <FacilityDetails /> },
      { path: "booking/:id", element: <BookingForm /> },
      { path: "confirm-booking/:id", element: <BookingConfirmation /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "services", element: <Service /> },
      { path: "pricing", element: <Pricing /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
