import React, {Component} from 'react';
import $ from 'jquery';
import Submission from './Submission';
import RecentSubmission from './RecentSubmission';
import GMap from './GMap';
import moment from 'moment';
import config from '../../config'

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
			url: config.apiServer + '/api/submissions?date=' + moment().subtract(14, 'days').format(),
		})
		
		.done(function(submissions){
			/*console.log('submissions')
			console.log(submissions)
			console.log('date')
			console.log(submissions.date) */
			me.setState({ submissions: submissions })
			/*submissions.date.sort(function(a, b){
				return b.date-a.date;
			}) */
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
			<div className='totalContainer'>				
					<div className="container">
							<div className="col-md-12">
								<GMap initialCenter={initialCenter} className= 'gmapBorder' submissions={this.state.submissions} />
							</div>
							<div className="row">
								<div className="col-md-6">
								<h1>Recent Event Submissions</h1>
									<div className="rsContainer">
										<RecentSubmission submissions={this.state.submissions} />
									</div>
								</div>
								<div className="col-md-4">
									<h1 id='subPost'>Submit a Post</h1>
									<Submission reloadSubmissions={this.recentGrabPosts.bind(this)}/>
								</div>
							</div>	
					</div>
			</div>
	
		)
	}
}

export default Home