import React, { Fragment } from 'react';
import Carousel from '../../components/Carousel/Carousel.js';
import Logo from '../../components/Logo/Logo.js';

const Home = () => {
  return (
    <Fragment>
      <Logo />
      <section className="section">
        <Carousel />
        <span className="version">2.0</span>
      </section>
    </Fragment>
  )
}

export default Home;