// Home.js
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { getActivitiesForPark } from '../services/apiService';
import Card from '../components/Cards';
import './HomeStyle.css'; // Import the CSS file

const Home = () => {
  const [activities, setActivities] = useState([]);
  const [selectedParkName, setSelectedParkName] = useState('');

  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element) => {
      element.classList.add('fade-in');
    });
  }, []);

  const handleSearch = async (parkCode, parkName) => {
    try {
      const parkActivities = await getActivitiesForPark(parkCode);
      setActivities(parkActivities);
      setSelectedParkName(parkName);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5 fade-in fade-in-delay">Welcome to the National Parks Website!</h1>
      <p className="fade-in fade-in-delay">Explore the beauty of our national parks.</p>
      <SearchBar onSearch={handleSearch} />
      <div className="row mt-4">
        {activities.map((activity) => (
          <div className="col-md-4 mb-4 fade-in" key={activity.id}>
            <Card
              title={activity.name}
              parkName={selectedParkName}
              activityName={activity.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
