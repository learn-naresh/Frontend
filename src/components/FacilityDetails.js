import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const FacilityDetails = () => {
  const { id } = useParams();
  const [facility, setFacility] = useState(null);

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const response = await fetch(`http://localhost:3000/facilities/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch facility details');
        }
        const data = await response.json();
        setFacility(data);
      } catch (error) {
        console.error('Error fetching facility details:', error);
      }
    };

    fetchFacility();
  }, [id]);

  if (!facility) return <div>Loading...</div>;

  return (
    <div className='h-full p-4'>
      <h1 className='text-4xl font-bold dark:text-white'>{facility.name}</h1><br></br>
      <p className='mb-3 text-gray-500 dark:text-gray-400'>{facility.description}</p>
      <p className='text-gray-500 dark:text-gray-400'>{facility.location}</p>
      <div className='py-4 mt-auto '>
        <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'><Link to={`/booking/${facility.id}`}>Book Now</Link></button>
      </div>
    </div>
  );
};

export default FacilityDetails;
