import React, { Component } from 'react';
import {Link} from 'react-router-dom';
//import {connect} from 'react-redux';
//import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';

class AddExpenditure extends Component {

  state = {
    expenseName:'',
    type:'',
    amount:'',
    location:'',
    date:''
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newExpenditure = this.state;

    const { firestore } = this.props; // a little destrucuturing

    //if the expense amount is left empty, set it to 0
    if(newExpenditure.amount === '') {
      newExpenditure.amount = 0;
    }

    //can also get a promise back from this add so use .then ----v
    firestore.add({collection: 'expenditures'}, newExpenditure).then((this.props.history.push('/'))); //specify the collection (expenditures) that you want to add to and also specify the actual expenditure you want to add
  };

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value}); //e.target.name is the key
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left"></i>{' '}Back to Dash
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Add Expense</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="expenseName">Expense Name</label>
                <input type="text" className="form-control" name="expenseName" minLength="2" required onChange={this.onChange} value={this.state.expenseName}/> {/*need to put each input as a state*/}
               </div>

               <div className="form-group">
                 <label htmlFor="type">Type</label>
                 <input type="text" className="form-control" name="type" minLength="2" required onChange={this.onChange} value={this.state.type}/> {/*need to put each input as a state*/}
               </div>

                <div className="form-group">
                  <label htmlFor="amount">Amount</label>
                  <input type="text" className="form-control" name="amount" onChange={this.onChange} value={this.state.amount}/> {/*need to put each input as a state*/}
                </div>

                 <div className="form-group">
                   <label htmlFor="location">Location</label>
                   <input type="text" className="form-control" name="location" minLength="2" required onChange={this.onChange} value={this.state.location}/> {/*need to put each input as a state*/}
                 </div>

                 <div className="form-group">
                   <label htmlFor="date">Date</label>
                   <input type="text" className="form-control" name="date" minLength="2" required onChange={this.onChange} value={this.state.date}/> {/*need to put each input as a state*/}
                 </div>

                 <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

AddExpenditure.propTypes = {
  firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(AddExpenditure);
