import React from 'react';
import { Link } from 'react-router-dom'
import './card.styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';



const Card = ({ eventName, imageUrl,eventId }) => {
  //console.log(imageUrl.data)

  function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return binary;
}

  const img_url = _arrayBufferToBase64(imageUrl.data);
  
  //console.log(img_url)

    return (

      <div className="card"   >
        <img
          className="card-img-top"
          src={img_url} alt="" />
        <div className="card-body">
          <h5 className="card-title">{eventName}</h5>
          <Link to={"/event-info/" + eventId} >&#10097; Find More about the event</Link>
          {/* <p className="card-text">{eventName}</p>
    <button className="btn btn-primary">Book This Event</button><br></br><br></br> */}

        </div>
      </div>


    );

  
  
  };

export default Card;
