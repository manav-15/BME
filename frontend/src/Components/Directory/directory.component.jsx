import React from 'react';
import EventService from '../../Services/EventService';

import Card from '../card/card.component';

import './directory.styles.scss';

class Directory extends React.Component {
  constructor() {
    super();

    this.state = {
      events: []
    };
  }
  componentDidMount(){
    EventService.getEvents().then((res) =>{
      this.setState({events: res.data.data});
      console.log(this.state.events)
    });
    // console.log(this.state.events);
  }
  render() {
    return (
      <div className='directory-menu'>
        {this.state.events.map(({ event_id, event_name, image_url }) => (
          <Card key={event_id} eventName={ event_name} imageUrl={image_url} eventId={event_id}  />
        ))}
      </div>
    );
  }
}

export default Directory;
