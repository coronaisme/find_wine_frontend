import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage.js'
import {Switch, Route, Redirect} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.js';



function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
      <Route path="/home" render={routerProps => {
        return (<LandingPage {...routerProps} />)}}></Route>
      </Switch>
    </div>
  );
}

export default App;
