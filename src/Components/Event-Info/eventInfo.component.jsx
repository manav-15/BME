import React from 'react'
import EventService from '../../Services/EventService';
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
            <div><h1>{this.props.match.params.eventId}</h1>
            <h1>{this.state.event.eventName}</h1>
            </div>
        )
    }

}

export default eventInfoComponent;