import React, { Component } from 'react';
import { Nav, NavDropdown, Form, FormControl, Navbar, Container } from 'react-bootstrap'
import './TopBar.css';
import { setSearchWine } from '../../actions/wines'
import { connect } from 'react-redux'

const myStyles = {
  fontFamily: 'Montserrat'
}

class TopBar extends Component {

  state = {
    input: ""
  }


  handleChange = (e) => {
    e.persist()
    let inputValue = e.target.value
    this.setState({
      input:inputValue
    }, () => this.props.setSearchWine(this.state.input)
   )
  }


  checkCurrentUser = () => {
   if (this.props.current_user.user_details) {
     return  (
       <>
       <Nav.Link className="profile" href="/users/1">HEY, {this.props.current_user.user_details.name.toUpperCase()}</Nav.Link>
       <Nav.Link className="logoutclick" onClick={this.props.handleLogout} href="/wines">LOGOUT</Nav.Link>
       <Nav.Link className="cart" href="#link">CART</Nav.Link>
       </>
     )

   }
      else {
      return <Nav.Link className="profile" href="/login">LOG IN</Nav.Link>
      }
  }

  render() {
   
    
    return (
      <Navbar style={myStyles} bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">    
          <Nav >
            <NavDropdown title="VARIETAL" id="basic-nav-dropdown">
              <NavDropdown.Item href="/wines/Cabernet Sauvignon">Cabernet Sauvignon</NavDropdown.Item>
              <NavDropdown.Item href="/wines/Zinfandel">Zinfandel</NavDropdown.Item>
              <NavDropdown.Item href="/wines/Merlot">Merlot</NavDropdown.Item>
              <NavDropdown.Item href="/wines/Chardonnay">Chardonnay</NavDropdown.Item>
              <NavDropdown.Item href="/wines/Sauvignon Blanc">Sauvignon Blanc</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/wines/other">Other</NavDropdown.Item>
            </NavDropdown>
            <Container></Container>
            <NavDropdown title="COUNTRY" id="basic-nav-dropdown">
              <NavDropdown.Item href="/wines/country/France">France</NavDropdown.Item>
              <NavDropdown.Item href="/wines/country/Italy">Italy</NavDropdown.Item>
              <NavDropdown.Item href="/wines/country/USA">USA</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/wines/country/other">Other</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
              <Navbar.Brand className="title" href="/wines">F I N D | W I N E</Navbar.Brand>
          </Nav>
          <Nav>
            <Form inline>
              <FormControl name="searchInput" onChange={this.handleChange} value={this.state.input} type="text" placeholder="Search" className="mr-sm-2" />
            </Form>
            {this.checkCurrentUser()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}


  const mapStateToProps = (state) => {
    return {
      searchInput:state.searchInput
    }
  }
  
  // give ability to update store with action
  const mapDispatchToProps = (dispatch) => {
    return {
      setSearchWine: (input) => {
        return dispatch(setSearchWine(input))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)