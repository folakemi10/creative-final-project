import axios from 'axios';

const API_KEY = 'AIMAonmNZ5IDWpnmlMR2kVHfSoe09elKEYKFfW7X';

const api = axios.create({
  baseURL: 'https://developer.nps.gov/api/v1',
  params: {
    api_key: API_KEY,
  },
});

export const getAllParks = async () => {
  try {
    const response = await api.get('/parks');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching national parks:', error);
    throw error;
  }
};

export const getActivitiesForPark = async (parkCode) => {
    try {
      const response = await api.get(`/activities?parkCode=${parkCode}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }
};

export const getParkCoordinates = async (parkName) => {
  try {
    const response = await axios.get(`https://developer.nps.gov/api/v1/parks?parkName=${parkName}&api_key=${API_KEY}`);
    
    const parkData = response.data.data[0];

    return {
      latitude: parkData.latitude,
      longitude: parkData.longitude,
    };
  } catch (error) {
    console.error(`Error fetching coordinates for ${parkName}:`, error);
    throw error;
  }
};
  
