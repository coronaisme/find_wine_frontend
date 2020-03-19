import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage.js'
// import SelectedWine from './components/SelectedWine/SelectedWine.js'
import { Switch, Route } from 'react-router-dom';
import TopBar from './components/TopBar/TopBar.js';
import Login from './components/Login/Login.js'
import api from './api/api.js'




export default class App extends Component {


  state = { 
    auth: {
      currentUser: {}
    }
  };

  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      api.auth.getCurrentUser().then(user => {
        const currentUser = { currentUser: user }

        this.setState({
          auth: currentUser
        })
      }, () => console.log(this.state.auth.currentUser, "in App.js"))
    }
  }



  render(){
    
    return (
      <div className="App">
        <TopBar current_user={this.state.auth.currentUser} />
        <Switch>
        {/* <Route path="/wines/1" render={routerProps => {
            return (<SelectedWine  {...routerProps} />)}}></Route> */}
          <Route exact path="/wines" render={routerProps => {
            return (<LandingPage  {...routerProps} />)}}></Route>
          <Route exact path="/login" render={routerProps => {
            return (<Login {...routerProps} />)}}></Route>




          <Route path="/" render={routerProps => {
          return (<LandingPage {...routerProps} />)}}></Route>
        </Switch>
      </div>
    );
  }

}
