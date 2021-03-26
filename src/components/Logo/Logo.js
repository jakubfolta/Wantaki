import React from 'react';
import logo from '../../img/wantaki-logo.png';
import logoLg from '../../img/wantaki-logo-large.png';

const Logo = () => (
  <div className="logo">
    <img
      className="logo_img"
      srcSet={`${logo} 1x, ${logoLg} 2x` }
      src={logo}
      alt="logo"/>
    <h1 className="page-heading logo_title">Wantaki</h1>
  </div>
)

export default Logo;