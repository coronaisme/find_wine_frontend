import React, { Component } from 'react';
import './Navbar.css';


export default class Navbar extends Component {
  render() {
    return (
      <div class="computer tablet only row">
            <div class="ui inverted menu navbar">
                <a href="" class="active item">Link</a>
                <a href="" class="item">Link</a>
                <a href="" class="item">Link</a>
                <a class="ui dropdown item">Varietals
                  <i class="dropdown icon"></i>
                  <div class="menu">
                    <div class="item">Action</div>
                    <div class="item">Another action</div>
                    <div class="item">Something else here</div>
                    <div class="ui divider"></div>
                    <div class="item">Seperated link</div>
                    <div class="item">One more seperated link</div>
                  </div>
                </a>
                <div class="mid-menu">
                <a href="" class="product-name">Find Wine</a>
                </div>
                <div class="right menu">
                    <a href="" class="active item">Default</a>
                    <a href="" class="item">Static top</a>
                </div>
            </div>
        </div>
    )
  }
}