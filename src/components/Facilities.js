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
      <form>
        <div className='px-4 py-4 grid gap-6 mb-6 md:grid-cols-2'>
          <div className='flex-wrap'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sport name</label>
            <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" name="sports" placeholder="Sports" onChange={handleFilterChange} />
          </div>
          <div className='flex-wrap' >
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pincode</label>
            <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" name="pincode" placeholder="Pincode" onChange={handleFilterChange} />
          </div>
        </div>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : facilities.length === 0 ? (
        <p>No facilities found for the specified filters.</p>
      ) : (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope="col" className='px-6 py-3'>Facility ID</th> 
              <th scope="col" className='px-6 py-3'>Name </th>
              <th scope="col" className='px-6 py-3'>Category </th> 
              <th scope="col" className='px-6 py-3'>Location </th> 
              <th scope="col" className='px-6 py-3'>Pincode </th> 
            </tr>
          </thead>
          <tbody>
            {facilities.map((facility) => (
              <tr key={facility.id} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                <th scope="row" className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'><Link to={`/facility/${facility.id}`}>{facility.id}</Link></th>
                <td className='px-6 py-4'><Link to={`/facility/${facility.id}`}>{facility.name}</Link></td>
                <td className='px-6 py-4'><Link to={`/facility/${facility.id}`}>{facility.sports}</Link></td>
                <td className='px-6 py-4'><Link to={`/facility/${facility.id}`}>{facility.location}</Link></td>
                <td className='px-6 py-4'><Link to={`/facility/${facility.id}`}>{facility.pincode}</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};
export default Facilities;