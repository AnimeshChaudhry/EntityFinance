import React, {Component} from 'react';
import Chart from '../layout/Chart'

class chartslogic extends Component {

  constructor() {
    super();
    this.state = {
      chartData: {},
      Car: 0
    };
  }

  componentDidMount() {
    //this.getChartData();
  }
  componentWillMount() {
    this.getChartData();
  }

  getChartData() {

    var array2 = new Array();

    var transArray = new Array();
    var monthTotal = 0;

    this.setState({

      chartData: {
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
            data: [],
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

  render() {
    return (<div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to React</h1>

      </header>
      <Chart chartData={this.state.chartData} legendPosition="bottom"/>
    </div>);
  }
}

export default chartslogic;
