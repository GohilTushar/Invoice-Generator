import { useState } from 'react';
import PropTypes from 'prop-types';

const FilterDropdown = ({ onFilterChange }) => {
  
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSelectedStatus(value);
    onFilterChange(value);
  };

  return (
    <div className="relative">
      <select
        value={selectedStatus}
        onChange={handleFilterChange}
        className="appearance-none bg-white border border-blue-900 rounded py-2 px-4 text-blue-900 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 shadow-sm hover:shadow-md"
      >
        <option value="" className="text-gray-700">All Status</option>
        <option value="Pending" className="text-yellow-500 font-medium">Pending</option>
        <option value="Delivered" className="text-green-500 font-medium">Delivered</option>
        <option value="Shipped" className="text-red-500 font-medium">Shipped</option>
      </select>
    </div>
  );
};

FilterDropdown.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};
export default FilterDropdown;
