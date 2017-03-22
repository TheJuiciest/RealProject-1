import React, { Component } from 'react';
import './css/index.css';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import Header from './components/header';
import Home from './components/Home';
import LostFound from './components/LostFound';
import Archived from './components/Archived';
import Enter from './components/Enter';



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="logoHeader">
            <h2>Man's Best Friend<img id='logoDog' src='http://localhost:3000/dogpen.png'/></h2>
          </div>
          <Router history={browserHistory}>
            <Route path='/' component={Header}>
                <IndexRoute component={Home} />
                <Route component={Enter} path="login" />
                <Route component={LostFound} path="lostandfound" />
                <Route component={Archived} path="archived" />
            </Route>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
