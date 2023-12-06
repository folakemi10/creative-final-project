import React, { useState, useEffect } from 'react';
import { getAllParks } from '../services/apiService';

const Dropdown = ({ onSelect }) => {
  const [parks, setParks] = useState([]);

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const allParks = await getAllParks();
        setParks(allParks);
      } catch (error) {
      }
    };

    fetchParks();
  }, []);

  const handleSelect = (event) => {
    const selectedParkCode = event.target.value;
    const selectedPark = parks.find((park) => park.parkCode === selectedParkCode);
    

    onSelect(selectedParkCode, selectedPark ? selectedPark.fullName : '');
  };

  return (
    <select onChange={handleSelect}>
      {parks.map((park) => (
        <option key={park.id} value={park.parkCode}>
          {park.fullName}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
