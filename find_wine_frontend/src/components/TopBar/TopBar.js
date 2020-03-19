import React, { Component } from 'react';
import { Nav, NavDropdown, Form, Button, FormControl, Navbar } from 'react-bootstrap'
import './TopBar.css';


export default class TopBar extends Component {



  

  render() {
    console.log(this.props.current_user, "in top bar")
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Varietal" id="basic-nav-dropdown">
              <NavDropdown.Item href="/wines/Cabernet Sauvignon">Cabernet Sauvignon</NavDropdown.Item>
              <NavDropdown.Item href="/wines/Zinfandel">Zinfandel</NavDropdown.Item>
              <NavDropdown.Item href="/wines/Merlot">Merlot</NavDropdown.Item>
              <NavDropdown.Item href="/wines/Chardonnay">Chardonnay</NavDropdown.Item>
              <NavDropdown.Item href="/wines/Sauvignon Blanc">Sauvignon Blanc</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/wines/other">Other</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Country" id="basic-nav-dropdown">
              <NavDropdown.Item href="/wines/country/France">France</NavDropdown.Item>
              <NavDropdown.Item href="/wines/country/Italy">Italy</NavDropdown.Item>
              <NavDropdown.Item href="/wines/country/USA">USA</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/wines/country/other">Other</NavDropdown.Item>
            </NavDropdown>
          </Nav>
            <Nav className="title" >
            <Navbar.Brand href="/wines">Find Wine</Navbar.Brand>
            </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-dark">Search</Button>
          </Form>
           {/* if logged in go to user profile, else send to login */}
            <Nav.Link className="profile" href="/login">Profile</Nav.Link>

            <Nav.Link className="cart" href="#link">Cart</Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}