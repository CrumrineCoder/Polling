import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import routes from './routes';
import Header from './common/components/Header'
import Footer from './common/components/Footer'


class App extends Component {
  // Provider is for redux store
  // connectedrouter is for history & router
  // header is always on top of hte page
  // routes is whatever routes.js brings back
  // footer is always on the bottom of the page
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <Header />
            <div className="wrap">
              {routes}
            </div>
            <Footer />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
