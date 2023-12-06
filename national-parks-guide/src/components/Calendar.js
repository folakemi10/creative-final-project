import React from 'react';
import { db, deleteDoc, doc } from '../firebase';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ savedBookmarks, setSavedBookmarks }) => {
  const events = savedBookmarks.map((bookmark) => ({
    title: `${bookmark.parkName} - ${bookmark.activityName}`,
    start: new Date(bookmark.selectedDate),
    end: new Date(bookmark.selectedDate),
    id: bookmark.id,
    bookmarkDetails: bookmark, 
  }));

  const CustomEvent = ({ event }) => (
    <div>
      <strong>{event.title}</strong>
      <p>Park Name: {event.bookmarkDetails.parkName}</p>
      <p>Activity Name: {event.bookmarkDetails.activityName}</p>
      <p>Date: {moment(event.start).format('MMMM Do YYYY, h:mm:ss a')}</p>
      <button onClick={() => handleDeleteBookmark(event.id)}>Delete</button>
    </div>
  );

  const handleDeleteBookmark = async (id) => {
    try {
      await deleteDoc(doc(db, 'bookmarks', id));
      setSavedBookmarks((prevBookmarks) => prevBookmarks.filter((bookmark) => bookmark.id !== id));
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        components={{
          event: CustomEvent, 
        }}
      />

      <div className="bookmarks-container">
        <h1 className="mt-5">Profile Page</h1>
        <h2>Saved Bookmarks</h2>
        <ul>
          {savedBookmarks.map((bookmark) => (
            <li key={bookmark.id}>
              {bookmark.parkName} - {bookmark.activityName} ({bookmark.selectedDate})
              <button onClick={() => handleDeleteBookmark(bookmark.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyCalendar;
