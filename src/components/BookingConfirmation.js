import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BookingConfirmation = () => {
  const location = useLocation();
  const bookingDetails = location.state;

  if (!bookingDetails) {
    return (
      <div>
        <p>No booking details available.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Booking Confirmation</h1>
      <p>Your booking details:</p>
      <ul>
        <li><strong>Facility ID:</strong> {bookingDetails.facility_id}</li>
        <li><strong>Date:</strong> {bookingDetails.date}</li>
        <li><strong>Hour Slot:</strong> {bookingDetails.slot}</li>
      </ul>
      <p>Thank you for booking!</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default BookingConfirmation;
