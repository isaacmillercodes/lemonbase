import React, { Component } from 'react';
import '../styles/App.css';

class AddressInput extends Component {
  render() {
    return (
      <div className="row">
        <div className="col s12 offset-m3 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title yellow-text lighten-1">Welcome to Lemonbase</span>
              <p>Please enter the Bitcoin address you want to track below: </p>
            </div>
            <div className="card-action">
              <input placeholder="Enter a Bitcoin address" id="address" type="text" />
              <button type="submit">Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddressInput;
