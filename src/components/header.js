import React,{Component} from 'react'
import { Link } from 'react-router'



class Header extends Component {
	render () {
		return ( <div>
			<nav className="navigate">
	          <div className="Nav__container">
	            <div className="Nav__right">
	              <ul className="topnav">
	                <li className="Nav__item">
	                  <Link className="homePage" to="/">Home</Link>
	                </li>
	                <li className="Nav__item">
	                  <Link className="registerLogin" to="/login">Register/Login</Link>
	                </li>
	                <li className="Nav__item">
	                  <Link className="lostFound" to="/lostandfound">Lost & Found</Link>
	                </li>
	                <li className="Nav__item">
	                  <Link className="myAccount" to="/myaccount">My Account</Link>
	                </li>
	                <li className="Nav__item">
	                  <Link className="about" to="/about">About</Link>
	                </li>
	              </ul>
	            </div>
	          </div>
	        </nav>
	        {this.props.children}

	        Copyright Romeo 2017
	        </div>
		)
	}	
}

export default Header