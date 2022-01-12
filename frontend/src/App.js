import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Directory from './Components/Directory/directory.component'
import createEventForm from './Components/createEventForm/createEventForm.component';
import Header from './Components/Header/Header.component'
import EventInfoComponent from './Components/Event-Info/eventInfo.component';
import Profile from './Components/profile/profile.component';

function App() {
  return (
    <div >
    <Header/>
    <Router>
    <div>
      <Switch>
      <Route path="/" exact component={Directory}></Route>
      <Route path="/add-event" exact component={createEventForm}></Route>
      <Route path="/profile" exact component={Profile}></Route>
      <Route path="/event-info/:eventId" exact component={EventInfoComponent}></Route>
      </Switch>
    </div>
    </Router>
    
    </div>
  );
}

export default App;