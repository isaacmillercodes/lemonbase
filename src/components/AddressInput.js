import React from 'react';
import '../styles/App.css';

export default ({ address, addAddress, updateText }) => (
  <div className="row">
    <div className="col s12 offset-m3 m6">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title yellow-text lighten-1">Welcome to Lemonbase</span>
          <p>Please enter the Bitcoin address you want to track below: </p>
        </div>
        <div className="card-action">
          <form onSubmit={addAddress}>
            <div className="input-field">
              <input id="address" type="text" value={address} minLength="26" maxLength="35" className="validate" onChange={updateText}/>
              <label htmlFor="address">Bitcoin Address</label>
            </div>
            <button type="button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);
