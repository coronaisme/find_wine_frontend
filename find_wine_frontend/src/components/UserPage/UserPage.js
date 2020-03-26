import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setCart, getCart } from '../../actions/wines'
import { Container, Row, Col, Table, Badge, Card } from 'react-bootstrap'
import './UserPage.css'


const myStyles = {
  fontFamily: 'Montserrat'
}

class UserPage extends Component {

  componentDidMount() {
    this.props.getCart()
  }
  
  
  getAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString)
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
 

  //ask amelie or emiley about this ish
  handleReviewClick = (e) => {
    e.persist()
  return e.target.name ?
  console.log(e.target.name)
  : console.log('fucked')
   
  }

  render() {

    const { user_details } = this.props.current_user
  
    return (
      <div>
        {user_details &&
        <Container>
        <Row>
          <Col><img className="image" alt="avatar" src={user_details.avatar_url}></img></Col>
          <Col>
          
        <h1 style={myStyles} ><Badge>{user_details.name.toUpperCase()}</Badge></h1><br/>
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
                      <td>{user_details.address}, {user_details.zipcode}</td>
                    </tr>
                    <tr>
                      <td>Joined at</td>
                      <td>{user_details.created_at.toString().split("T")[0]}</td>
                    </tr>
                  </tbody>
                </Table>
          </Col>
        </Row>
        <Row>
        <Col style={myStyles} >
        {user_details.name.toUpperCase()} ORDERS 
        <br/>
        {this.props.current_user.orders.map(order => <ul key={order.id}>{order.created_at.toString().split("T")[0]} : {order.status}, shipped to : {order.shipped_to}</ul>)}</Col>

        <Col style={myStyles} > {user_details.name.toUpperCase()} PAST REVIEWS <br/>

            {this.props.current_user.reviews.map(review => <ul name={review.wine_id} key={review.id}><Card.Text name={review.wine_id} onClick={this.handleReviewClick} key={review.id} className="review-card" style={{cursor:'pointer'}}>  {review.created_at.toString().split("T")[0]} : {review.content}</Card.Text></ul>)}
       
        </Col>

        </Row>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)