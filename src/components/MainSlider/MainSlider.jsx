import React from 'react'
import slid1 from "../../assets/slider-image-1.jpeg"
import slid2 from "../../assets/slider-image-2.jpeg"
import slid3 from "../../assets/slider-image-3.jpeg"
import slid4 from "../../assets/grocery-banner-2.jpeg"
// import slid4 from "../../assets/grocery-banner.png"

import Slider from "react-slick";




export default function MainSlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay : true,
    autoplaySpeed :0,
    cssEase: "linear",
    pauseOnHover: false,    
    pauseOnFocus: false,
    arrows: false

  };






  return<>
  
    
    
      <div className="row">

        <div className="w-3/4">

        <Slider {...settings}>  
          
          
        <img src={slid3} className='w-full h-[400px] object-cover' alt="" />
        <img src={slid4} className='w-full h-[400px] object-cover' alt="" />
        <img src={slid2} className='w-full h-[400px] object-cover' alt="" />
          
           </Slider> 
        
        </div>
        <div className="w-1/4">
        <img src={slid1} className='w-full h-[200px]' alt="" />
        <img src={slid2} className='w-full h-[200px]' alt="" />
        
        </div>
      </div>
    
    
    
    
    
    
 
  
  
  
  
  </> 
}
