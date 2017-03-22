import React,{Component} from 'react'
import { Link } from 'react-router'
import $ from 'jquery';



class Header extends Component {
	render () {

		$(".logoutButton").on('click', function(event){
  			event.preventDefault();
  			document.cookie = "";
  			window.location.replace("/");
  		})


		return ( 
			<div>
			<nav className="navigate">
	          <div className="Nav__container">
	          <button className="logoutButton" value="logout" href="/">Logout!</button>
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
	                  <Link to="/archived">Archived</Link>
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