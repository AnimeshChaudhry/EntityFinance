import React, {Component} from 'react';
import Chart from '../layout/Chart';
import {firestoreConnect} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';
import firebase from 'firebase';
import {reactReduxFirebase, firebaseReducer} from 'react-redux-firebase';
import {reduxFirestore, firestoreReducer} from 'redux-firestore';
import {Bar,Line,Pie, Doughnut, Radar, polarArea} from 'react-chartjs-2';

class chartslogic extends Component {

  constructor() {
    super();
    this.state = {
      chartData1: {}
    };
  }

  componentDidMount() {
    //this.getChartData();

  }
  componentWillMount() {
    this.getChartData();
  }

  getChartData() {

    var monthArray = new Array();
    var monthTotal = 0;

    var categoryArray = new Array();
    var RentTotal = 0;
    var UtilitiesTotal = 0;
    var CarTotal = 0;
    var FoodTotal = 0;
    var EntertainmentTotal = 0;
    var MiscTotal = 0;

    //Ajax calls here
    this.setState({
      chartData1: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'June',
          'July',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        datasets: [
          {
            label: 'Year Breakdown',
            //data: monthArray,
            data: [
              450.32,
              622.14,
              216.93,
              572.61,
              815.00,
              766.82,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            backgroundColor: ['rgba(132,255,174,0.5)']
          }
        ]
      },
      chartData2: {

        labels: [
          'Rent',
          'Utilities',
          'Car',
          'Food',
          'Entertainment',
          'Misc'
        ],
        datasets: [
          {
            label: 'Monthly Budget',
            data: [
              22500.00,
              3600.82,
              4800.82,
              10000.72,
              2000.91,
              3000.12
            ],
            backgroundColor: [
              'rgba(255,99,132,0.6)',
              'rgba(54,162,235,0.6)',
              'rgba(255,206,86,0.6)',
              'rgba(75,192,192,0.6)',
              'rgba(153,102,225,0.6)',
              'rgba(255,159,64,0.6)',
              'rgba(255,99,132,0.6)'
            ]
          }
        ]
      }

    });
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right'
  }

  render() {
    return (<div className="App">
      <header className="App-header">


      </header>
      <div className="chart">

        <Line data={this.state.chartData1} options={{
            title: {
              display: this.props.displayTitle,
              text: 'Yearly Overview',
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}/>

        <Doughnut data={this.state.chartData2} options={{
            title: {
              display: this.props.displayTitle,
              text: 'Yearly Category Expenses',
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}/>
      </div>
    </div>);
  }
}

export default compose(firestoreConnect(props => [
  {
    collection: 'expenditures',
    storeAs: 'expenditure',
    doc: props.match.params.id
  }
]), connect(({
  firestore: {
    ordered
  }
}, props) => ({expenditure: ordered.expenditure})))(chartslogic);
