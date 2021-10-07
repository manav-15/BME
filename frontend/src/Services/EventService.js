import axios from 'axios';

const EVENT_API_BASE_URL = "http://localhost:8080/api/v1/";

class EventService{

    getEvents(){
        return axios.get(EVENT_API_BASE_URL + "events");
    }
    
    getEventById(id){
        return axios.get(EVENT_API_BASE_URL+"events/"+id);
    }

    userExists(email){
        return axios.get(EVENT_API_BASE_URL+ "/users/exists/" + email);
    }

}

export default new EventService()