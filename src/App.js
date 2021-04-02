import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Directory from './Components/Directory/directory.component'
import createEventForm from './Components/createEventForm/createEventForm.component';
import Header from './Components/Header/Header.component'


function App() {
  return (
    <div >
    <Header/>
    <Router>
    <div className="App">
      <Switch>
      <Route path="/" exact component={Directory}></Route>
      <Route path="/add-event" exact component={createEventForm}></Route>
      </Switch>
    </div>
    </Router>
    
    </div>
  );
}

export default App;