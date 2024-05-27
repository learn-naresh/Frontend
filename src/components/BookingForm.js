import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [date, setDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookingError, setBookingError] = useState(null);
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const response = await fetch(`http://localhost:3000/bookings/available_slots?date=${date}&facility_id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch available slots');
        }
        const data = await response.json();
        setAvailableSlots(data);
      } catch (error) {
        console.error('Error fetching available slots:', error);
      }
    };

    if (date) {
      fetchAvailableSlots();
    }
  }, [date, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      setBookingError('Please select a slot to book.');
      return;
    }

    setIsBookingLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          facility_id: id,
          date,
          slot: selectedSlot,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to book slot');
      }

      setIsBookingLoading(false);
      navigate(`/booking/${id}/confirmation`);

    } catch (error) {
      console.error('Error booking slot:', error);
      setBookingError('Failed to book slot. Please try again.');
      setIsBookingLoading(false);
    }
  };

  return (
    <div>
      <h1>Book Facility</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Select Date:</label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label htmlFor="slot">Select Slot:</label>
        <select id="slot" value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} required>
          <option value="">Select Slot</option>
          {availableSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}:00 - {slot + 1}:00
            </option>
          ))}
        </select>

        <button type="submit" disabled={isBookingLoading}>Book Slot</button>
      </form>

      {bookingError && <p style={{ color: 'red' }}>{bookingError}</p>}
    </div>
  );
};

export default BookingForm;
