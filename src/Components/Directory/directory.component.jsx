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
      this.setState({events: res.data});
    });
    console.log(this.state.events);
  }
  render() {
    return (
      <div className='directory-menu'>
        {this.state.events.map(({ id, ...otherSectionProps }) => (
          <Card key={id} {...otherSectionProps} />
        ))}
      </div>
    );
  }
}

export default Directory;
