import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const navigate = useNavigate();
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

      const bookingData = await response.json();
      setIsBookingLoading(false);
      navigate(`/confirm-booking/${id}`, { state: bookingData });

    } catch (error) {
      console.error('Error booking slot:', error);
      setBookingError('Failed to book slot. Please try again.');
      setIsBookingLoading(false);
    }
  };

  return (
    <div className='h-full p-4'>
      <h1 className='text-4xl font-bold dark:text-white'>Book Your Facility</h1>
      <form onSubmit={handleSubmit}>
          <div className='py-4 grid gap-6 mb-6 md:grid-cols-5'>
            <div className='flex-wrap'>
              <label htmlFor="date" className="block mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Select Date:</label>
              <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className='flex-wrap' >
              <label htmlFor="slot" className="block mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Select Slot:</label>
              <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' id="slot" value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} required>
                <option value="">Select Slot</option>
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}:00 - {slot + 1}:00
                  </option>
                ))}
              </select>
            </div>
          <div className='py-8 px-0 mb-2'>
            <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' type="submit" disabled={isBookingLoading}>Book Slot</button>
          </div>
          </div>
      </form>
      {bookingError && <p style={{ color: 'red' }}>{bookingError}</p>}
    </div>
  );
};

export default BookingForm;
