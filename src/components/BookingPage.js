import React, { useState } from 'react';
import BookingForm from './BookingForm';
import BookingConfirmation from './BookingConfirmation';

const BookingPage = () => {
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleBookingSuccess = (data) => {
    setBookingDetails(data);
  };

  return (
    <div>
      {bookingDetails ? (
        <BookingConfirmation bookingDetails={bookingDetails} />
      ) : (
        <BookingForm onBookingSuccess={handleBookingSuccess} />
      )}
    </div>
  );
};

export default BookingPage;
