import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setAllWines, setCurrentWine, setSearchWine } from '../../actions/wines'
import { Card } from 'semantic-ui-react'
import RenderWine from '../RenderWine/RenderWine';
import SelectedWine from '../SelectedWine/SelectedWine';


class LandingPage extends Component {

  componentDidMount() {
    this.props.setAllWines()
  }

  onWineClick = (wine) => {
    this.props.setCurrentWine(wine)
    this.props.history.push(`/wines/${wine.id}`)
  }

  render() {
    const { wines, currentWine } = this.props
    const varietal = this.props.location.pathname.split("/")[2]
    const country = this.props.location.pathname.split("/")[3]
   

    const filteredWinesByVarietal = wines.filter(wine => wine.varietal === varietal)
    const filteredVarietalByOther = wines.filter(wine => wine.varietal !== "Zinfandel" && wine.varietal !== "Cabernet Sauvignon" && wine.varietal !== "Merlot" && wine.varietal !== "Chardonnay" && wine.varietal !== "Sauvignon Blanc")
    const filteredWinesByCountry = wines.filter(wine => wine.country === country)
    const filteredCountryByOther = wines.filter(wine => wine.country !== "France" && wine.country !== "Italy" && wine.country !== "USA")
  
 
    return (
      <div className="LandingPage">
        <br/>
        <br/>
        <br/>
          { currentWine ? <SelectedWine wine={currentWine} /> 
              :
        <Card.Group centered itemsPerRow={4}>
            {
            country === "other" ?
            filteredCountryByOther.map(wine => <RenderWine key={wine.id} wine={wine} onWineClick={this.onWineClick} />)
            :
            country ?
            filteredWinesByCountry.map(wine => <RenderWine key={wine.id} wine={wine} onWineClick={this.onWineClick} />)
            :
            varietal === "Zinfandel" || varietal === "Cabernet Sauvignon" || varietal === "Merlot" || varietal === "Chardonnay" || varietal === "Sauvignon Blanc" ? 
            filteredWinesByVarietal.map(wine => <RenderWine key={wine.id} wine={wine} onWineClick={this.onWineClick} />)
            :
            varietal === "other" ? 
            filteredVarietalByOther.map(wine => <RenderWine key={wine.id} wine={wine} onWineClick={this.onWineClick} />)
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
    currentWine:state.currentWine,
    searchInput:state.searchInput
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
    },
    setSearchWine: (input) => {
      return dispatch(setSearchWine(input))
    }
  }
}

//Provider gives access to sate when using connect with components
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)