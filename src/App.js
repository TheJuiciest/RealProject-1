import React, { Component } from 'react';
import './index.css';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import Header from './components/header';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Submission from './components/Submission';
import ImageUpload from './components/ImageSubmission';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Man's Best Friend</h2>
          <Router history={browserHistory}>
            <Route path='/' component={Header}>
                <IndexRoute component={() => (<div><Home/><Submission/><ImageUpload/></div>)} path="home" />
                <Route component={() => (<div><Login/><Register/></div>)} path="login" />
            </Route>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
