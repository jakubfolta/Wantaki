import React, { Fragment } from 'react';
import Carousel from '../../components/Carousel/Carousel.js';

const Home = () => {
  return (
    <Fragment>
      <section className="section">
        <h1 className="page-heading">What I Desire</h1>
        <Carousel />
      </section>
    </Fragment>
  )
}

export default Home;