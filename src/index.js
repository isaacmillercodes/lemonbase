import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './styles/App.css';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// const networkInterface = createNetworkInterface({
//   uri: 'http://localhost:5000/graphql'
// })
//
// const client = new ApolloClient({
//   networkInterface
// })

ReactDOM.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
  , document.getElementById('root')
);
registerServiceWorker();
