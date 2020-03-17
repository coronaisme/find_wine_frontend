import React, { Component } from 'react';
import { Nav, NavDropdown, Form, Button, FormControl, Navbar } from 'react-bootstrap'
import './TopBar.css';


export default class TopBar extends Component {

  onClick = (e) => {
    e.dropdown()
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <NavDropdown title="Varietal" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Region" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
      <Nav className="title" >
      <Navbar.Brand href="/home">Find Wine</Navbar.Brand>
      </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
      {/* get icons */}
      <Nav.Link href="#home">Profile</Nav.Link>
      <Nav.Link href="#link">Cart</Nav.Link>
  </Navbar.Collapse>
</Navbar>
    )
  }
}