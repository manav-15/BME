import React from "react";
import EventService from '../../Services/EventService';
/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
export const ProfileData = (props) => {
    //console.log(props.graphData);
    const email = props.graphData.userPrincipalName;
    

    function userExists(){
        EventService.userExists(email).then((res) => {
            console.log(res.data);
            if(res.data){
                console.log("true");
            }else{
                console.log("fALSE")
            }
        })
    }

    return (
        <div id="profile-div">
            <p><strong>First Name: </strong> {props.graphData.givenName}</p>
            <p><strong>Last Name: </strong> {props.graphData.surname}</p>
            <p><strong>Email: </strong> {props.graphData.userPrincipalName}</p>
            <p><strong>Id: </strong> {props.graphData.id}</p>
            {/* {userExists()} */}
            {/* <p>User exists: {userExists()? <p>Yes</p> : <p>No</p>}</p> */}
        </div>
    );
};

export default ProfileData;