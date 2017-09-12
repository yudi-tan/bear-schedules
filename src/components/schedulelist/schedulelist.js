import React from 'react';
import Schedule from './schedule';
import firebase from '../../firebase.js';

class ScheduleList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      schedules: []
    }
  }

  componentWillMount(){
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
  }


  render() {
    const allSchedules = this.state.schedules.map((p) => <Schedule key={p.id} user={p.user} major={p.major} school={p.school} />);
    return (
      <div>
        <main id="main">
          {allSchedules}
        </main>
      </div>
    );
  }
};

export default ScheduleList
