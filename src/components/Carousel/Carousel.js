import React from 'react';
import step1sm from './../../img/firststepsm.png';
import step1lg from './../../img/firststeplg.png';
import step1mobile from './../../img/firststepmobile.png';
import step2sm from './../../img/secondstepsm.png';
import step2lg from './../../img/secondsteplg.png';
import step2mobile from './../../img/secondstepmobile.png';
import step3sm from './../../img/thirdstepsm.png';
import step3lg from './../../img/thirdsteplg.png';
import step3mobile from './../../img/thirdstepmobile.png';

const Carousel = () => {
  return (
    <div className="carousel">
      <div className="carousel_stepOne">
        <p className="carousel_stepOne-title">Step one...</p>
        <picture>
          <source media="(max-width: 900px)" srcSet={step1mobile} />
          <source media="(min-width: 901px)" srcSet={step1sm} />
          <source media="(min-width: 1801px)" srcSet={step1lg} />
          <img className="carousel_stepOne-img" srcSet={`${step1mobile} 1x, ${step1sm} 2x`} src={step1mobile} alt="Step one" />
        </picture>
        <p className="carousel_stepOne-description">Jump into sign in page</p>
        <p className="carousel_stepOne-description">and set up your account</p>
      </div>


      <div className="carousel_stepTwo">
        <p className="carousel_stepTwo-title">Step two...</p>
        <picture>
          <source media="(max-width: 900px)" srcSet={step2mobile} />
          <source media="(min-width: 901px)" srcSet={step2sm} />
          <source media="(min-width: 1801px)" srcSet={step2lg} />
          <img className="carousel_stepTwo-img" srcSet={`${step2mobile} 1x, ${step2sm} 2x`} src={step2mobile} alt="Step two" />
        </picture>
        <p className="carousel_stepTwo-description">Create a list of items</p>
        <p className="carousel_stepTwo-description">you want to get</p>
      </div>

      <div className="carousel_stepThree">
        <p className="carousel_stepThree-title">Step three!</p>
        <picture>
          <source media="(max-width: 900px)" srcSet={step3mobile} />
          <source media="(min-width: 901px)" srcSet={step3sm} />
          <source media="(min-width: 1801px)" srcSet={step3lg} />
          <img className="carousel_stepThree-img" srcSet={`${step3mobile} 1x, ${step3sm} 2x`} src={step3mobile} alt="Step three" />
        </picture>
        <p className="carousel_stepThree-description">Share your list's link...</p>
        <p className="carousel_stepThree-description">and receive perfect gifts!</p>
      </div>
    </div>
  )
}

export default Carousel;