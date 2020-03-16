import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setAllWines, setCurrentWineId } from '../../actions/wines'
import { Card, Header} from 'semantic-ui-react'
import RenderWine from '../RenderWine/RenderWine';


class LandingPage extends Component {

  componentDidMount() {
    this.props.setWines()
  }

  onWineClick = (wine) => {
    this.props.setCurrentWineId(wine.id)
  }

  render() {
    const { wines } = this.props.wines
    return (
      <div className="LandingPage">
        <br/>
        <Header as='h2' color='blue' textAlign='center'>Hello </Header>   
        <br/>
        {/* <div className="segment" >
        <Segment  circular style={{cursor:"pointer"}} >
        <i className="icon large hand point up"  style={{cursor:"pointer"}}/> <br/>{(this.state.myprofile) ? "All Restaurants" : "My Profile"}
        </Segment>
        </div> */}
        <br/>
        <Card.Group centered itemsPerRow={4}>
            {wines.map(wine => <RenderWine key={wine.id} wine={wine} onWineClick={this.onWineClick} />)}
        </Card.Group> 
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