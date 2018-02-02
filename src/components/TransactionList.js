import React from 'react';
import '../styles/App.css';

export default ({ transactions }) => (
  <div className="row">
    {transactions.map(transaction => {
      return (
        <div key={transaction.id} className="card horizontal col s12 m6 l3">
          <div className="card-stacked">
            <div className="card-content">
              <p>Payment sent to {transaction.address}</p>
              <p>Time Sent: {transaction.time}</p>
              <p>BTC: {transaction.satoshiValue} | USD: ${transaction.usdValue}</p>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);
