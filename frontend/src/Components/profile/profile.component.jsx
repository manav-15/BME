import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { setUser, selectUser } from '../Header/userSlice';
import Card from '../card/card.component';

import './profile.styles.scss';


const Profile = () => {
    const [createdEvents, setCreatedEvents] = useState([]);
    const [bookedEvents, setBookedEvents] = useState([]);
    const user = useSelector(selectUser);
    
    
    useEffect(() => {
        console.log("Profile")
        //console.log(user)
        if (user && user.isAdmin) {
            console.log("admin");
            // axios.get("http://localhost:4040/events/created", { withCredentials: true })
            // .then(res => {
            //     console.log(res.data.events)
            //     setCreatedEvents(res.data.events);
            // })
            // .catch(e => console.log(e));

            
        }
        
    },[user]);


    const getCreatedEvents = () => {
        if(user && user.isAdmin){
            axios.get("http://localhost:4040/events/created", { withCredentials: true })
            .then(res => {
                console.log(res.data.events)
                setCreatedEvents(res.data.events);
            })
            .catch(e => console.log(e));
        }
    }

    const getBookedEvents = () => {
        if(user){
            axios.get("http://localhost:4040/events/book", {withCredentials: true})
            .then(res => {
                console.log(res.data.events);
                setBookedEvents(res.data.events)
            })
            .catch(e => console.log(e))
        }
        
    }

    return (
        <div className='container-fluid mt-5 pt-5 mb-3'>
            {user && user.isAdmin &&
                <div>
                    <div className='row'>
                        <div className='col-sm'>
                        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={getCreatedEvents}>
                                Show Created Events
                            </button>
                        </div>
                    </div>
                
                    <div className="row row-cols-1 row-cols-md-4 g-0 collapse mt-1 pt-1" id="collapseExample">
                        {createdEvents.map(({ id, name, imageUrl, startTime, endTime, organizer }) => (
                            <Card key={id} eventName={name} imageUrl={imageUrl} eventId={id} startTime={startTime} endTime={endTime} organizer={organizer} />
                        ))}
                    </div>
                
                </div>
            }
            <div className='row mt-2 pt-2'>
                        <div className='col-sm'>
                            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2" onClick={getBookedEvents}>
                                Show Booked Events
                            </button>
                        </div>
            </div>
            <div className="row row-cols-1 row-cols-md-4 g-0 collapse mt-1 pt-1" id="collapseExample2">
                        {bookedEvents.map(({ id, name, imageUrl, startTime, endTime, organizer }) => (
                            <Card key={id} eventName={name} imageUrl={imageUrl} eventId={id} startTime={startTime} endTime={endTime} organizer={organizer} />
                        ))}
            </div>
        
        </div>
    );
};

export default Profile;