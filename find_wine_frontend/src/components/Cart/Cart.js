import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setCart, getCart, addToQuantity } from '../../actions/wines'
import './Cart.css';
import { Container, Row, Table, Image, Button } from 'react-bootstrap'

const myStyles = {
  fontFamily: 'Montserrat'
}


class Cart extends Component {
  
  // state = {
  //   subtotal:0,
  // }


  componentDidMount() {
    this.props.getCart()
  }

  
  makeCart = () => {
    const { cart } = this.props
    let count = 1;
    
    
    return cart.map(wine => 
      <tbody key={wine.id}>
        <tr>
          <td>{<Image alt="wine_img" className="wine_thumb" src={`${wine.img_url}`}></Image>}</td>
          <td>{wine.title}, <br/> {wine.varietal}</td>
          <td name="price">$ {wine.price}.00</td>
          <td className="quantity-shit"><i style={{cursor:'pointer'}} onClick={() => this.handleMinusClick(wine)} className="minus small icon hover"></i> {wine.quantity} <i style={{cursor:'pointer'}} onClick={() => this.handlePlusClick(wine)} className="plus small icon hover"></i></td>
          <td> $ {wine.quantity * wine.price}.00</td>
        </tr>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </tbody>
      )
    }

    handleMinusClick = (wine) => {
      --wine.quantity
      this.props.addToQuantity(wine)
    }
    
    handlePlusClick = (wine) => {
      // console.log(wine)
      ++wine.quantity
      this.props.addToQuantity(wine)
    }

    handleSubtotal = () => {
      let arr = this.props.cart.map(wine => wine.quantity * wine.price)
      let newArr = arr.reduce((a,b) => a + b, 0)
      return newArr
    }


  render() {
    // console.log(this.props, "in cart")
    const { cart } = this.props
    console.log(this.props.cart)


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
                  <th></th>
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
                <td></td>
                <td>SUBTOTAL | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $ {this.props.cart && this.handleSubtotal()}.00 <br/><br/><br/>

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
    }, 
    addToQuantity: (wine) => {
      return dispatch(addToQuantity(wine))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)