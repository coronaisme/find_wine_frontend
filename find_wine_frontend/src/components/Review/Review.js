import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap'
import './Review.css'

const myStyles = {
  fontFamily: 'Montserrat'
}

export default class Review extends Component {
  render() {
    const { review } = this.props.review
    const { user } = this.props.review
  

    return (
      <div className="reviewContainer">
        <Row className="card-row">
        <Card className="review-card-container">
          <Col md={2} className="user-col">
          <Card.Body width="100" className="user-card">
            <Card.Img className="card-image" src={`${user.avatar_url}`} height="100" width="100"/>
            <Card.Title style={myStyles} className="wine_review_title">{user.name}</Card.Title>
          </Card.Body>
          </Col>
          <Col>
            <Card.Body className="review-card">
                <Card.Text style={myStyles} className="review_text">
                 {review.content}
                </Card.Text>
              <Card.Subtitle style={myStyles} className="mb-2 text-muted">- {review.created_at.toString().split("T")[0]}</Card.Subtitle>
              {/* <Card.Link href="#">+ </Card.Link>
              <Card.Link href="#">-</Card.Link> */}
            </Card.Body>
          </Col>
          </Card>
          </Row>
          <br/>
      </div>
    )
  }
}