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
  const [isBooked, setIsBooked] = useState(false);
  const [isCreated, setIsCreated] = useState(false)
  const user = useSelector(selectUser);

  useEffect(() => {

    EventService.getEventById(props.match.params.eventId).then((res) => {
      console.log(res.data)
      setEvent(res.data.event);
      if(res.data.event){
        setImgUrl(arrayBufferToBase64(res.data.event.imageUrl.data));
      }
      
      //if(res.data.event.userEmail == user.email) setIsCreated(true);
      //console.log(event);
    });
    //console.log(event);

    if(user){
      axios.get('http://localhost:4040/events/book/' + props.match.params.eventId + '/user/' + user.id)
      .then( res => {
        if(res.data.isBooked) setIsBooked(true);
        if(res.data.userEmail == user.email) setIsCreated(true);
      })
      .catch(e => {
        console.log(e)
      })
    }

  }, [user]);



  const bookEvent = () => {
    if(event && user){
      const body = {
        userId: user.id,
        eventId: event.id
      }
      axios.post("http://localhost:4040/events/book",body, { withCredentials: true })
        .then(res => {
          //console.log(res);
          window.alert("Booked Successfully");
          setIsBooked(true);
          //setBookedEvents(res.data.events)
        })
        .catch(e => console.log(e))
    }
  }

  const cancelEvent = () => {
    if(event && user && isBooked){
      axios.put('http://localhost:4040/events/book', {
        userId: user.id,
        eventId: event.id
      }, { withCredentials: true })
      .then(res => {
        window.alert("Booking Removed!");
        setIsBooked(false);

      })
      .catch(e => console.log(e));
    }
  }

  const removeEvent = () => {
    if(event && user){
      axios.delete('http://localhost:4040/events/' + event.id, {withCredentials: true})
      .then(res => {
        console.log(res);
        window.alert("Event removed succesfully!");
        window.location.href = '/'
      })
      .catch(e => console.log(e));
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
              {!isBooked ? 
              <button className="btn btn-primary" onClick={bookEvent}>Book This Event</button> :
              <button className="btn btn-primary" onClick={cancelEvent}>Cancel Booking</button>
              }
              
              {
                isCreated && <button className="btn btn-primary ml-1 " onClick={removeEvent}>Remove Event</button>
              }
              
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