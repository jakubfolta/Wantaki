import React from 'react';
import step1 from './../../img/thumbnail.jpg';
import step2 from './../../img/thumbnail (1).jpg';
import step3 from './../../img/thumbnail (2).jpg';

const Carousel = () => {
  return (
    <div className="carousel">
      <div className="carousel_stepOne">
        <p className="carousel_stepOne-title">Step one...</p>
        <img className="carousel_stepOne-img" src={step1} alt="Step one" />
        <p className="carousel_stepOne-description">Jump into your account</p>
      </div>
      <div className="carousel_stepTwo">
        <p className="carousel_stepTwo-title">Step two...</p>
        <img className="carousel_stepTwo-img" src={step2} alt="Step two" />
        <p className="carousel_stepTwo-description">Save your items</p>
      </div>
      <div className="carousel_stepThree">
        <p className="carousel_stepThree-title">Step three!</p>
        <img className="carousel_stepThree-img" src={step3} alt="Step three" />
        <p className="carousel_stepThree-description">Share your list!!!</p>
      </div>
    </div>
  )
}

export default Carousel;