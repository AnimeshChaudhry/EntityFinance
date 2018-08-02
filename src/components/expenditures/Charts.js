import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class Charts extends Component {

  render() {
    return (
      <div>
        <Link to="/charts" className="btn btn-danger btn-sm">
          <i className="fas fa-chart-pie">{' '}Charts</i>
        </Link>
      </div>
    );
  }

}

export default Charts;
