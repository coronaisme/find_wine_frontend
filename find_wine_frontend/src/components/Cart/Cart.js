import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setCart, getCart } from '../../actions/wines'
import './Cart.css';
import { Container, Col, Row } from 'react-bootstrap'

const myStyles = {
  fontFamily: 'Montserrat'
}

class Cart extends Component {

  componentDidMount() {
    this.props.getCart()
  }


  render() {
    console.log(window.location, "location?")
    return (
      <>
      <Container></Container>
      <Container style={myStyles}></Container>
      <Container className="cart-title" style={myStyles}>CART</Container>
       <Container>
          <Row>
            <Col>1 of 3</Col>
          </Row>
          <Row>
            <Col>1 of 3</Col>
          </Row>
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    wines:state.wines,
    currentWine:state.currentWine,
    searchInput:state.searchInput,
    cart:state.cart
  }
}

// give ability to update store with action
const mapDispatchToProps = (dispatch) => {
  return {
    setCart: (wine) => {
      return dispatch(setCart(wine))
    }, 
    getCart: () => {
      return dispatch(getCart())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)