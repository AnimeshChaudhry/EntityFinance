import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Loading from '../layout/Loading';


class EditExpenditure extends Component {

  constructor(props) {
    super(props);
    //have to create refs HERE
    this.expenseNameInput = React.createRef();
    this.typeInput = React.createRef();
    this.amountInput = React.createRef();
    this.locationInput = React.createRef();
    this.dateInput = React.createRef();

  }

  onSubmit = e => {
    e.preventDefault();

    const {expenditure, firestore, history} = this.props;

    //update the expenditure
    const updateExpenditure = {
      expenseName: this.expenseNameInput.current.value,
      type: this.typeInput.current.value,
      amount: this.amountInput.current.value === '' ? 0 : this.amountInput.current.value, //if the amount field was left empty
      date: this.dateInput.current.value,
      location: this.locationInput.current.value

    }

    //update the firestore part HERE
    firestore.update({collection: 'expenditures', doc: expenditure.id}, updateExpenditure)
      .then(history.push('/'));
  }

  render() {
    const {expenditure} = this.props;

    if(expenditure) {
      return <div>
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
                <input type="text" className="form-control" name="expenseName" minLength="2" required ref={this.expenseNameInput} onChange={this.onChange} defaultValue={expenditure.expenseName}/> {/*need to put each input as a state*/}
               </div>

               <div className="form-group">
                 <label htmlFor="type">Type</label>
                 <input type="text" className="form-control" name="type" minLength="2" required ref={this.typeInput}  onChange={this.onChange} defaultValue={expenditure.type}/> {/*need to put each input as a state*/}
               </div>

                <div className="form-group">
                  <label htmlFor="amount">Amount</label>
                  <input type="text" className="form-control" name="amount" ref={this.amountInput}  onChange={this.onChange} defaultValue={expenditure.amount}/> {/*need to put each input as a state*/}
                </div>

                 <div className="form-group">
                   <label htmlFor="location">Location</label>
                   <input type="text" className="form-control" name="location" minLength="2" required onChange={this.onChange} ref={this.locationInput} defaultValue={expenditure.location}/> {/*need to put each input as a state*/}
                 </div>

                 <div className="form-group">
                   <label htmlFor="date">Date</label>
                   <input type="text" className="form-control" name="date" minLength="2" required onChange={this.onChange} ref={this.dateInput} defaultValue={expenditure.date}/> {/*need to put each input as a state*/}
                 </div>

                 <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
            </form>
          </div>
        </div>
      </div>
    } else {
      return <Loading/>
    }
  }

}

EditExpenditure.propTypes = {
  firestore: PropTypes.object.isRequired
}

export default compose(firestoreConnect(props => [
  {
    collection: 'expenditures', storeAs: 'expenditure', doc: props.match.params.id
  }
]), connect(({firestore: {ordered}}, props) => ({expenditure: ordered.expenditure && ordered.expenditure[0]})))(EditExpenditure);
