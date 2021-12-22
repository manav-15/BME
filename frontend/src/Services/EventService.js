import axios from 'axios';

const EVENT_API_BASE_URL = "http://localhost:4040/events";

class EventService{

    getEvents(){
        return axios.get(EVENT_API_BASE_URL + '/list');
    }
    
    getEventById(id){
        return axios.get(EVENT_API_BASE_URL+'/'+id);
    }

}

export default new EventService()