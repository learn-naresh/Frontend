import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [filters, setFilters] = useState({ sports: '', pincode: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`http://localhost:3000/facilities?${query}`);
      const data = await response.json();
      setFacilities(data);
      setLoading(false);
    };

    fetchFacilities();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Sports Facilities</h1>
      <div>
        <input type="text" name="sports" placeholder="Sport" onChange={handleFilterChange} />
        <input type="text" name="pincode" placeholder="Pincode" onChange={handleFilterChange} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : facilities.length === 0 ? (
        <p>No facilities found for the specified filters.</p>
      ) : (
        <ul>
          {facilities.map((facility) => (
            <li key={facility.id}>
              <Link to={`/facility/${facility.id}`}>{facility.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Facilities;
