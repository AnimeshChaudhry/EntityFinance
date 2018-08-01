import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Loading from '../layout/Loading';
import classnames from 'classnames';

class ExpenditureDetails extends Component {

  state = {
    showAmountUpdate: false, //to control if the edit balance form is shown or not
    amountUpdateamount: ''
  }

  onCLick = () => {
    this.setState({showAmountUpdate: !this.state.showAmountUpdate}) //toggle showAmountUpdate
  }

  //Delete an expenditure
  onDeleteClick = () => {
    const {expenditure, firestore} = this.props;
    firestore.delete({collection: 'expenditures', doc: expenditure.id})
    .then(() => this.props.history.push('/'));//return a promise and redirect to the dashboard
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  //update amount
  amountSubmit = (e) => {
    e.preventDefault();


  const {expenditure, firestore} = this.props;//WE NOW ADD THE CODE TO UPDATE FIRESTORE
  const {amountUpdateamount} = this.state;//Get the updated amount that the use entered in the amountForm

  const expenditureUpdate = {
    amount: (parseFloat(amountUpdateamount)) //JUST UPDATING THE amount prop
    }

    //NOW WE UPDATE IN FIRESTORE
    firestore.update({collection: 'expenditures', doc: expenditure.id}, expenditureUpdate);// update built in method that takes in the collection that we want to work with and the doc (the specific item that we want to update.....
      //....as the first parameter and what we want to update (which is in expenditureUpdate object)

  };

  render() {

    const {expenditure} = this.props;
    const {showAmountUpdate, amountUpdateamount} = this.state;

    let amountForm = '';
    //if showAmountUpdate os true, then the balance form should be displayed

    if(showAmountUpdate) {
      amountForm = (
        <form onSubmit={this.amountSubmit}> {/*CONSTRUCTING THE EDIT AMOUNT FORM HERE*/}
          <div className="input-group">
            <input type="text" className="form-control" name="amountUpdateamount" placeholder="Edit Amount" value= {amountUpdateamount} onChange={this.onChange}/>
            <div className="input-group-append">
              <input type="submit" value=" Update" className="btn btn-outline-dark"/>
            </div>
          </div>
        </form>
      )
    } else{
      amountForm=null;
    }

    if(expenditure) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-chevron-left"></i>{' '}Back to Dash
              </Link>
            </div>
            <div className="col-md-6">{/*EDIT LINK AND DELETE BUTTON WILL GO HERE*/}
              <div className="btn-group float-right">
                <Link to={`/expenditure/edit/${expenditure.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button onClick={this.onDeleteClick} className="btn btn-danger">
                  Delete {/*Will have an event attached to it*/}
                </button>
              </div>
            </div>
          </div>
          <hr/>
            <div className="card">
              <h3 className="card-header">
                {expenditure.expenseName}
              </h3>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-8 col-sm-6">
                    <h4>Expense ID:{' '} <span className="text-secondary">{expenditure.id}</span></h4>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <h3 className="pull-right">Amount: <span className={classnames({
                      'text-danger': expenditure.amount > 100, 'text-success': expenditure.amount < 100
                    })}>${parseFloat(expenditure.amount).toFixed(2)}{' '}</span>
                    <small>
                      <a href="#!" onClick={this.onCLick}>
                        <i className="fas fa-edit"></i>
                      </a>
                    </small>
                  </h3>{/*USING CLASSNAMES DEPENDENCY*/}
                    {amountForm/*ADDED THE FORM FOR EDITING THE AMOUNT*/}
                  </div>
                </div>

                <hr/>
                <ul className="list-group">
                  <li className="list-group-item">Location: {' '}{expenditure.location}</li>
                  <li className="list-group-item">Date of Purchase: {' '}{expenditure.date}</li>
                </ul>
              </div>
            </div>
        </div>
      );
    } else {
      return (<Loading/>); //while it is being fetched use the loading symbol
    }
  }

}

ExpenditureDetails.propTypes = {
  firestore: PropTypes.object.isRequired
}

//want to get props because we need id for the url
//cannot use expenditures because thats already taken, use expenditure
export default compose(firestoreConnect(props => [
  {
    collection: 'expenditures', storeAs: 'expenditure', doc: props.match.params.id
  }
]), connect(({firestore: {ordered}}, props) => ({expenditure: ordered.expenditure && ordered.expenditure[0]})))(ExpenditureDetails);
