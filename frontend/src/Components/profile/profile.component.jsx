import React, { useEffect, useState } from 'react';
import axios from 'axios';



const Profile = () => {
    const [createdEvents, setCreatedEvents] = useState([]);

    useEffect(() => {
        console.log("Profile")
        axios.get("http://localhost:4040/events/created",{withCredentials: true})
        .then(res => {
                console.log(res.data.events)
        })
        .catch(e => console.log(e))
    });


    return (
        <div>
            
        </div>
    );
};

export default Profile;