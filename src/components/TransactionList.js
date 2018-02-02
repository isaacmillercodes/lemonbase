import React from 'react';
import '../styles/App.css';

export default ({ transactions }) => (
  <div className="row">
    {transactions.map(transaction => {
      return (
        <div key={transaction.id} className="card horizontal col s12 m6 l3">
          <div className="card-stacked">
            <div className="card-content">
              <p>Payment sent to <span className="purple-text">{transaction.address}</span></p>
              <p>Time Sent: {transaction.time}</p>
              <p><span className="blue-text darken-3">BTC: {transaction.satoshiValue}</span> | <span className="green-text darken-3">USD: ${transaction.usdValue}</span></p>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);
