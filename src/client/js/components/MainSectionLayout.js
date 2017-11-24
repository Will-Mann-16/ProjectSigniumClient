import React from "react";
import {connect} from "react-redux";
import {Route, Switch, HashRouter} from "react-router-dom";

import MainPage from './MainPage';
import HousesListPage from './HousesListPage';
import StudentListPage from "./StudentListPage";
import StudentPage from './StudentPage';
import LocationListPage from "./LocationListPage";
import LocationPage from './LocationPage';
import SettingsPage from './SettingsPage';
import HistoryListPage from './HistoryListPage';
import HousePage from './HousePage';
import CalloverPage from "./CalloverPage"

import history from "../history";
import Navbar from "./Navbar";

class MainSectionLayout extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Navbar/>
          <Switch>
            <Route exact path="/" name="dashboard" component={({props}) => (<MainPage {...props}/>)}></Route>
            <Route exact path="/houses" name="houses" component={({props}) => (<HousesListPage {...props} />)}></Route>
            <Route exact path="/houses/new" name="newhouse" component={({props}) => (<HousePage {...props} />)}></Route>
            <Route exact path="/houses/:house" name="house" component={({props, match}) => (<HousePage edit houseID={match.params.house} {...props} />)}></Route>
            <Route exact path="/students" name="studentlist" component={({props}) => (<StudentListPage {...props}/>)}></Route>
            <Route path="/students/new" name="newstudent" component={({props}) => (<StudentPage {...props}/>)}></Route>
            <Route path="/students/:student" name="student" component={({props, match}) => (<StudentPage edit studentID={match.params.student} {...props}/>)}></Route>
            <Route exact path="/locations" name="locationlist" component={({props}) => (<LocationListPage {...props}/>)}></Route>
            <Route path="/locations/new" name="newlocation" component={({props}) => (<LocationPage {...props}/>)}></Route>
            <Route path="/history" name="history" component={({props}) => (<HistoryListPage {...props}/>)}></Route>
            <Route path="/locations/:location" name="location" component={({props, match}) => (<LocationPage edit locationID={match.params.location} {...props}/>)}></Route>
            <Route path="/callover" name="callover" component={({props}) => (<CalloverPage {...props} />)}></Route>
            <Route path="/settings" name="settings" component={({props}) => (<SettingsPage {...props}/>)}></Route>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

function mapStateToProps(state){
  return{
    user: state.user
  };
}

export default connect(mapStateToProps)(MainSectionLayout);
