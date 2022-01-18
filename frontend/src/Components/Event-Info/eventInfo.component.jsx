import React, { useEffect, useState } from 'react'
import EventService from '../../Services/EventService';
import axios from 'axios';
import './eventInfo.styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { arrayBufferToBase64 } from '../../Functions/bufferToBase64';
import { useSelector, useDispatch } from 'react-redux'
import { setUser, selectUser } from '../Header/userSlice';

const EventInfoComponent = (props) => {  

  const [event, setEvent] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const user = useSelector(selectUser);

  useEffect(() => {

    EventService.getEventById(props.match.params.eventId).then((res) => {
      console.log(res.data.event)
      setEvent(res.data.event);
      setImgUrl(arrayBufferToBase64(res.data.event.imageUrl.data));

      //console.log(event);
    });
    //console.log(event);

  }, []);



  const bookEvent = () => {
    if(event){
      const body = {
        userId: user.id,
        eventId: event.id
      }
      axios.post("http://localhost:4040/events/book",body, { withCredentials: true })
        .then(res => {
          console.log(res);
          window.alert("Booked Successfully");
          //setBookedEvents(res.data.events)
        })
        .catch(e => console.log(e))
    }
  }


  return (
    <div>
      {/* <h1>{this.props.match.params.eventId}</h1> */}
      {/* <h1>{event.eventName}</h1> */}
      <div className="container mt-5 pt-5 mb-3">
        <div className="row">
          <div className="col-md">
            <img
              className="eventInfoImage"
              src={imgUrl
              } alt="No image" />
          </div>
          <div className="col-md">
            <div className="eventInfo">
              <div className="eventTitle">
                <h1>{event && event.name}</h1>
              </div>
              <div className="eventOrganiser">
                <p>By: {event && event.organizer}</p>
              </div>
              <div className="eventDescription">
                <p>Start Time: {event && (new Date(event.startTime)).toLocaleString('en-GB')}</p>
                <p>End Time: {event && (new Date(event.endTime)).toLocaleString('en-GB')}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente magni
                  officia dolor doloremque aperiam optio, est officiis amet, fugit placeat harum ea
                  reprehenderit mollitia sit deleniti ad debitis consequuntur adipisci!</p>
              </div>
              <div className="eventFindMore">
                <a href="#">Find More</a>
              </div>

              <button className="btn btn-primary" onClick={bookEvent}>Book This Event</button>
            </div>

          </div>
          {/* <div className="col-md">
                    One of three columns
                  </div> */}
        </div>
      </div>

    </div>
  )
}

export default EventInfoComponent;