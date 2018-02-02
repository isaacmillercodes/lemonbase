import React, { Component } from 'react';
import '../styles/App.css';
import AddressInput from './AddressInput';
import TransactionList from './TransactionList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressText: '',
      storedAddresses: [],
      transactions: []
    }
    this.addAddress = this.addAddress.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  componentDidMount() {
    const component = this;
    component.socket = new WebSocket('wss://ws.blockchain.info/inv');
  	component.socket.onmessage = function(onmsg) {
  		const getTransactionUSD = async (value, time) => {
  			const response = await fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`);
  			const data = await response.json();
  			const rate = data.bpi.USD.rate_float
  			const valueInUSD = (value * rate).toFixed(2);
  			return valueInUSD;
  		}

  		const response = JSON.parse(onmsg.data);
  		const payments = response.x.out.filter(output => {
        return component.state.storedAddresses.indexOf(output.addr) !== -1;
      });

  		if (payments.length) {
  			const id = response.x.hash;
  			const unixTime = response.x.time;
  			const unixDateObj = new Date(unixTime * 1000);
  			const time = unixDateObj.toLocaleString();

        //TODO: Add conditional to handle multiple stored addresses appearing as outputs in the same transaction
        const satoshiValue = payments[0].value / 100000000;
        getTransactionUSD(satoshiValue, unixTime).then(usdValue => {
          const transaction = { id, address: payments[0].addr, time, satoshiValue, usdValue}
          component.state.transactions.unshift(transaction);
          component.forceUpdate();
        });

  		}

  	};
  }

  addAddress(e) {
    e.preventDefault();
    if (!this.state.storedAddresses.includes(this.state.addressText)) {
      this.state.storedAddresses.push(this.state.addressText);
      this.forceUpdate();
    }
    const message = JSON.stringify({"op":"addr_sub", "addr": this.state.addressText})
    this.socket.send(message);
  }

  updateText(e) {
    this.setState({ addressText: e.target.value });
  }

  render() {
    return (
      <div>
        <AddressInput address={this.state.addressText} addAddress={this.addAddress} updateText={this.updateText}/>
        {this.state.storedAddresses.length &&
          <p>Currently Tracking:</p>
        }

        <div className="row">
          {this.state.storedAddresses.map(address => {
            return (
              <p key={address}>{address}</p>
            )
          })}
        </div>
        <TransactionList transactions={this.state.transactions}/>
      </div>
    );
  }
}

export default App;
