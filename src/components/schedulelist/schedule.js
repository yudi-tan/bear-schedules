import React from 'react';
import '../../all.css';
import '../../slick.css';
import Slider from 'react-slick';
import firebase from '../../firebase.js';



class Schedule extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      semesters: [],
    }
  }

  componentDidMount(){
    const semestersRef = firebase.database().ref('semesters');
    semestersRef.orderByChild("user").equalTo(this.props.user).on('value', (snapshot) => {
      let semesters = snapshot.val();
      let newState = [];
      for (let semester in semesters) {
        newState.push({
          id: semester,
          term: semesters[semester].term,
          class1: semesters[semester].class1,
          class2: semesters[semester].class2,
          class3: semesters[semester].class3,
          class4: semesters[semester].class4,
          class5: semesters[semester].class5,
          class6: semesters[semester].class6,
        })
      };
      const semesterOrder = ["Freshman Fall", "Freshman Spring", "Freshman Summer",
                            "Sophomore Fall", "Sophomore Spring", "Sophomore Summer",
                            "Junior Fall", "Junior Spring", "Junior Summer",
                            "Senior Fall", "Senior Spring", "Senior Summer",
                            "Additional Sem. 1", "Additional Sem. 2", "Additional Sem. 3"];
      newState.sort((a, b) => semesterOrder.indexOf(a.term) - semesterOrder.indexOf(b.term));
      this.setState({
        semesters: newState
      });
    });
  }

  render() {
    var settings = {
      dots: true,
      infinite: false,
			slidesToShow: 3,
			slidesToScroll: 3,
			responsive: [
			    {
			      breakpoint: 650,
			      settings: {
			        slidesToShow: 1,
			        slidesToScroll: 1
			      }
			    },
          {
			      breakpoint: 992,
			      settings: {
			        slidesToShow: 2,
			        slidesToScroll: 2
			      }
			    },
			  ]
    };

    var semesterList = (this.state.semesters || []).map((s) => {
      return (
        <div className="slide" key={s.id}>
              <h1>{s.term}</h1>
              <h3>Semester classes</h3>

                {s.class1 !== '' ? s.class1 : ''}
                <br/>
                {s.class2 !== '' ? s.class2 : ''}
                <br/>
                {s.class3 !== '' ? s.class3 : ''}
                <br/>
                {s.class4 !== '' ? s.class4 : ''}
                <br/>
                {s.class5 !== '' ? s.class5 : ''}
                <br/>
                {s.class6 !== '' ? s.class6 : ''}
        </div>
      )
    });
    if (!this.state.semesters.length) {
      semesterList = <div></div>
    };

    return (
      <div className="section">
      <Slider {...settings}>
        <p><strong>School:</strong> <br/>{this.props.school}<br/><strong>Major:</strong><br/>{this.props.major}</p>
        {semesterList}
      </Slider>
    </div>
    );
  }
}

export default Schedule;
