import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setAllWines, setCurrentWineId } from '../../actions/wines'
import { Card, Header, Segment } from 'semantic-ui-react'


class LandingPage extends Component {

  componentDidMount() {
    this.props.setWines()
  }

  handleSelectedWine = (wine_id) => {
    this.props.setCurrentWineId(wine_id)
  }

  render() {
    
    return (
      <div className="HomePage">
        <br/>
        <Header as='h2' color='blue' textAlign='center'>Hello {this.props.current_user.username}</Header>   
        <br/>
        <div className="segment" >
        <Segment  circular onClick={this.handleClick} style={{cursor:"pointer"}} >
        <i className="icon large hand point up"  style={{cursor:"pointer"}}/> <br/>{(this.state.myprofile) ? "All Restaurants" : "My Profile"}
        </Segment>
        </div>
        <br/>
        {
        this.state.myprofile ?
        <UserInfo current_user={this.props.current_user}/>
        :
        <Card.Group centered itemsPerRow={4}>

        {this.state.restaurant ? <SingleRestaurant current_user={this.props.current_user} restaurant={this.state.restaurant} onBackButtonClick={this.onBackButtonClick}/>
          :
        this.state.allRestaurants.map(r => <RestaurantInfo key={r.restaurant_id} restaurant={r} onRestaurantClick={this.onRestaurantClick}  />)}
        </Card.Group>
        }
      </div>
    )
  }
}

//gives access to store
const mapStateToProps = (state) => {
  return {
    wines:state.wines
  }
}

//give ability to update store with action
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentWineId: (wine_id) => {
      dispatch(setCurrentWineId(wine_id))
    },
    setWines: () => {
      dispatch(setAllWines())
    }
  }
}

//Provider gives access to sate when using connect with components
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)