import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setAllWines, setCurrentWine } from '../../actions/wines'
import { Card, Header} from 'semantic-ui-react'
import RenderWine from '../RenderWine/RenderWine';
import SelectedWine from '../SelectedWine/SelectedWine';


class LandingPage extends Component {

  componentDidMount() {
    this.props.setAllWines()
  }

  onWineClick = (wine) => {
    this.props.setCurrentWine(wine)
 
  }



  render() {
    const { wines } = this.props
    console.log(this.props.currentWine, "in render")
    return (
      <div className="LandingPage">
        <br/>
        <Header as='h2' color='blue' textAlign='center'>Something here like seasonal wines? idk, picture? </Header>   
        <br/>
        <br/>
        <Card.Group centered itemsPerRow={4}>
            {
              
            wines.map(wine => <RenderWine key={wine.id} wine={wine} onWineClick={this.onWineClick} />)
            }

        </Card.Group> 
      </div>
    )
  }
}

//gives access to store
const mapStateToProps = (state) => {
  return {
    wines:state.wines,
    currentWine:state.currentWine
  }
}

// give ability to update store with action
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentWine: (wine) => {
      return dispatch(setCurrentWine(wine))
    },
    setAllWines: () => {
      return dispatch(setAllWines())
    }
  }
}

//Provider gives access to sate when using connect with components
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)