import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setCart, getCart } from '../../actions/wines'
import { Container, Row, Col, Image, Button, Table, Form } from 'react-bootstrap'
import Review from '../Review/Review.js'
import './SelectedWine.css'

const myStyles = {
  fontFamily: 'Montserrat'
}


class SelectedWine extends Component {

  state = {
    reviews:[],
    reviewContent: "",
    cart: []
  }


  componentDidMount() {
    
    this.props.getCart()

   return fetch('http://localhost:3000/api/v1/reviews').then(res => res.json())
   .then(data => 
    this.setState({
     reviews:this.getSelectedWinesReviews(data.reviews)
   }))
  }

  getSelectedWinesReviews = (reviews) => {
    return reviews.filter(review => review.review.wine_id === this.props.wine.id )
  }

  handleChange =(e) => {
    this.setState({
      reviewContent:e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    e.persist()
    
    let data = {content:this.state.reviewContent, wine_id:this.props.wine.id, user_id:this.props.current_user.user_details.id }
    fetch('http://localhost:3000/api/v1/reviews/new', 
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json',Accept: 'application/json',Authorization: ""},
      body: JSON.stringify(data)
    }).then(res => res.json()).then(data => {
      // debugger
      this.setState({
        reviews: [...this.state.reviews, data]
      })
      // console.log(data)
      if(data.error) {
        alert(`${data.error}`)
        this.setState({
          reviewContent: ""
        })
      }
    })
  }

  onCartClick = () => {
    this.props.setCart(this.props.wine)
  }


  render() {

    const { wine, current_user } = this.props
    
    
    return (
      <div style={myStyles} className="outer">
        
       <Container fluid="md">
        <Row className="row1">
          {/* artwork on the left */}
          <Col><Image alt="wine" fluid className="ui large image" src={`${wine.img_url}`}></Image></Col>
          {/* info on right */}
          <Col className="left_col">
            <h2 style={myStyles} className="wine_title">{wine.title}  {wine.varietal},</h2>
              <h3 style={myStyles} className="wine_year">{wine.year}</h3>
              <br/>
              <h4 style={myStyles} className="wine_price">$ {wine.price}.00 USD</h4>
              <br/>
                <p style={myStyles} className="wine_description">{wine.description}</p>
                <br/>
                <p style={myStyles} className="wine_score">WE | {wine.score}</p>
                <br/>
                  <div style={myStyles} className="btn_div">
                    { this.props.cart.includes(this.props.wine) ?
                    <Button disabled style={{ pointerEvents: 'none' }} className="add_to_cart_btn" variant="dark" size="lg" active>Add to Cart</Button>
                    :
                    <Button onClick={this.onCartClick} className="add_to_cart_btn" variant="dark" size="lg" active>Add to Cart</Button>
                    } 
                  </div>
                <br/> 
                <Table style={myStyles} striped hover>
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
            {
            this.state.reviews.map(review => <Review key={review.review.id} review={review}/>)}   
          </Row>
       </Container>
          <br/>
          {/* reviews */}
          {current_user.user_details &&
        <Form onSubmit={this.handleSubmit}>
          <Form.Group style={myStyles} className="reviewTextArea" controlId="reviewTextArea">
              <Form.Label>Write a Review!</Form.Label>
              <Form.Control onChange={this.handleChange} value={this.state.reviewContent} name="review" as="textarea" rows="5" />
          </Form.Group>
          <br/>
            <Button type="submit" variant="dark">Enter Review</Button>
        </Form>
        
          }
      </div>
    )
  }
}

//state in redux
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectedWine)