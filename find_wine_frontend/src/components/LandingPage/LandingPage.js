import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setAllWines, setCurrentWine } from '../../actions/wines'
import { Card, Header} from 'semantic-ui-react'
import RenderWine from '../RenderWine/RenderWine';
import SelectedWine from '../SelectedWine/SelectedWine';


class LandingPage extends Component {

  componentDidMount() {
    this.props.setWines()
  }

  onWineClick = (wine) => {
    this.props.setCurrentWine(wine)
    console.log(this.props.wines.currentWine)
    
  }

  render() {
    const { wines } = this.props.wines
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
    wines:state.wines
  }
}

//give ability to update store with action
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentWine: (wine) => {
      dispatch(setCurrentWine(wine))
    },
    setWines: () => {
      dispatch(setAllWines())
    }
  }
}

//Provider gives access to sate when using connect with components
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)