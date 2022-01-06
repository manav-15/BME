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
      this.setState({events: res.data.events});
      console.log(res.data.events)
    });
    // console.log(this.state.events);
  }
  
  
  render() {
    return (
      <div className='directory-menu'>
        {this.state.events.map(({ id, name, imageUrl }) => (
          <Card key={id} eventName={name} imageUrl={imageUrl} eventId={id}  />
        ))}
      </div>
    );
  }
}

export default Directory;
