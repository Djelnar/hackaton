import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './Routes';
import { hot } from 'react-hot-loader';
import { Provider } from 'rebass';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider>
          <Routes />
        </Provider>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App)
