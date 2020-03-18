import React, { Component } from 'react';


export default class RenderWine extends Component {

  render() {
    const { wine } = this.props
    return (
        <div className="ui centered card" style={{cursor:"pointer"}} key={wine.id} onClick={() => this.props.onWineClick(wine)}>
          <div className="wine image">
            <img src={`${wine.img_url}`} alt="wine img" height="300" width="275"/>
          </div>
          <div className="content">
             <div className="header">{ wine.title }</div>
             
             {wine.year}<br/>
             {wine.varietal}
          </div>
        </div>
    )
  }
}