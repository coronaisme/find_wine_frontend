import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setCart,
  getCart,
  setAllWines,
  setCurrentWine,
} from "../../actions/wines";
import { Container, Row, Col, Table, Badge, Card } from "react-bootstrap";
import "./UserPage.css";

const myStyles = {
  fontFamily: "Montserrat",
};

class UserPage extends Component {
  componentDidMount() {
    this.props.getCart();
    this.props.setAllWines();
  }

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

  handleReviewClick = (e) => {
    e.persist();
    let wine = this.props.wines.find(
      (wine) => wine.id === parseInt(e.target.dataset.id)
    );
    this.props.setCurrentWine(wine);
    this.props.history.push(`/wines/${e.target.dataset.id}`);
  };

  render() {
    const { user_details } = this.props.current_user;
    console.log(user_details, "user_details");

    return (
      <div>
        {user_details && (
          <Container>
            <Row>
              <Col>
                <img
                  className="image"
                  alt="avatar"
                  src={user_details.avatar_url}
                ></img>
              </Col>
              <Col>
                <h1 style={myStyles}>
                  <Badge>{user_details.name.toUpperCase()}</Badge>
                </h1>
                <br />
                <Table style={myStyles} striped>
                  <tbody>
                    <tr>
                      <td>Age</td>
                      <td>{this.getAge(user_details.dateofbirth)}</td>
                    </tr>
                    <tr>
                      <td>City</td>
                      <td>{user_details.city}</td>
                    </tr>
                    <tr>
                      <td>State</td>
                      <td>{user_details.state}</td>
                    </tr>
                    <tr>
                      <td>Shipping Address</td>
                      <td>
                        {user_details.address}, {user_details.zipcode}
                      </td>
                    </tr>
                    <tr>
                      <td>Joined at</td>
                      <td>
                        {user_details.created_at.toString().split("T")[0]}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col style={myStyles}>
                {user_details.name.toUpperCase()} PAST ORDERS
                <br />
                <br />
                {user_details.orders.map((order) => (
                  <ul className="order-blocks" key={order.order.id}>
                    {console.log(order, "order")}
                    {order.order.created_at.split("T")[0]} : <br />
                    <br />
                    {order.wines.map((wine) => {
                      return (
                        <li key={wine.id} className="wine-list-ele">
                          {wine.title} : ${wine.price}.00
                        </li>
                      );
                    })}
                    <br />
                    shipped to : {order.order.shipped_to}
                    <br />
                    total: ${order.order.total}.00{" "}
                  </ul>
                ))}
              </Col>

              <Col style={myStyles}>
                {" "}
                {user_details.name.toUpperCase()} PAST REVIEWS <br />
                {this.props.current_user.reviews.map((review) => (
                  <ul name={review.wine_id} key={review.id}>
                    <Card.Text
                      data-id={review.wine_id}
                      onClick={this.handleReviewClick}
                      key={review.id}
                      className="review-card"
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      {review.created_at.toString().split("T")[0]} :{" "}
                      {review.content}
                    </Card.Text>
                  </ul>
                ))}
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

//state in redux
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
    setAllWines: () => {
      return dispatch(setAllWines());
    },
    setCurrentWine: (wine) => {
      return dispatch(setCurrentWine(wine));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
