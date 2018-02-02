import React, { Component } from 'react';
import '../styles/App.css';
// import socket from '../socket';
import AddressInput from './AddressInput';
import TransactionList from './TransactionList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressText: '',
      transactions: []
    }
    this.addAddress = this.addAddress.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log("current props: ", this.props);
    console.log("next props: ", nextProps);
  }

  addAddress(e) {
    e.preventDefault();

    const address = this.state.addressText;
    const transactions = this.state.transactions;

    const socket = new WebSocket('wss://ws.blockchain.info/inv');

  	socket.onopen = function() {
  		const message = JSON.stringify({"op":"addr_sub", "addr": address})
  		socket.send(message);
  	};

  	socket.onmessage = function(onmsg) {

  		const getTransactionUSD = async (value, time) => {
  			const response = await fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`);
  			const data = await response.json();
  			const rate = data.bpi.USD.rate_float
  			const valueInUSD = (value * rate).toFixed(2);
  			return valueInUSD;
  		}

  		const response = JSON.parse(onmsg.data);

  		const payment = response.x.out.find(transaction => transaction.addr === address);

  		if (payment) {
  			const id = response.x.hash;
  			const unixTime = response.x.time;
  			const unixDateObj = new Date(unixTime * 1000);
  			const time = unixDateObj.toLocaleString();
  			const satoshiValue = payment.value / 100000000;
  			getTransactionUSD(satoshiValue, unixTime).then(usdValue => {
  				const transaction = { id, address: payment.addr, time, satoshiValue, usdValue}
  				transactions.unshift(transaction);
  			});
  		}

  	};
  }

  updateText(e) {
    this.setState({ addressText: e.target.value });
  }

  render() {
    return (
      <div>
        <AddressInput address={this.state.addressText} addAddress={this.addAddress} updateText={this.updateText}/>
        <TransactionList transactions={this.state.transactions}/>
      </div>
    );
  }
}

export default App;
