import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import './SelectedWine.css'

export default class SelectedWine extends Component {
  render() {
    const { wine } = this.props
    console.log(this.props.wine)
    return (
      <div className="outer">
       <Container fluid="md">
        <Row className="row1">
          <Col><img alt="wine" className="ui large image" src={`${wine.img_url}`}></img></Col>
          <Col>2 of 2</Col>
        </Row>
      </Container>
      </div>
    )
  }
}