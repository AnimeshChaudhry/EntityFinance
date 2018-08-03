import React, {Component} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {UserIsAuthenticated, UserIsNotAuthenticated} from './helpers/auth'
import {Provider} from 'react-redux';
import store from './store';
import Dash from './components/layout/Dash';
import AddExpenditure from './components/expenditures/AddExpenditure';
import ExpenditureDetails from './components/expenditures/ExpenditureDetails';
import EditExpenditure from './components/expenditures/EditExpenditure';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import chartslogic from './components/expenditures/chartslogic';


class App extends Component {
  render() {
    return (<Provider store={store}>
      <Router>
        <div className="App">
          <Navbar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={UserIsAuthenticated(Dash)}/>
              <Route exact path="/expenditure/add" component={UserIsAuthenticated(AddExpenditure)}/>
              <Route exact path="/expenditure/edit/:id" component={UserIsAuthenticated(EditExpenditure)}/>
              <Route exact path="/expenditure/:id" component={UserIsAuthenticated(ExpenditureDetails)}/>
              <Route exact path="/charts" component={chartslogic}/>
              <Route exact path="/login" component={UserIsNotAuthenticated(Login)}/>
              <Route exact path="/register" component={UserIsNotAuthenticated(Register)}/>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
      );
  }
}

export default App;
