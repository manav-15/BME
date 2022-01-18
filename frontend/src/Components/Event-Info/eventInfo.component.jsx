import React from 'react'
import EventService from '../../Services/EventService';
import './eventInfo.styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { arrayBufferToBase64 } from '../../Functions/bufferToBase64';

class eventInfoComponent extends React.Component {  
  constructor() {
        super();
        
        this.state = {
          event: {},
          img_url: ''
        };
      }
      componentDidMount(){
        // console.log(this.props.match.params.eventId);
        EventService.getEventById(this.props.match.params.eventId).then((res) =>{
          console.log(res.data.event)
          this.setState({event: res.data.event});
          this.setState({img_url : arrayBufferToBase64(res.data.event.imageUrl.data)})
          
        //console.log(this.state.event);
        });
         console.log(this.state.event);
      }


    render(){
        return(   
            <div>
              {/* <h1>{this.props.match.params.eventId}</h1> */}
              {/* <h1>{this.state.event.eventName}</h1> */}
              <div className="container mt-5 pt-5 mb-3">
                <div className="row">
                  <div className="col-md">
                  <img
                  className = "eventInfoImage"
                    src={this.state.img_url
                    } alt="No image" />
                  </div>
                  <div className="col-md">
                    <div className="eventInfo">
                      <div className="eventTitle">
                        <h1>{this.state.event.name}</h1>
                      </div>
                      <div className="eventOrganiser">
                        <p>By: {this.state.event.organizer }</p>
                      </div>
                      <div className="eventDescription">
                        <p>Start Time: {(new Date(this.state.event.startTime)).toLocaleString('en-GB')}</p>
                        <p>End Time: {(new Date(this.state.event.endTime)).toLocaleString('en-GB')}</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente magni 
                          officia dolor doloremque aperiam optio, est officiis amet, fugit placeat harum ea 
                          reprehenderit mollitia sit deleniti ad debitis consequuntur adipisci!</p>
                      </div>
                      <div className="eventFindMore">
                        <a href="#">Find More</a>
                      </div>

                      <button className="btn btn-primary">Book This Event</button>
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

}

export default eventInfoComponent;