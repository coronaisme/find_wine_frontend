import React, { Component } from "react";
import { connect } from "react-redux";
import { setCart, getCart, setAllWines } from "../../actions/wines";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Table,
  Form,
} from "react-bootstrap";
import Review from "../Review/Review.js";
import "./SelectedWine.css";
// import { Redirect } from 'react-router-dom'

const myStyles = {
  fontFamily: "Montserrat",
};

class SelectedWine extends Component {
  state = {
    reviews: [],
    reviewContent: "",
    thumbnail: false,
    reviewed: false,
  };

  componentDidMount() {
    this.props.getCart();
    this.props.setAllWines();

    return fetch("http://localhost:3000/api/v1/reviews")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          reviews: this.getSelectedWinesReviews(data.reviews),
        })
      );
  }

  getSelectedWinesReviews = (reviews) => {
    return reviews.filter(
      (review) => review.review.wine_id === this.props.wine.id
    );
  };

  handleChange = (e) => {
    this.setState({
      reviewContent: e.target.value,
    });
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
  onReviewEnter = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        reviewed: !prevState.reviewed,
      };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    e.persist();

    let data = {
      content: this.state.reviewContent,
      wine_id: this.props.wine.id,
      user_id: this.props.current_user.user_details.id,
    };
    fetch("http://localhost:3000/api/v1/reviews/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        // debugger
        this.setState({
          reviews: [...this.state.reviews, data],
        });
        // console.log(data)
        if (data.error) {
          alert(`${data.error}`);
        } else {
          this.setState({
            reviewContent: "",
          });
        }
      });
  };

  onCartClick = () => {
    //atempted to check age, not working well
    // (this.getAge(this.props.current_user.user_details.dateofbirth) < 21) ? this.props.setCart(this.props.wine) : alert("Must be signed-in to add to cart!")
    localStorage.token
      ? this.props.setCart(this.props.wine)
      : alert("Must be signed-in to add to cart!");
  };

  checkWine = () => {
    return this.props.cart.some((wine) => wine.id === this.props.wine.id) ? (
      <Button
        disabled
        style={{ pointerEvents: "none" }}
        className="add_to_cart_btn"
        variant="dark"
        size="lg"
        active
      >
        Add to Cart
      </Button>
    ) : (
      <Button
        onClick={this.onCartClick}
        className="add_to_cart_btn"
        variant="dark"
        size="lg"
        active
      >
        Add to Cart
      </Button>
    );
  };

  thumbnailClick = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        thumbnail: !prevState.thumbnail,
      };
    });
  };

  render() {
    const { wine, current_user } = this.props;

    return (
      <div style={myStyles} className="outer">
        <Container fluid="md">
          <Row className="row1">
            {/* I want to click on thumb to change the main img to the thumbimg and back and forth */}

            {!this.state.thumbnail ? (
              <Col>
                {/* main img */}
                <Image
                  alt="label"
                  fluid
                  className="ui large image"
                  src={`${wine.img_url}`}
                ></Image>
                {/* thumb */}
                <Image
                  alt="bottle"
                  style={{ cursor: "pointer" }}
                  onClick={this.thumbnailClick}
                  className="thumbnail-img"
                  src={`${wine.second_img_url}`}
                  thumbnail
                />
              </Col>
            ) : (
              <Col>
                <Image
                  alt="bottle"
                  fluid
                  className="ui small image"
                  src={`${wine.second_img_url}`}
                ></Image>
                {/* thumb */}
                <Image
                  alt="label"
                  style={{ cursor: "pointer" }}
                  onClick={this.thumbnailClick}
                  className="thumbnail-img"
                  src={`${wine.img_url}`}
                  thumbnail
                />
              </Col>
            )}

            <Col className="left_col">
              <h2 style={myStyles} className="wine_title">
                {wine.title} {wine.varietal}
              </h2>
              <h3 style={myStyles} className="wine_year">
                {wine.year}
              </h3>
              <br />
              <h4 style={myStyles} className="wine_price">
                $ {wine.price}.00 USD
              </h4>
              <br />
              <p style={myStyles} className="wine_description">
                {wine.description}
              </p>
              <br />
              <p style={myStyles} className="wine_score">
                WE | {wine.score}
              </p>
              <br />
              <div style={myStyles} className="btn_div">
                {/* {console.log(this.props.current_user.user_details.dateofbirth, "selected wine")} */}
                {this.props.wine && this.checkWine()}
              </div>
              <br />
              <Table style={myStyles} striped>
                <tbody>
                  <tr>
                    <td>Brand</td>
                    <td>{wine.title}</td>
                  </tr>
                  <tr>
                    <td>Varietal</td>
                    <td>{wine.varietal}</td>
                  </tr>
                  <tr>
                    <td>Region</td>
                    <td>{wine.region}</td>
                  </tr>
                  <tr>
                    <td>Year</td>
                    <td>{wine.year}</td>
                  </tr>
                  <tr>
                    <td>Volume</td>
                    <td>750 ml</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row className="reviews_row">
            {this.state.reviews.map((review) => (
              <Review key={review.review.id} review={review} />
            ))}
          </Row>
        </Container>
        <br />
        {/* current_user.user_details && !this.props.current_user.reviews.some(rev => rev.wine_id === this.props.wine.id) */}

        {current_user.user_details &&
        !this.state.reviews.some(
          (rev) => rev.review.user_id === current_user.user_details.id
        ) ? (
          <Form onSubmit={this.handleSubmit}>
            <Form.Group
              style={myStyles}
              className="reviewTextArea"
              controlId="reviewTextArea"
            >
              <Form.Label>Write a Review!</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                value={this.state.reviewContent}
                name="review"
                as="textarea"
                rows="5"
              />
            </Form.Group>
            <br />

            <Button type="submit" onClick={this.onReviewEnter} variant="dark">
              Enter Review
            </Button>
          </Form>
        ) : null}
        {console.log(
          current_user.user_details &&
            !this.state.reviews.some(
              (rev) => rev.user_id === current_user.user_details.id
            ),
          "checking props"
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedWine);
