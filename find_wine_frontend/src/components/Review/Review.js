import React, { Component } from 'react';
import { Card } from 'react-bootstrap'

const myStyles = {
  fontFamily: 'Montserrat'
}

export default class Review extends Component {
  render() {
    return (
      <div className="reviewContainer">
        <Card>
            <Card.Body>
              <Card.Title style={myStyles} className="wine_review_title">Review Title</Card.Title>
                <Card.Text style={myStyles} className="review_text">
                  As the second argument passed in to connect, mapDispatchToProps is used for dispatching actions to the store.
                  dispatch is a function of the Redux store. You call store.dispatch to dispatch an action. This is the only way to trigger a state change.
                  With React Redux, your components never access the store directly - connect does it for you. React Redux gives you two ways to let components dispatch actions:
                  By default, a connected component receives props.dispatch and can dispatch actions itself.
                  connect can accept an argument called mapDispatchToProps, which lets you create functions that dispatch when called, and pass those functions as props to your component.
                  The mapDispatchToProps functions are normally referred to as mapDispatch for short, but the actual variable name used can be whatever you want.
                </Card.Text>
              <Card.Subtitle style={myStyles} className="mb-2 text-muted">Reviewer Name</Card.Subtitle>
              {/* <Card.Link href="#">+ </Card.Link>
              <Card.Link href="#">-</Card.Link> */}
            </Card.Body>
          </Card>
      </div>
    )
  }
}