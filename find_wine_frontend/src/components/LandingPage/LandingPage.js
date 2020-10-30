import React, { Component } from "react";
import { connect } from "react-redux";
import { setAllWines, setCurrentWine, getCart } from "../../actions/wines";
import { Card } from "semantic-ui-react";
import RenderWine from "../RenderWine/RenderWine";
import SelectedWine from "../SelectedWine/SelectedWine";
import { Row } from "react-bootstrap";
import "./LandingPage.css";

class LandingPage extends Component {
  componentDidMount() {
    this.props.setAllWines();
    this.props.getCart();
    //from here

    if (localStorage.token) {
      setTimeout(() => {
        localStorage.clear();
        this.setState({ auth: { currentUser: {} } });
        window.location.reload();
      }, 10800000);
    }
    //to here is a test for clearing local storage after a set time (idk how this will work if the user is not technically on the page...)
  }

  onWineClick = (wine) => {
    this.props.setCurrentWine(wine);
    this.props.history.push(`/wines/${wine.id}`);
  };

  filterWinesBySearch = (wines) => {
    return wines.filter(
      (wine) =>
        wine.title
          .toLowerCase()
          .includes(this.props.searchInput.toLowerCase()) ||
        wine.varietal
          .toLowerCase()
          .startsWith(this.props.searchInput.toLowerCase()) ||
        wine.region.toLowerCase().includes(this.props.searchInput.toLowerCase())
    );
  };

  showingWines = () => {
    const { wines, currentWine, current_user } = this.props;
    const varietal = this.props.location.pathname.split("/")[2];
    const country = this.props.location.pathname.split("/")[3];

    const filteredWinesByVarietal = wines.filter(
      (wine) => wine.varietal === varietal
    );
    const filteredVarietalByOther = wines.filter(
      (wine) =>
        wine.varietal !== "Zinfandel" &&
        wine.varietal !== "Cabernet Sauvignon" &&
        wine.varietal !== "Merlot" &&
        wine.varietal !== "Chardonnay" &&
        wine.varietal !== "Sauvignon Blanc"
    );
    const filteredWinesByCountry = wines.filter(
      (wine) => wine.country === country
    );
    const filteredCountryByOther = wines.filter(
      (wine) =>
        wine.country !== "France" &&
        wine.country !== "Italy" &&
        wine.country !== "USA"
    );

    return currentWine ? (
      <SelectedWine current_user={current_user} wine={currentWine} />
    ) : (
      <Card.Group centered itemsPerRow={4}>
        {country === "other"
          ? filteredCountryByOther.map((wine) => (
              <RenderWine
                key={wine.id}
                wine={wine}
                onWineClick={this.onWineClick}
              />
            ))
          : country
          ? filteredWinesByCountry.map((wine) => (
              <RenderWine
                key={wine.id}
                wine={wine}
                onWineClick={this.onWineClick}
              />
            ))
          : varietal === "Zinfandel" ||
            varietal === "Cabernet Sauvignon" ||
            varietal === "Merlot" ||
            varietal === "Chardonnay" ||
            varietal === "Sauvignon Blanc"
          ? filteredWinesByVarietal.map((wine) => (
              <RenderWine
                key={wine.id}
                wine={wine}
                onWineClick={this.onWineClick}
              />
            ))
          : varietal === "other"
          ? filteredVarietalByOther.map((wine) => (
              <RenderWine
                key={wine.id}
                wine={wine}
                onWineClick={this.onWineClick}
              />
            ))
          : this.filterWinesBySearch(wines).map((wine) => (
              <RenderWine
                key={wine.id}
                wine={wine}
                onWineClick={this.onWineClick}
              />
            ))}
      </Card.Group>
    );
  };

  render() {
    return (
      <div className="LandingPage">
        <Row>
          {" "}
          <img
            className="header-image"
            src="https://preachthestory.com/wp-content/uploads/2018/03/vineyard.jpg"
          ></img>
        </Row>
        <br />
        {this.showingWines()}
      </div>
    );
  }
}

//gives access to store
const mapStateToProps = (state) => {
  return {
    wines: state.wines,
    currentWine: state.currentWine,
    searchInput: state.searchInput,
    cart: state.cart,
  };
};

// give ability to update store with action
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentWine: (wine) => {
      return dispatch(setCurrentWine(wine));
    },
    setAllWines: () => {
      return dispatch(setAllWines());
    },
    getCart: () => {
      return dispatch(getCart());
    },
  };
};

//Provider gives access to sate when using connect with components
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
