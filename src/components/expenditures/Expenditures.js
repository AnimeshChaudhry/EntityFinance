import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Loading from '../layout/Loading';

class Expenditures extends Component {

  state = {
    totalSpent: null
  }

  static getDerivedStateFromProps(props, state) { // new way to get the expenditures, takes in props and state, because componentWillRecieveProps getting depricated
    const {expenditures} = props; //getting expenditures out of the props, don't need this in this.props since props is passed through the parameters

    if (expenditures) { //make sure that the expenditures have been recieved from firesstore before we do anything
      //Add the expense amount here
      const total = expenditures.reduce((total, expenditures) => {
        return total + parseFloat(expenditures.amount.toString());
      }, 0) // start from 0
      return {totalSpent: total} //totalSpent was the state we defined as null in the begenning, define it as total
    }

    return null; //if there is nothing in the database
  }

  render() {
    const {expenditures} = this.props; //some destructuring
    const {totalSpent} = this.state;//pull the toal out of the state

    if (expenditures) { //is the expenditure exists
      return (<div>
        <div className="row">
          <div className="col-md-6">
            <h2>{' '}<i className="fas fa-credit-card"></i>
              {' '}Expenditures
            </h2>
          </div>
          <div className="col-md-6">
            <h5 className="text-right text-secondary">
              Total Spent:{' '}
              <span className="text-primary">
                $ {parseFloat(totalSpent).toFixed(2)}{/*NEED STATE TO LOOP THROUGH THE AMOUNT OF EXPENSE, added state right before render()*/}
              </span>
            </h5>
          </div>
        </div>
        <table className="table table-striped">
          <thead className="thead-inverse">
            <tr>
              <th>Expense</th>
              <th>Type</th>
              <th>Amount</th>
              <th/>
            </tr>
          </thead>
          {/* THIS IS WHERE WE WILL LOOP THROUGH THE USER, return/output a table row for each expenditure array of objects (predefined initially) ---->*/}
          {/* MAP RETURNS AN ARRAY, takes in a function as a parameter. Can manipulate an array  ---->*/}
          <tbody>
            {
              expenditures.map(expenditure => (<tr key={expenditure.id}>
                <td>{expenditure.expenseName}</td>
                <td>{expenditure.type}</td>
                <td>$ {' '} {parseFloat(expenditure.amount).toFixed(2)}</td>
                <td>
                  <Link to={`/expenditure/${expenditure.id}`} className="btn btn-info btn-sm">
                    <i className="fa fa-arrow-left">{' '}More Details</i>
                  </Link>
                </td>
              </tr>))

            }
          </tbody>
        </table>
      </div>);
    } else {
      return <Loading/>;
    }
  }

}

Expenditures.propTypes = {
  firestore: PropTypes.object.isRequired,
  expenditures: PropTypes.array
}

export default compose(firestoreConnect([
  {
    collection: 'expenditures'
  }
]), connect((state, props) => ({expenditures: state.firestore.ordered.expenditures})))(Expenditures);
//ACCESS EXPENDITURES FROM FIRESTORE, will be put into expenditure props and can access from this.props.expenditures
//Mapping props to states
