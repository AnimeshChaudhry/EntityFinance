import React from 'react';
import Loading from './Loading.gif';

export default() => {
  return (<div>
    <img src={Loading} alt="Loading..." style={{width:'75px', margin: 'auto', display:'block'}}/>
  </div>);
};
