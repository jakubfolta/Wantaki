import React from 'react';
import step1 from './../../img/thumbnail.jpg';
import step2 from './../../img/thumbnail (1).jpg';
import step3 from './../../img/thumbnail (2).jpg';

const Carousel = () => {
  return (
    <div className="carousel">
      <div className="carousel_slider">
        <img src={step1} alt="Step one" />
        <img src={step2} alt="Step two" />
        <img src={step3} alt="Step three" />
      </div>
      {/* <div className="carousel_slider">
        <img src={step1} alt="Step one" />
        <img src={step2} alt="Step two" />
        <img src={step3} alt="Step three" />
      </div> */}
    </div>
  )
}

export default Carousel;