import React from 'react';
import { useNavigate } from 'react-router-dom';
import './card-style.css';

const Card = (props) => {
  const navigate = useNavigate();

  const handleBookmark = () => {
    console.log('Park Name:', props.parkName);
    console.log('Activity Name:', props.activityName);
    navigate(`/activity/${props.parkName}/${props.activityName}`);

  }

  return (
    <div className="card text-center">
      <div className="overflow">
        {/* <img src={imageSrc} alt={props.title} className="card-img-top" /> */}
      </div>
      <div className="card-body text-dark">
        <h4 className="card-title">{props.title}</h4>
        <button onClick={handleBookmark} className="btn btn-success">
          Bookmark
        </button>
      </div>
    </div>
  );
};

export default Card;
