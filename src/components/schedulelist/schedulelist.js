import React from 'react';
import Schedule from './schedule';
import firebase from '../../firebase.js';
import TextField from 'material-ui/TextField';

class ScheduleList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      schedules: [],
      search: ''
    }
  }

  componentWillMount(){
    this.queryAll();
  }

  queryAll() {
    if (this.state.search === '') {
      const usersRef = firebase.database().ref('users');
      usersRef.on('value', (snapshot) => {
        let users = snapshot.val();
        let newState = [];
        for (let user in users) {
          newState.push({
            id: user,
            user: users[user].user,
            major: users[user].major,
            school: users[user].school
          })
        }
        this.setState({
          schedules: newState
        });
      });
    } else {
      let data = this.state.search;
      const usersRef = firebase.database().ref('users');
      usersRef.orderByChild('school').equalTo(data).on('value', (snapshot) => {
        let users = snapshot.val();
        let newState = [];
        for (let user in users) {
          newState.push({
            id: user,
            user: users[user].user,
            major: users[user].major,
            school: users[user].school
          })
        }
        this.setState({
          schedules: newState
        });
      });
      }
  };

  handleKeyPress = (value) => {
    if (value.key === 'Enter'){
      value.preventDefault();
      this.queryAll();
    }
  };


  render() {
    const allSchedules = this.state.schedules.map((p) => <Schedule key={p.id} user={p.user} major={p.major} school={p.school} />);
    return (
      <div>
        <main id="main">
          <TextField hintText="Search for a school."
          onKeyPress={this.handleKeyPress.bind(this)}
          value={this.state.search}
          onChange={(e) => this.setState({search: e.target.value}) }
          />
          {allSchedules}
        </main>
      </div>
    );
  }
};

export default ScheduleList
