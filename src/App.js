import React, { Component } from 'react';
import './index.css';
import { Link, Switch, Route, Router, browserHistory } from 'react-router';
import Header from './components/header';
import Login from './components/Login';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Man's Best Friend</h2>
          <Router history={browserHistory}>
            <Route path='/' component={Header}>
                <Route component={Home} path="home" />
                <Route component={Login} path="login" />
            </Route>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
