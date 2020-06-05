import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage.js";
// import SelectedWine from './components/SelectedWine/SelectedWine.js'
import { Switch, Route } from "react-router-dom";
import TopBar from "./components/TopBar/TopBar.js";
import Login from "./components/Login/Login.js";
import UserPage from "./components/UserPage/UserPage.js";
import SignUp from "./components/SignUp/SignUp.js";
import Cart from "./components/Cart/Cart.js";
import api from "./api/api.js";
// import { handleTimeElapsed } from "./utilities/utils.js";

class App extends Component {
  state = {
    auth: {
      currentUser: {},
    },
  };

  componentDidMount() {
    const token = localStorage.getItem("token");

    if (token) {
      api.auth.getCurrentUser().then((user) => {
        const currentUser = { currentUser: user };

        this.setState({
          auth: currentUser,
        });
      });
    }
  }

  handleLogin = (user) => {
    const currentUser = { currentUser: user };
    localStorage.setItem("token", user.token);
    this.setState({ auth: currentUser });
    window.location.reload();
  };

  handleSignup = (user) => {
    const currentUser = { currentUser: user };
    localStorage.setItem("token", user.token);
    this.setState({ auth: currentUser });
    window.location.reload();
  };

  handleLogout = () => {
    //this was just remove token
    localStorage.clear();
    this.setState({ auth: { currentUser: {} } });
  };

  render() {
    return (
      <div className="App">
        <TopBar
          current_user={this.state.auth.currentUser}
          handleLogout={this.handleLogout}
        />
        <Switch>
          <Route
            exact
            path="/wines"
            render={(routerProps) => {
              return (
                <LandingPage
                  current_user={this.state.auth.currentUser}
                  {...routerProps}
                />
              );
            }}
          ></Route>

          <Route
            exact
            path="/login"
            render={(routerProps) => {
              return <Login handleLogin={this.handleLogin} {...routerProps} />;
            }}
          ></Route>

          <Route
            path="/signup"
            render={(routerProps) => {
              return (
                <SignUp {...routerProps} handleSignUp={this.handleSignup} />
              );
            }}
          ></Route>

          <Route
            path="/users"
            render={(routerProps) => {
              return (
                <UserPage
                  current_user={this.state.auth.currentUser}
                  {...routerProps}
                />
              );
            }}
          ></Route>

          <Route
            path="/cart"
            render={(routerProps) => {
              return (
                <Cart
                  current_user={this.state.auth.currentUser}
                  {...routerProps}
                />
              );
            }}
          ></Route>

          <Route
            path="/"
            render={(routerProps) => {
              return (
                <LandingPage
                  current_user={this.state.auth.currentUser}
                  {...routerProps}
                />
              );
            }}
          ></Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchInput: state.searchInput,
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(App);
