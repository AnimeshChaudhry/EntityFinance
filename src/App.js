import React, {Component} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './store';
import Dash from './components/layout/Dash';
import AddExpenditure from './components/expenditures/AddExpenditure';
import ExpenditureDetails from './components/expenditures/ExpenditureDetails';

class App extends Component {
  render() {
    return (<Provider store={store}>
      <Router>
        <div className="App">
          <Navbar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Dash}/>
              <Route exact path="/expenditure/add" component={AddExpenditure}/>
              <Route exact path="/expenditure/:id" component={ExpenditureDetails}/>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
      );
  }
}

export default App;
