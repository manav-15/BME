import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { setUser, selectUser } from '../Header/userSlice';


const Profile = () => {
    const [createdEvents, setCreatedEvents] = useState([]);
    const user = useSelector(selectUser);
    
    
    useEffect(() => {
        console.log("Profile")
        //console.log(user)
        if (user && user.isAdmin) {
            console.log("admin");
            axios.get("http://localhost:4040/events/created", { withCredentials: true })
            .then(res => {
                console.log(res.data.events)
            })
            .catch(e => console.log(e))
        }
        
    },[user]);


    return (
        <div>
            
        </div>
    );
};

export default Profile;