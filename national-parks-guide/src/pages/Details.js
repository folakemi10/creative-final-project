import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db, addDoc, collection, query, where, getDocs, updateDoc, doc } from '../firebase';

const Details = () => {
  const { parkName, activityName } = useParams();
  const [selectedDate, setSelectedDate] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchExistingEntry = async () => {
      if (currentUser) {
        const q = query(
          collection(db, 'bookmarks'),
          where('userId', '==', currentUser.uid),
          where('parkName', '==', parkName),
          where('activityName', '==', activityName)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
          const existingEntry = querySnapshot.docs[0].data();
          setSelectedDate(existingEntry.selectedDate || '');
        }
      }
    };

    fetchExistingEntry();
  }, [currentUser, parkName, activityName]);

  const handleSave = async () => {
    if (!selectedDate) {
      return;
    }

    const existingEntryQuery = query(
      collection(db, 'bookmarks'),
      where('userId', '==', currentUser.uid),
      where('parkName', '==', parkName),
      where('activityName', '==', activityName),
      where('selectedDate', '==', selectedDate)
    );

    const existingEntrySnapshot = await getDocs(existingEntryQuery);

    if (existingEntrySnapshot.size > 0) {
      const existingEntryDoc = existingEntrySnapshot.docs[0];
      await updateDoc(doc(db, 'bookmarks', existingEntryDoc.id), {
        selectedDate,
      });

      console.log('Bookmark updated:', existingEntryDoc.id);
    } else {
      const docRef = await addDoc(collection(db, 'bookmarks'), {
        userId: currentUser.uid,
        parkName,
        activityName,
        selectedDate,
      });

      console.log('Bookmark added with ID:', docRef.id);
    }
  };

  return (
    <div>
      <h2>
        <strong>{parkName}</strong> 
      </h2>
      <h3>
      {activityName}
      </h3>
      <label>Date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Details;
