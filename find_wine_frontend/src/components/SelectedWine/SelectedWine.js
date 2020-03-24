import React, { Component } from 'react';
import { Container, Row, Col, Image, Button, Table, Form } from 'react-bootstrap'
import Review from '../Review/Review.js'
import './SelectedWine.css'

const myStyles = {
  fontFamily: 'Montserrat'
}


export default class SelectedWine extends Component {


  
  

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
                <div style={myStyles} className="btn_div"><Button className="add_to_cart_btn" variant="dark" size="lg" active>Add to Cart</Button></div>
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
            {<Review />}
          </Row>
       </Container>
          <br/>
          {/* reviews */}
          <Form.Group style={myStyles} className="reviewTextArea" controlId="reviewTextArea">
              <Form.Label>Write a Review!</Form.Label>
              <Form.Control name="review" as="textarea" rows="5" />
          </Form.Group>
          <br/>
            <Button type="submit" variant="dark">Enter Review</Button>

      </div>
    )
  }
}