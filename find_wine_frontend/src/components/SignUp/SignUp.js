//sign up form -> goes to HomePage
import React, { Component } from 'react';
// import HomePage from '../HomePage/HomePage.js';
import {  Col, Form, Button } from "react-bootstrap";
// import { DatePicker } from 'react-bootstrap-date-picker'
import "./SignUp.css"

const myStyles = {
  fontFamily: 'Montserrat'
}


export default class SignUp extends Component {

  state = {
    error: false,
    fields: {
      username: "",
      password: ""
    }
  }

  
  handleChange = (e) => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value}
    this.setState({
      fields: newFields
    })
  }
  
  handleSubmit = (e) => {
      e.preventDefault()
      e.persist()
      
      var data = {name:e.target.name.value , avatar_url: e.target.avatar.value, email: e.target.email.value, address: e.target.address.value, city: e.target.city.value, state: e.target.state[1].value, zipcode: e.target.zipcode.value, dateofbirth: e.target.dob.value, password:e.target.password.value }
      fetch("http://localhost:3000/api/v1/new",
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json',Accept: 'application/json',Authorization: ""},
        body: JSON.stringify(data)
      })
      .then(resp => resp.json())
      .then(dataz => {
        if(dataz.token) {
          this.props.history.push('/wines')
          this.props.handleSignUp(dataz)
        } else {
          alert('No dice brother')
        }
      })
      // console.log(e.target)
     
    }

    // handleLoginClick = () => {
    //   this.props.history.push('/login')
    // }

    handleClick= (e) => {
      console.log(e.target.value)
    }
  

  render() {

    return (

      <Form className="signup-form" onSubmit={this.handleSubmit}> 
  <Form.Row>

  <Form.Group as={Col} controlId="formGridName">
      <Form.Label>Name</Form.Label>
      <Form.Control name="name" type="name" placeholder="Name" />
    </Form.Group>


    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control name="password" type="password" placeholder="Password" />
    </Form.Group>
  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control name="email" type="email" placeholder="Enter email" />
    </Form.Group>

  <Form.Group as={Col} controlId="formGridAddress">
    <Form.Label>Shipping Address</Form.Label>
    <Form.Control name="address" placeholder="1234 Main St" />
  </Form.Group>
  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="formAvatarImageUrl">
      <Form.Label>Avatar</Form.Label>
      <Form.Control name="avatar" type="avatar" placeholder="Image Url" />
    </Form.Group>
  </Form.Row>


  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control name="city" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>State</Form.Label>
      <Form.Control as="select" name="state" placeholder="Choose...">
        <option>Choose...</option>
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="DC">District Of Columbia</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
      </Form.Control>
    </Form.Group>

    <Form.Group type="date" as={Col} controlId="formGridDOB">
      <Form.Label>Date of Birth</Form.Label>
      <Form.Control name="dob" type="date"/>
    </Form.Group>

    <Form.Group type="text" pattern="[0-9]{5}" as={Col} controlId="formGridZip">
      <Form.Label type="text" pattern="[0-9]{5}" >Zip</Form.Label>
      <Form.Control name="zipcode" type="text" pattern="[0-9]{5}" />
    </Form.Group>
  </Form.Row>


  <Button variant="dark" type="submit">
    Submit
  </Button>
</Form>
      
    )
  }
}