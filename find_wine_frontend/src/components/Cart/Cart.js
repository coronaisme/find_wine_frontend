import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setCart,
  getCart,
  addToQuantity,
  setAllWines,
} from "../../actions/wines";
import "./Cart.css";
import { Container, Row, Table, Image } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";

const myStyles = {
  fontFamily: "Montserrat",
};

class Cart extends Component {
  componentDidMount() {
    this.props.getCart();
    console.log(this.props.current_user.user_details, "in cart mount");
  }

  makeCart = () => {
    const { cart } = this.props;

    return cart.map((wine) => (
      <tbody key={wine.id}>
        <tr>
          <td>
            {
              <Image
                alt="wine_img"
                className="wine_thumb"
                src={`${wine.second_img_url}`}
              ></Image>
            }
          </td>
          <td>
            {wine.title}, <br /> {wine.varietal}
          </td>
          <td name="price">$ {wine.price}.00</td>
          <td className="quantity-shit">
            <i
              style={{ cursor: "pointer" }}
              onClick={() => this.handleMinusClick(wine)}
              className="minus small icon hover"
            ></i>{" "}
            {wine.quantity}{" "}
            <i
              style={{ cursor: "pointer" }}
              onClick={() => this.handlePlusClick(wine)}
              className="plus small icon hover"
            ></i>
          </td>
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
    ));
  };

  handleMinusClick = (wine) => {
    --wine.quantity;
    this.props.addToQuantity(wine);
  };

  handlePlusClick = (wine) => {
    ++wine.quantity;
    this.props.addToQuantity(wine);
  };

  handleSubtotal = () => {
    let arr = this.props.cart.map((wine) => wine.quantity * wine.price);
    let newArr = arr.reduce((a, b) => a + b, 0);
    return newArr;
  };

  handleSubmit = () => {
    let body = {
      status: "Completed, Delivered on-time",
      user_id: this.props.current_user.user_details.id,
      shipped_to: this.props.current_user.user_details.address,
      total: this.handleSubtotal(),
      wine_ids: this.props.cart.map((wine) => wine.id),
    };
    console.log(body);
    fetch("http://localhost:3000/api/v1/new_order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "",
      },
      body: JSON.stringify(body),
    })
      .then((res) => (res.status === 200 ? res.json() : console.log("error")))
      .then((data) => console.log(data, "posted"));
    localStorage.removeItem("testCart");
    this.props.history.push("/");
  };

  handleToken = () => {
    return Math.random();
  };

  getAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  render() {
    console.log(this.props, "in cart");
    const { cart } = this.props;

    return (
      <>
        <Container></Container>
        <Container style={myStyles}></Container>
        <Container className="cart-title" style={myStyles}>
          CART
        </Container>
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
              {cart && this.makeCart()}
            </Table>
          </Row>
          <Row>
            {
              //check for empty cart
              this.props.cart.length < 1 ? (
                <h2 style={myStyles}>Your cart is empty</h2>
              ) : (
                <Table>
                  <tbody>
                    <tr className="bottomtable" style={myStyles}>
                      <td className="adult-sig">
                        ADULT SIGNATURE IS REQUIRED Upon delivery. <br />
                        The recipient must be over the age of 21 and <br />
                        they will be inquired to present appropriate <br />
                        identification as proof.
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>

                      {
                        //check for user age

                        this.props.current_user.user_details ? (
                          <td>
                            SUBTOTAL |
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${" "}
                            {this.props.cart && this.handleSubtotal()}.00 <br />
                            <br />
                            <br />
                            <StripeCheckout
                              color="black"
                              stripeKey="pk_test_4TbuO6qAW2XPuce1Q6ywrGP200NrDZ2233"
                              token={this.handleToken}
                              amount={this.handleSubtotal() * 100}
                              closed={this.handleSubmit}
                              name="Total Items"
                              billingAddress
                              shippingAddress
                            />
                          </td>
                        ) : (
                          <td>Must be logged in to Checkout!</td>
                        )
                        //end of check for user
                      }
                    </tr>
                  </tbody>
                </Table>
              )
              //end check of empty cart
            }
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wines: state.wines,
    currentWine: state.currentWine,
    searchInput: state.searchInput,
    cart: state.cart,
  };
};

// give ability to update store with action
const mapDispatchToProps = (dispatch) => {
  return {
    setCart: (wine) => {
      return dispatch(setCart(wine));
    },
    getCart: () => {
      return dispatch(getCart());
    },
    addToQuantity: (wine) => {
      return dispatch(addToQuantity(wine));
    },
    setAllWines: () => {
      return dispatch(setAllWines());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
