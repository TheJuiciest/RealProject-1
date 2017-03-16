import React, {Component} from 'react';
import $ from 'jquery';
import Submission from './Submission';
import RecentSubmission from './RecentSubmission';
import GMap from './GMap';


const initialCenter = { lng: -113.9966, lat: 46.8787 }
class Home extends Component {

	constructor(props) {
		super(props)
		this.state = {
			submissions: []
		}
	}

	recentGrabPosts() {
		var me = this;
		$.ajax({
			method: 'GET',
			url: 'http://localhost:3002/api/submissions',
		})
		.done(function(submissions){
			me.setState({ submissions: submissions })
		})
	}
				//submissions.sort(function(a, b){
				//return b.Date-a.Date;
    componentWillMount() {
   	this.recentGrabPosts()
    }

	render() {

		if(!document.cookie) {
			$('.loginButton').show();
			$('.submitContainer').hide();
			$('.logoutButton').hide();
			$('.logoutContainer').show();
		} else if (document.cookie) {
			$('.logoutButton').show();
			$('.loginButton').hide();
			$('.submitContainer').show();
			$('.logoutContainer').hide();
		}


		$(".logoutButton").on('click', function(event){
  			event.preventDefault();
  			document.cookie = "";
  			window.location.replace("/");
  		})

		return (
			<div>				
					<button className="logoutButton" value="logout" href="/">Logout!</button>
					<div className="container">
							<div className="col-md-12">
								<GMap initialCenter={initialCenter} submissions={this.state.submissions} />
							</div>
							<div className="row">
								<div className="col-md-6">
									<h1>Recent Event Submissions</h1>
									<RecentSubmission submissions={this.state.submissions} />
								</div>
								<div className="col-md-6">
									<Submission reloadSubmissions={this.recentGrabPosts.bind(this)}/>
								</div>
							</div>	
					</div>
			</div>
	
		)
	}
}

export default Home