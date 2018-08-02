import React from 'react';
import Bar from '../layout/Bar';
import Expenditures from '../expenditures/Expenditures';
import Charts from '../expenditures/Charts';

export default() => {
  return (
    <div className="row">
      <div className="col-md-10">
        <Expenditures/>
      </div>
      <div className="col-md-2">
        <Bar/>
      </div>
      <Charts/>
    </div>);
};
