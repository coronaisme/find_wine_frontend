import React, { Component } from "react";
import "./Login.css";
import api from "../../api/api.js";
import { Button, Form, Grid, Header, Message } from "semantic-ui-react";

const myStyles = {
  fontFamily: "Montserrat",
};

export default class Login extends Component {
  state = {
    error: false,
    fields: {
      username: "",
      password: "",
    },
  };

  handleChange = (e) => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({
      fields: newFields,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    api.auth
    .login(this.state.fields.username, this.state.fields.password)
    .then((res) => {
      if (res.error) {
        this.setState(
          {
            error: true,
          },
          () => window.location.reload()
          );
        } else {
          
          this.props.history.push("/wines");
          this.props.handleLogin(res);
        }
      });
  };

  handleSignUp = (e) => {
    e.preventDefault();
    this.props.history.push("/signup");
  };

  render() {
    const { fields } = this.state;

    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh", myStyles }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450, myStyles }}>
          {this.state.error ? (
            <Header
              className="invalid-header"
              style={myStyles}
              as="h2"
              color="black"
              textAlign="center"
            >
              Invalid Login
            </Header>
          ) : (
            <Header
              className="login-header"
              style={myStyles}
              as="h2"
              color="black"
              textAlign="center"
            >
              Log-In
            </Header>
          )}
          <Form size="large" onSubmit={this.handleSubmit}>
            <Form.Input
              style={myStyles}
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              name="username"
              value={fields.username}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              name="password"
              type="password"
              placeholder="Password"
              value={fields.password}
              onChange={this.handleChange}
            />

            <Button color="black" fluid size="large" style={myStyles}>
              Login
            </Button>
          </Form>
          <Message
            onClick={this.handleSignUp}
            fluid="true"
            style={{ cursor: "pointer", myStyles }}
          >
            Sign Up
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
