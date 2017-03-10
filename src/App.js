import React, { Component } from 'react';
import './css/index.css';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import Header from './components/header';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Submission from './components/Submission';
//import ImageUpload from './components/ImageSubmission';
import RecentSubmission from './components/RecentSubmission';
import LostFound from './components/LostFound';
import Archived from './components/Archived';



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Man's Best Friend</h2>
          <Router history={browserHistory}>
            <Route path='/' component={Header}>
<<<<<<< HEAD
=======
                <IndexRoute component={() => (<div><Home/></div>)} />
>>>>>>> 45842c0d2882e4ec1b665328408ed7df5cb4f680
                <IndexRoute component={Home} />

                <Route component={() => (<div><Login/><Register/></div>)} path="login" />
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
