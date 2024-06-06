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
      <table>
        <tr>
          <th><strong>Facility ID:</strong></th> 
          <th><strong>Date:</strong> </th> 
          <th><strong>Hour Slot:</strong></th>
        </tr>
        <tr>
          <td>{bookingDetails.facility_id}</td>
          <td>{bookingDetails.date}</td>
          <td>{bookingDetails.slot}</td>
        </tr>
        </table>
      <p>Thank you for booking!</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default BookingConfirmation;
