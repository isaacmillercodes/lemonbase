import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div class="row">
        <div class="col s12 offset-m3 m6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title yellow-text lighten-1">Welcome to Lemonbase</span>
              <p>Please enter the Bitcoin address you want to track below: </p>
            </div>
            <div class="card-action">
              <input placeholder="Enter a Bitcoin address" id="address" type="text" />
              <button type="submit">Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
