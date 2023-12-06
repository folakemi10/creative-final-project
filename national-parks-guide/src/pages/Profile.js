import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, collection, query, where, getDocs, deleteDoc, doc } from '../firebase';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MyCalendar from '../components/Calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'leaflet/dist/leaflet.css';
import { getParkCoordinates } from '../services/apiService';

const Profile = () => {
  const { currentUser } = useAuth();
  const [savedBookmarks, setSavedBookmarks] = useState([]);
  const [parkCoordinates, setParkCoordinates] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (currentUser) {
        const q = query(collection(db, 'bookmarks'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);

        const bookmarks = [];
        querySnapshot.forEach((doc) => {
          bookmarks.push({ id: doc.id, ...doc.data() });
        });

        setSavedBookmarks(bookmarks);
      }
    };

    fetchBookmarks();
  }, [currentUser]);

  useEffect(() => {
    const fetchParkCoordinates = async () => {
      console.log('Fetching Park Coordinates...');
      const coordinates = {};

      for (const bookmark of savedBookmarks) {
        const { parkName } = bookmark;
        try {
          console.log(`Fetching coordinates for ${parkName}...`);
          const parkData = await getParkCoordinates(parkName);
          console.log(`Coordinates for ${parkName}:`, parkData);
          coordinates[parkName] = {
            lat: parkData.latitude,
            lng: parkData.longitude,
          };
        } catch (error) {
          console.error(`Error fetching coordinates for ${parkName}:`, error);
        }
      }

      console.log('Fetched Park Coordinates:', coordinates);
      setParkCoordinates(coordinates);
    };

    if (savedBookmarks.length > 0) {
      fetchParkCoordinates();
    }
  }, [savedBookmarks]);

  const defaultCenter = [37.7749, -122.4194];

  const handleDeleteBookmark = async (id) => {
    try {
      await deleteDoc(doc(db, 'bookmarks', id));
      setSavedBookmarks((prevBookmarks) => prevBookmarks.filter((bookmark) => bookmark.id !== id));
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  const handleResetPreferences = () => {
    setSelectedDate(null);
  };

  return (
    <div className="container">
      <div className="flex-container">
        <div className="map-container">
        <MapContainer
            style={{ height: '400px', width: '100%' }}
            center={defaultCenter}
            zoom={4}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {Object.keys(parkCoordinates).map((parkName) => {
              const { lat, lng } = parkCoordinates[parkName];
              return (
                <Marker key={parkName} position={[lat, lng]}>
                  <Popup>
                    <div>
                      <strong>{parkName}</strong>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>

        </div>
        <div className="calendar-container">
          <MyCalendar
            selectedDate={selectedDate}
            onChange={setSelectedDate}
            savedBookmarks={savedBookmarks}
            handleDeleteBookmark={handleDeleteBookmark}
          />
          <button onClick={handleResetPreferences}>Reset Preferences</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
