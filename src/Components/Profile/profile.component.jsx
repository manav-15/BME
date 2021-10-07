import React, { useState } from "react";

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { callMsGraph } from "../../graph";
import {ProfileData} from "./profileData.component"
import EventService from '../../Services/EventService';

const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    function userExists(email){
        EventService.userExists(email).then((res) => {
            console.log(res.data);
            if(res.data){
                console.log("true");
            }else{
                console.log("fALSE")
            }
        })

    }

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        });
        //userExists(graphData.userPrincipalName);
    }

    return (
        <>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
            <h5 className="card-title">Welcome {accounts[0].name}</h5>
            {graphData ? 
                <ProfileData graphData={graphData} />
                : RequestProfileData()
                // <button variant="secondary" onClick={RequestProfileData}>Request Profile Information</button>
            }
        </>
    );
};



const Profile = () => {
    
    return(
        <div className="container">
        <AuthenticatedTemplate>
                <ProfileContent />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
    
        <p>Please login to see profile details!</p>
        </UnauthenticatedTemplate>
    </div>
    )


};

export default Profile;