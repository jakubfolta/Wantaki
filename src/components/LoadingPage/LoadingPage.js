import React from 'react';

import logo from '../../img/wantaki-logo.png';
import logoLg from '../../img/wantaki-logo-large.png';
import Spinner from '../UI/Spinner';

const LoadingPage = () => (
  <div className="loadingPage">
    <img
      className="loadingPage_logo"
      srcSet={`${logo} 1x, ${logoLg} 2x`}
      src={logoLg}
      alt="Logo" />
    <h1 className="page-heading page-heading--loading">No more missed gifts!</h1>
    <div className="loadingPage_spinner">
      <span className="loadingPage_spinner-line"></span>
    </div>
  </div>
)

export default LoadingPage;