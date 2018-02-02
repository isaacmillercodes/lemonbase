import React, { Component } from 'react';
import '../styles/App.css';

class TransactionCard extends Component {

  render() {
    return (
      <div className="card horizontal col s12 m6 l3">
        <div className="card-stacked">
          <div className="card-content">
            <p>Payment from 1C9U4ivTJm3EDGYhtQTRDHcAf6HLQ4hwLJ</p>
            <p>Time: 11:10am</p>
            <p>Value: .00002341 | USD: $5.75</p>
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionCard;
