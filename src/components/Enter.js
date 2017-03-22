import React, {Component} from 'react';
import Login from './Login';
import Register from './Register';


export default class Enter extends Component {
    constructor (){
        super()
        this.state ={
            login: true
        }
    }

    render(){
        return (
            <div className="col-md-4">
                <div className="col-md-4">
                    <div className="col-md-4">
                        <div className="board_">
                            <div className="container_">
                                <span onClick={()=>this.setState({login: true})}><strong className="logger">Login</strong></span>
                                <span onClick={()=>this.setState({login: false})}><strong className="reggy">Register</strong></span>
                            </div>
                        </div>
                        { this.state.login ? <Login/> : <Register/>}
                        </div>
                </div>
             </div>
        )

        }
    }