import React from 'react'
import EventService from '../../Services/EventService';
import './eventInfo.styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css';


class eventInfoComponent extends React.Component {
    constructor() {
        super();
    
        this.state = {
          event: {}
        };
      }
      componentDidMount(){
        // console.log(this.props.match.params.eventId);
        EventService.getEventById(this.props.match.params.eventId).then((res) =>{
          this.setState({event: res.data.data[0]});
        console.log(this.state.event);
        });
        // console.log(this.state.event);
      }


    render(){
        return(   
            <div>
              <h1>{this.props.match.params.eventId}</h1>
              {/* <h1>{this.state.event.eventName}</h1> */}
              <div className="container">
                <div className="row">
                  <div className="col-md">
                  <img
                  className = "eventInfoImage"
                    src={this.state.event.image_url
                    } alt="No image" />
                  </div>
                  <div className="col-md">
                    <div className="eventInfo">
                      <div className="eventTitle">
                        <h1>{this.state.event.eventName}</h1>
                      </div>
                      <div className="eventOrganiser">
                        <p>By: Event Organiser</p>
                      </div>
                      <div className="eventDescription">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis omnis ut veniam impedit! 
                          Architecto inventore dolorum animi fuga aliquam explicabo aliquid natus,
                          in amet, illo aspernatur modi quibusdam quo voluptates!</p>
                      </div>
                      <div className="eventFindMore">
                        <a href="#">Find More</a>
                      </div>

                      <button className="btn btn-primary">Book This Event</button>
                      </div>
                    
                  </div>
                  <div className="col-md">
                    One of three columns
                  </div>
                </div>
              </div>
            
            </div>
        )
    }

}

export default eventInfoComponent;