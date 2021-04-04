import React from 'react';
import { Link } from 'react-router-dom'
import './card.styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';



const Card = ({ eventName, imageUrl,eventId }) => (
  
  <div className="card"   >
    <img
      className="card-img-top" 
      src={imageUrl
      } alt="No image" />
    <div className="card-body">
    <h5 className="card-title">{eventId}</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button className="btn btn-primary">Book This Event</button><br></br><br></br>
    
    <Link to= {"/event-info/"+eventId} >&#10097; Find More about the event</Link>
    
  </div> 
  </div>
  
);

export default Card;
