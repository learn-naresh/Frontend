import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BookingConfirmation = () => {
  const location = useLocation();
  const bookingDetails = location.state;

  if (!bookingDetails) {
    return (
      <div>
        <p>No booking details available.</p>
        <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'><Link to="/">Back to Home</Link></button>
      </div>
    );
  }

  return (
    <div>
      <h1 className='text-4xl font-bold dark:text-white'>Thank you for booking!</h1>
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
      <div className='py-4 mt-auto '>
        <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'><Link to="/">Back to Home</Link></button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
