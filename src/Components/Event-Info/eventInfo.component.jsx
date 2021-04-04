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
          this.setState({event: res.data});
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
                <div class="row">
                  <div class="col-md">
                  <img
                  className = "eventInfoImage"
                    src={this.state.event.imageUrl
                    } alt="No image" />
                  </div>
                  <div class="col-md">
                    <div className="eventTitle">
                      <h1>{this.state.event.eventName}</h1>
                    </div>
                    
                  </div>
                  <div class="col-md">
                    One of three columns
                  </div>
                </div>
              </div>
            
            </div>
        )
    }

}

export default eventInfoComponent;