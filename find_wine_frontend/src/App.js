import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage.js'
// import SelectedWine from './components/SelectedWine/SelectedWine.js'
import { Switch, Route } from 'react-router-dom';
import TopBar from './components/TopBar/TopBar.js';
import Login from './components/Login/Login.js'
import UserPage from './components/UserPage/UserPage.js'
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
      })
    }
  }

 
  handleLogin = user => {
    const currentUser = { currentUser: user }
    localStorage.setItem('token', user.token)
    this.setState({ auth: currentUser });
    window.location.reload()
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ auth: { currentUser: {} } });
  };



  render(){
    console.log(this.state, "state in app")
    return (
      <div className="App">
        <TopBar current_user={this.state.auth.currentUser} />
        <Switch>
          <Route exact path="/wines" render={routerProps => {
            return (<LandingPage  {...routerProps} />)}}></Route>
          <Route exact path="/login" render={routerProps => {
            return (<Login handleLogin={this.handleLogin} {...routerProps} />)}}></Route>
          <Route path ='/users' render={routerProps => {
            return (<UserPage current_user={this.state.auth.currentUser} handleLogout={this.handleLogout} {...routerProps} />)}}></Route>



          <Route path="/" render={routerProps => {
          return (<LandingPage {...routerProps} />)}}></Route>
        </Switch>
      </div>
    );
  }

}
