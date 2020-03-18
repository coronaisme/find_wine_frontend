import React, { Component } from 'react';
import { Container, Row, Col, Image, Button, Table, Card } from 'react-bootstrap'

import './SelectedWine.css'

export default class SelectedWine extends Component {
  render() {
    const { wine } = this.props
    console.log(this.props.wine)
    return (
      <div className="outer">
       <Container fluid="md">
        <Row className="row1">
          {/* artwork on the left */}
          <Col><Image alt="wine" fluid className="ui large image" src={`${wine.img_url}`}></Image></Col>
          {/* info on right */}
          <Col className="left_col">
            <h2 className="wine_title">{wine.title}  {wine.varietal},</h2>
              <h3 className="wine_year">{wine.year}</h3>
              <br/>
              <h4 className="wine_price">$ {wine.price}.00 USD</h4>
              <br/>
                <p className="wine_description">{wine.description}</p>
                <br/>
                <p className="wine_score">WE | {wine.score}</p>
                <br/>
                <div className="btn_div"><Button className="add_to_cart_btn" variant="dark" size="lg" active>Add to Cart</Button></div>
                <br/> 
                <Table striped hover>
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
          <Card>
            <Card.Body>
              <Card.Title className="wine_review_title">Review Title</Card.Title>
                <Card.Text className="review_text">
                  As the second argument passed in to connect, mapDispatchToProps is used for dispatching actions to the store.
                  dispatch is a function of the Redux store. You call store.dispatch to dispatch an action. This is the only way to trigger a state change.
                  With React Redux, your components never access the store directly - connect does it for you. React Redux gives you two ways to let components dispatch actions:
                  By default, a connected component receives props.dispatch and can dispatch actions itself.
                  connect can accept an argument called mapDispatchToProps, which lets you create functions that dispatch when called, and pass those functions as props to your component.
                  The mapDispatchToProps functions are normally referred to as mapDispatch for short, but the actual variable name used can be whatever you want.
                </Card.Text>
              <Card.Subtitle className="mb-2 text-muted">Reviewer Name</Card.Subtitle>
              <Card.Link href="#">+ </Card.Link>
              <Card.Link href="#">-</Card.Link>
            </Card.Body>
          </Card>
        </Row>
      </Container>
      </div>
    )
  }
}