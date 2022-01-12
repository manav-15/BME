import React from 'react';
import EventService from '../../Services/EventService';

import Card from '../card/card.component';

import './directory.styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

class Directory extends React.Component {
  constructor() {
    super();

    this.state = {
      events: []
    };
  }
  componentDidMount(){
    
    EventService.getEvents().then((res) =>{
      this.setState({events: res.data.events});
      console.log(res.data.events)
    });
    // console.log(this.state.events);
  }
  
  
  render() {
    return (
      <div className='container-fluid mt-5 pt-5 mb-3'>
        <div className="row row-cols-1 row-cols-md-4 g-0">
        {this.state.events.map(({ id, name, imageUrl, startTime, endTime, organizer }) => (
          <Card key={id} eventName={name} imageUrl={imageUrl} eventId={id} startTime={startTime} endTime={endTime} organizer={organizer} />
        ))}
        </div>
      </div>
    );
  }
}

export default Directory;
