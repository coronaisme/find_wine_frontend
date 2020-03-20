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

         <h1><Badge>{user_details.name}</Badge></h1>
          <Table striped hover>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>{user_details.name}</td>
                    </tr>
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
                      <td>Volume</td>
                      <td>750 ml</td>
                    </tr>
                  </tbody>
                </Table>
          </Col>
        </Row>
        <Row>
          <Col>users orders</Col>
          <Col>users reviews</Col>
        </Row>
      </Container>
        }
        
      </div>
    )
  }
}