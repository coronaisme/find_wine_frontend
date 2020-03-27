import React, { Component } from 'react';
import { Nav, NavDropdown, Form, FormControl, Navbar, Container } from 'react-bootstrap'
import './TopBar.css';
import { setSearchWine, setCurrentWine } from '../../actions/wines'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'



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
       {/* <Nav.Link className="cart" style={myStyles} href="/cart"><i className="shopping bag large icon"></i>{this.props.cart.length}</Nav.Link> */}
       </>
     )

   }
      else {
      return <Nav.Link className="profile" href="/login">LOG IN</Nav.Link>
      }
  }

  checkCart = () => {
   return window.location.pathname === '/cart' ?  null : <Link to={`/cart`} className="cart" style={myStyles}><i className="shopping bag large icon"></i>{this.props.cart.length}</Link> 
  }

  handleLinkClick = () => {
    this.props.setCurrentWine(null)
  }

  
  render() {
    

    return (
      <Navbar style={myStyles} bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">    
          <Nav >
            <NavDropdown className="title-drop" title="VARIETAL" id="basic-nav-dropdown">
            <Link className="first-drop" onClick={this.handleLinkClick} to={`/wines/Cabernet Sauvignon`}> Cabernet Sauvignon</Link>
            <Link className="first-drop" onClick={this.handleLinkClick} to={`/wines/Zinfandel`}> Zinfandel</Link>
            <Link className="first-drop" onClick={this.handleLinkClick} to={`/wines/Merlot`}> Merlot</Link>
            <Link className="first-drop" onClick={this.handleLinkClick} to={`/wines/Chardonnay`}> Chardonnay</Link>
            <Link className="first-drop" onClick={this.handleLinkClick} to={`/wines/Sauvignon Blanc`}> Sauvignon Blanc</Link>
              <NavDropdown.Divider />
              <Link className="first-drop" onClick={this.handleLinkClick} to={`/wines/other`}> Other</Link>     
            </NavDropdown>
            <Container></Container>
            <NavDropdown title="COUNTRY" id="basic-nav-dropdown">
            <Link className="first-drop" onClick={this.handleLinkClick} to={`/wines/country/France`}>France</Link>
            <Link className="first-drop" onClick={this.handleLinkClick} to={`/wines/country/Italy`}>Italy</Link>
            <Link className="first-drop" onClick={this.handleLinkClick} to={`/wines/country/USA`}>USA</Link>
              <NavDropdown.Divider />
              <Link className="first-drop" onClick={this.handleLinkClick} to={`/wines/country/other`}>Other</Link>
            </NavDropdown>
          </Nav>
          <Nav>
              {/* <Link style={myStyles} className="title" to={`/wines`}>F I N D | W I N E</Link> */}
              <Navbar.Brand className="title" href="/wines">F I N D | W I N E</Navbar.Brand>
          </Nav>
          <Nav>
            <Form inline>
              <FormControl name="searchInput" onChange={this.handleChange} value={this.state.input} type="text" placeholder="Search" className="mr-sm-2" />
            </Form>
            {this.checkCurrentUser()}
            {this.checkCart()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}


  const mapStateToProps = (state) => {
    return {
      searchInput:state.searchInput,
      cart:state.cart,
      wines:state.wines,
      currentWine:state.currentWine
    }
  }
  
  // give ability to update store with action
  const mapDispatchToProps = (dispatch) => {
    return {
      setSearchWine: (input) => {
        return dispatch(setSearchWine(input))
      },
      setCurrentWine: (wine) => {
        return dispatch(setCurrentWine(wine))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)