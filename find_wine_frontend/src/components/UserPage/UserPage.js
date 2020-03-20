import React, { Component } from 'react';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap'

export default class UserPage extends Component {


 

  render() {
    const { user_details } = this.props.current_user
    return (
      <div>
        {user_details &&
        <Container>
        <Row>
          <Col><Card><img alt="avatar" src={user_details.avatar_url}></img></Card></Col>
          <Col>

         <h1><Badge>{user_details.name}</Badge></h1><br/>
          <Table striped hover>
                  <tbody>
        
                    <tr>
                      <td>Age</td>
                      <td>{user_details.age}</td>
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
                      <td>{user_details.created_at}</td>
                    </tr>
                  </tbody>
                </Table>
          </Col>
        </Row>
        <Row>
        <Col>
        {user_details.name}'s Orders: 
        <br/>
        {this.props.current_user.orders.map(order => <ul key={order.id}>{order.created_at}: {order.status}, shipped to: {order.shipped_to}</ul>)}</Col>
        <Col>{this.props.current_user.reviews.map(review => <ul key={review.id}>{review.created_at}: {review.content}</ul>)}</Col>
        </Row>
      </Container>
        }
        
      </div>
    )
  }
}