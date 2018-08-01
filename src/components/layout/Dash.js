import React from 'react';
import Expenditures from '../expenditures/Expenditures';
import Bar from '../layout/Bar';

export default() => {
  return (
    <div className="row">
      <div className="col-md-10">
        <Expenditures/>
      </div>
      <div className="col-md-2">
        <Bar/>
      </div>
    </div>);
};
