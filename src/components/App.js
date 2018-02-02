import React, { Component } from 'react';
import '../styles/App.css';
import socket from '../socket';
import AddressInput from './AddressInput';
import TransactionList from './TransactionList';

class App extends Component {

  state = {
    transactions: []
  }

  componentDidMount() {
    socket.subscribeToAddress('1J37CY8hcdUXQ1KfBhMCsUVafa8XjDsdCn');
  }

  render() {
    return (
      <div>
        <AddressInput address="" addAddress={console.log('hi')}/>
        <TransactionList />
      </div>
    );
  }
}


export default App;
