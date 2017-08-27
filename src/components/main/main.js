import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ScheduleList from '../schedulelist/schedulelist';
import ScheduleForm from '../scheduleform/scheduleform';


class Main extends React.Component {
  render(){
    return (
      <Switch>
        <Route exact path='/' component={ScheduleList}/>
        <Route exact path='/newschedule' component={ScheduleForm}/>
      </Switch>
    )
  }
}

export default Main;
