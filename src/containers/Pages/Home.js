import React, { Fragment } from 'react';
import Carousel from '../../components/Carousel/Carousel.js';
import logo from '../../img/logo.png';

const Home = () => {
  return (
    <Fragment>
      <div className="logo">
        <img className="logo_img" src={logo} alt="logo"/>
      </div>
      <div className="logo_group">
        <h1 className="page-heading logo_title">Wantaki</h1>
        <span className="logo_gradient"></span>

      </div>
      <section className="section">
        <Carousel />
      </section>
    </Fragment>
  )
}

export default Home;