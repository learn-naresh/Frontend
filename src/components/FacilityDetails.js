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
    <div>
      <h1>{facility.name}</h1>
      <p>{facility.description}</p>
      <p>{facility.location}</p>
      <Link to={`/booking/${facility.id}`}>Book Now</Link>
    </div>
  );
};

export default FacilityDetails;
