import React, { Component } from 'react';
import './index.css';
import { Route, Router, browserHistory } from 'react-router';
import Header from './components/header';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Post from './components/Post'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Man's Best Friend</h2>
          <Router history={browserHistory}>
            <Route path='/' component={Header}>
                <Route component={() => (<div><Home/><Post/></div>)} path="home" />
                <Route component={() => (<div><Login/><Register/></div>)} path="login" />
            </Route>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
