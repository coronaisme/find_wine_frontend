import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage.js'
import { Switch, Route } from 'react-router-dom';
import TopBar from './components/TopBar/TopBar.js';




function App() {
  return (
    <div className="App">
      <TopBar />
      <Switch>
        <Route path="/wines" render={routerProps => {
          return (<LandingPage  {...routerProps} />)}}></Route>

        <Route path="/" render={routerProps => {
        return (<LandingPage {...routerProps} />)}}></Route>


      </Switch>
    </div>
  );
}

export default App;
