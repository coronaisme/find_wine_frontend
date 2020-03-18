import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setAllWines, setCurrentWine } from '../../actions/wines'
import { Card } from 'semantic-ui-react'
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
    const { wines, currentWine } = this.props
    const varietal = this.props.location.pathname.split("/")[2]
    const country = this.props.location.pathname.split("/")[3]
   

    const filteredWinesByVarietal = wines.filter(wine => wine.varietal === varietal)
    const filteredWinesByCountry = wines.filter(wine => wine.country === country)
    console.log(wines)
 
    return (
      <div className="LandingPage">
        <br/>
        <br/>
        <br/>
          { currentWine ? <SelectedWine  wine={currentWine} /> 
              :
        <Card.Group centered itemsPerRow={4}>
            {
            country ?
            filteredWinesByCountry.map(wine => <RenderWine key={wine.id} wine={wine} onWineClick={this.onWineClick} />)
            :
            varietal ? 
            filteredWinesByVarietal.map(wine => <RenderWine key={wine.id} wine={wine} onWineClick={this.onWineClick} />)
            :
            wines.map(wine => <RenderWine key={wine.id} wine={wine} onWineClick={this.onWineClick} />)
            }
        </Card.Group> 
        }
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