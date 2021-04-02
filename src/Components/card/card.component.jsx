import React from 'react';

import './card.styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ eventName, imageUrl }) => (
  <div className="card"   >
    <img
      className="card-img-top" 
      src={`url(${imageUrl})`
      } alt="No image" />
    <div className="card-body">
    <h5 className="card-title">{eventName}</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button className="btn btn-primary">Book This Event</button><br></br><br></br>
    <a href="#">Find More about the event</a>
  </div> 
  </div>
);

export default Card;
