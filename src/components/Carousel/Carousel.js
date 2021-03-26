import React from 'react';
import step1 from './../../img/thumbnail.jpg';
import step1lg from './../../img/thumbnail.jpg';
import step2 from './../../img/thumbnail (1).jpg';
import step2lg from './../../img/thumbnail (1).jpg';
import step3 from './../../img/thumbnail (2).jpg';
import step3lg from './../../img/thumbnail (2).jpg';

const Carousel = () => {
  return (
    <div className="carousel">
      <div className="carousel_stepOne">
        <p className="carousel_stepOne-title">Step one...</p>
        {/* <picture className="carousel_stepOne-img">
          <source media="(min-width: 601px)" srcSet={step1lg} />
          <source media="(max-width: 600px)" srcSet={step1} />
          <img srcSet={`${step1} 1x, ${step1lg} 2x`} src={step1} alt="Step one" />
        </picture> */}
        <img
          className="carousel_stepOne-img"
          srcSet={`${step1} 1x, ${step1lg} 2x`}
          src={step1}
          alt="Step one" />
        <p className="carousel_stepOne-description">Jump into sign in page</p>
        <p className="carousel_stepOne-description">and create your account</p>
      </div>

      <div className="carousel_stepTwo">
        <p className="carousel_stepTwo-title">Step two...</p>
        {/* <picture className="carousel_stepTwo-img">
          <source media="(min-width: 601px)" srcSet={step2lg} />
          <source media="(max-width: 600px)" srcSet={step2} />
          <img srcSet={`${step2} 1x, ${step2lg} 2x`} src={step2} alt="Step two" />
        </picture> */}
        <img
          className="carousel_stepTwo-img"
          srcSet={`${step2} 1x, ${step2lg} 2x`}
          src={step2}
          alt="Step two" />
        <p className="carousel_stepTwo-description">Save the items</p>
        <p className="carousel_stepTwo-description">you want to get</p>
      </div>

      <div className="carousel_stepThree">
        <p className="carousel_stepThree-title">Step three!</p>
        {/* <picture className="carousel_stepThree-img">
          <source media="(min-width: 601px)" srcSet={step3lg} />
          <source media="(max-width: 600px)" srcSet={step3} />
          <img srcSet={`${step3} 1x, ${step3lg} 2x`} src={step3} alt="Step three" />
        </picture> */}
        <img
          className="carousel_stepThree-img"
          srcSet={`${step3} 1x, ${step3lg} 2x`}
          src={step3}
          alt="Step three" />
        <p className="carousel_stepThree-description">Share your list...</p>
        <p className="carousel_stepThree-description">and receive perfect gift!</p>
      </div>
    </div>
  )
}

export default Carousel;