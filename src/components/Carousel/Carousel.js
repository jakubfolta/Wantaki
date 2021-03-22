import React from 'react';
import logo from './../../img/thumbnail.jpg';
import img2 from './../../img/thumbnail (1).jpg';
import img3 from './../../img/thumbnail (2).jpg';

const Carousel = () => {
  return (
    <div className="carousel">
      <div className="carousel_slider">
        <img src="{logo}" alt="Step one" />
        <img src="{img2}" alt="Step two" />
        <img src="{img3}" alt="Step three" />
      </div>
      {/* <div className="carousel_group"></div> */}
    </div>
  )
}

export default Carousel;