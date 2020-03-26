import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setCart, getCart } from '../../actions/wines'
import './Cart.css';
import { Container, Col, Row, Table, Image, Button } from 'react-bootstrap'

const myStyles = {
  fontFamily: 'Montserrat'
}

class Cart extends Component {

  componentDidMount() {
    this.props.getCart()
  }

  makeCart = () => {
    const { cart } = this.props
    let total;
    let count = 1;
    return cart.map(wine => 
      <tbody key={wine.id}>
        <tr>
          <td>{<Image alt="wine_img" className="wine_thumb" src={`${wine.img_url}`}></Image>}</td>
          <td>$ {wine.price}.00</td>
          <td className="quantity-shit"><i style={{cursor:'pointer'}} className="minus small icon hover"></i> {count} <i style={{cursor:'pointer'}} className="plus small icon hover"></i></td>
          <td>{total}</td>
        </tr>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </tbody>
      )
  }


  render() {
    // console.log(this.props, "in cart")
    const { cart } = this.props
    let subtotal;


    return (
      <>
        <Container></Container>
        <Container style={myStyles}></Container>
        <Container className="cart-title" style={myStyles}>CART</Container>
        <Container>
          <Row>
            <Table style={myStyles}>
              <thead>
                <tr>
                  <th className="big-space"></th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              { cart && this.makeCart()}
            </Table>
          </Row>
          <Row>
            <Table>
              <tbody>
              <tr className="bottomtable" style={myStyles}>
                <td className="adult-sig">ADULT SIGNATURE IS REQUIRED Upon delivery. <br/>
                  The recipient must be over the age of 21 and <br/>
                  they will be inquired to present appropriate <br/>
                  identification as proof.</td>
                <td></td>
                <td></td>
                <td>SUBTOTAL {subtotal} <br/><br/><br/>

                <Button variant="dark" >Checkout</Button>

                </td>
              </tr>
              </tbody>
            </Table>
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