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
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope="col" className='px-6 py-3'>Facility ID</th>
            <th scope="col" className='px-6 py-3'>Date </th> 
            <th scope="col" className='px-6 py-3'>Hour Slot</th>
          </tr>
        </thead>
        <tbody>
          <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
            <th scope="row" className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{bookingDetails.facility_id}</th>
            <td className='px-6 py-4'>{bookingDetails.date}</td>
            <td className='px-6 py-4'>{bookingDetails.slot}</td>
          </tr>
        </tbody>
      </table>
      <p>Thank you for booking!</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default BookingConfirmation;
