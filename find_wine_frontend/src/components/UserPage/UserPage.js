import React, { Component } from 'react';

export default class UserPage extends Component {


 

  render() {
    const { user_details } = this.props.current_user
    return (
      <div>
        {user_details &&
        user_details.name
        }
        
      </div>
    )
  }
}