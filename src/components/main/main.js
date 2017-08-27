import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ScheduleList from '../schedulelist/schedulelist';
import ScheduleForm from '../scheduleform/scheduleform';
import Schedule from '../schedulelist/schedule';
import OwnSchedule from '../schedulelist/ownschedule';


class Main extends React.Component {

  render(){
    return (
      <Switch>
        <Route exact path='/' component={ScheduleList}/>
        <Route exact path='/createschedule' component={ScheduleForm}/>
        <Route exact path='/myschedule' component={OwnSchedule}/>
      </Switch>
    )
  }
}

export default Main;
