import React, { Component } from 'react';
import { Card } from 'react-bootstrap'

const myStyles = {
  fontFamily: 'Montserrat'
}

export default class Review extends Component {
  render() {
    const { review } = this.props.review
    const { user } = this.props.review.user
    console.log(this.props.review.review, "review")
    console.log(this.props.review.user, "user")

    return (
      <div className="reviewContainer">
        <Card>
            <Card.Body>
              <Card.Title style={myStyles} className="wine_review_title">Review Title</Card.Title>
                <Card.Text style={myStyles} className="review_text">
                    {review.content}
                </Card.Text>
              <Card.Subtitle style={myStyles} className="mb-2 text-muted">{this.props.review.user.name}</Card.Subtitle>
              {/* <Card.Link href="#">+ </Card.Link>
              <Card.Link href="#">-</Card.Link> */}
            </Card.Body>
          </Card>
          <br/>
      </div>
    )
  }
}