import React from 'react';
import { Link } from 'react-router-dom';
import '../../all.css';
import firebase, { auth, provider } from '../../firebase.js';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount(){
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
      }
    });
  }

  logout(){
    auth.signOut().then(()=>{this.setState({user:null})})
  };

  login(){
    auth.signInWithPopup(provider).then((result)=>{
      const user = result.user;
      this.setState({
        user
      })
    });
  };

  render() {
    return (
      <header id="header">
				<div className="logo">
					<Link to="/">Bear-Schedules</Link>
				</div>
        {this.state.user ? <p> Hi, {this.state.user.displayName || this.state.user.email} </p> : ''}
				<nav className="top-links">
					<ul>
            {this.state.user ? <li><Link to="/newschedule">Upload Schedule</Link></li> : ''}
            {this.state.user ?
              <div><li><a><em><span onClick={this.logout.bind(this)}>Log Out</span></em></a></li></div>
              :
              <li><a><em><span onClick={this.login.bind(this)}>Log In</span></em></a></li>}
					</ul>
				</nav>
			</header>
    );
  }
}

export default Header;
