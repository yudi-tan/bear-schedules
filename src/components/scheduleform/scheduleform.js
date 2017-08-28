import React from 'react';
import firebase, { auth, provider } from '../../firebase.js';
import Firebase from 'firebase';

class ScheduleForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user: null,
      semester: 'Freshman Fall',
      school: '',
      major: '',
      class1:'',
      class2:'',
      class3:'',
      class4:'',
      class5:'',
      class6:'',
    }
  }

  componentDidMount(){
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
      }
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    const semestersRef = firebase.database().ref('semesters');
    const usersRef = firebase.database().ref('users');
    const email = this.state.user.email;
    const major = this.state.major;
    const school = this.state.school;
    usersRef.orderByChild('user').equalTo(email).once('value').then(function(snapshot) {
      var notExists = (snapshot.val() == null);
      if(notExists){
        usersRef.push({user:email, major, school});
      }
    });

    const semester = {
      user: this.state.user.email,
      term: this.state.semester,
      class1: this.state.class1,
      class2: this.state.class2,
      class3: this.state.class3,
      class4: this.state.class4,
      class5: this.state.class5,
      class6: this.state.class6
    };
    semestersRef.push(semester);
    this.setState({
      semester: 'Freshman Fall',
      major: '',
      school: '',
      class1:'',
      class2:'',
      class3:'',
      class4:'',
      class5:'',
      class6:'',
    });
    document.getElementById('finalmessage').innerHTML = "Semester Added!"
  };

  render(){
    return (
      <div className="section">
        <p><strong>Please fill in your major and school on your very first submission</strong></p>
        <p>On subsequent submissions, please leave major and school blank.</p>
        <p>Please fill in your schedules in order (i.e. Fall Freshman --> Freshman Spring etc).</p>
        <p>You don't have to fill up every single "class" field.</p>
        <p>For UC Berkeley students, please use "UCB" as School name. Go Bears!</p>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Major: </label>
          <input type="text" name="major" onChange={this.handleChange.bind(this)} value={this.state.major} placeholder="Your Major"/>
          <br/><br/>
          <label>School: </label>
          <input type="text" name="school" onChange={this.handleChange.bind(this)} value={this.state.school} placeholder="Your School"/>
          <br/><br/>
          Semester:
          <br/>
          <select value={this.state.semester} onChange={this.handleChange.bind(this)} name="semester">
            <option value="Freshman Fall">Freshman Fall</option>
            <option value="Freshman Spring">Freshman Spring</option>
            <option value="Freshman Summer">Freshman Summer</option>
            <option value="Sophomore Fall">Sophomore Fall</option>
            <option value="Sophomore Spring">Sophomore Spring</option>
            <option value="Sophomore Summer">Sophomore Summer</option>
            <option value="Junior Fall">Junior Fall</option>
            <option value="Junior Spring">Junior Spring</option>
            <option value="Junior Summer">Junior Summer</option>
            <option value="Senior Fall">Senior Fall</option>
            <option value="Senior Spring">Senior Spring</option>
            <option value="Senior Summer">Senior Summer</option>
            <option value="Additional Sem.">Additional Semester</option>
            <option value="Additional Sem.">Additional Semester</option>
            <option value="Additional Sem.">Additional Semester</option>
          </select>
          <br/><br/>
            <label>Class 1) </label>
            <input type="text" name="class1" onChange={this.handleChange.bind(this)} value={this.state.class1} placeholder="Class #1"/>
            <br/>
            <label>Class 2) </label>
            <input type="text" name="class2" onChange={this.handleChange.bind(this)} value={this.state.class2} placeholder="Class #2"/>
            <br/>
            <label>Class 3) </label>
            <input type="text" name="class3" onChange={this.handleChange.bind(this)} value={this.state.class3} placeholder="Class #3"/>
            <br/>
            <label>Class 4) </label>
            <input type="text" name="class4" onChange={this.handleChange.bind(this)} value={this.state.class4} placeholder="Class #4"/>
            <br/>
            <label>Class 5) </label>
            <input type="text" name="class5" onChange={this.handleChange.bind(this)} value={this.state.class5} placeholder="Class #5"/>
            <br/>
            <label>Class 6) </label>
            <input type="text" name="class6" onChange={this.handleChange.bind(this)} value={this.state.class6} placeholder="Class #6"/>
            <br/><br/>
          <button>Submit</button>
        </form>
        <p id="finalmessage"></p>
      </div>
    )
  }
}

export default ScheduleForm;
