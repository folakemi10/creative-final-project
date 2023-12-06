import React, { useState } from 'react';
import Dropdown from './Dropdown';

const SearchBar = ({ onSearch }) => {
  const [selectedParkCode, setSelectedParkCode] = useState('');
  const [selectedParkName, setSelectedParkName] = useState('');

  const handleDropdownSelect = (parkCode, parkName) => {
    setSelectedParkCode(parkCode);
    setSelectedParkName(parkName);
  };

  const handleSearch = () => {
    onSearch(selectedParkCode, selectedParkName);
  };

  return (
    <div>
      <Dropdown onSelect={handleDropdownSelect} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
