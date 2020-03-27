import React, { Component } from 'react';
import { Card } from 'react-bootstrap'
import './RenderWine.css';

const myStyles = {
  fontFamily: 'Montserrat'
}

export default class RenderWine extends Component {

  render() {
    const { wine } = this.props
    return (
      <>
        <Card className="card" style={{ width: '18rem', cursor: 'pointer' }} key={wine.id} onClick={() => this.props.onWineClick(wine)}>
          <Card.Img variant="top" className="wine-bottle-img" src={`${wine.second_img_url}`} />
          <Card.Body>
            <Card.Title style={myStyles}>{wine.title}</Card.Title>
            <Card.Text style={myStyles}>
              {wine.year}<br/>
              {wine.varietal}
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    )
  }
}