import React from 'react';
import { Link } from 'react-router-dom'
import './card.styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { arrayBufferToBase64 } from '../../Functions/bufferToBase64';


const Card = ({ eventName, imageUrl, eventId, startTime, endTime, organizer }) => {
  //console.log(imageUrl.data)
  //console.log(typeof startTime)
  startTime = (new Date(startTime)).toLocaleString('en-GB');
  endTime = (new Date(endTime)).toLocaleString('en-GB');
  //console.log(startTime);

  function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return binary;
}

  const img_url = arrayBufferToBase64(imageUrl.data);
  
  //console.log(img_url)

    return (
      <div className='col'>
        <div className="card"  >
          <img
            className="card-img-top"
            src={img_url} alt="" />
          <div className="card-body mt-1">
            <h5 className="card-title mb-0 mt-0">{eventName}</h5>
            <p className='card-text mt-0'>
              <b>By</b> : {organizer}
              <br></br>
              <b>Starts at</b> : {startTime}
              <br></br>
              <b>Ends at</b> : {endTime}
              <br></br>
              <Link to={"/event-info/" + eventId} >&#10097; Find More about the event</Link>
              {/* <br></br>
              <Link to={"/event-info/" + eventId} >&#10097; Find More about the event</Link> */}

            </p>
            {/* <ul class="list-group list-group-flush">
              <li class="list-group-item">An item</li>
              <li class="list-group-item">A second item</li>
              <li class="list-group-item">A third item</li>
            </ul> */}


            {/* <p className="card-text">{eventName}</p>
            <button className="btn btn-primary">Book This Event</button><br></br><br></br> */}

          </div>
        </div>
        </div>


    );

  
  
  };

export default Card;
