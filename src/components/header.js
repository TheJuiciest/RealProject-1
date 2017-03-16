import React,{Component} from 'react'
import { Link } from 'react-router'



class Header extends Component {
	render () {
		return ( 
			<div>
			<nav className="navigate">
	          <div className="Nav__container">
	            <div className="Nav__right">
	              <ul className="topnav">
	                <li className="Nav__item">
	                  <Link className="homePage" to="/">Home</Link>
	                </li>
	                <li className="Nav__item">
	                  <Link  to="/login">Register/Login</Link>
	                </li>
	                <li className="Nav__item">
	                  <Link to="/lostandfound">Lost & Found</Link>
	                </li>
	                <li className="Nav__item">
	                  <Link  to="/myaccount">My Account</Link>
	                </li>
	                <li className="Nav__item">
	                  <Link to="/archived">Archived</Link>
	                </li>
	                <li className="Nav__item">
	                  <Link to="/about">About</Link>
	                </li>
	              </ul>
	            </div>
	          </div>
	        </nav>
	        {this.props.children}

	        </div>
		)
	}	
}

export default Header