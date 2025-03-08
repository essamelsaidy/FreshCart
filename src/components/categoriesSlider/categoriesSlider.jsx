import React, { useEffect, useState } from "react";
import style from "./CategoriesSlider.module.css";
import Slider from "react-slick";
import axios from "axios";

export default function CategoriesSlider() {
  const [categories, setcategories] = useState([]);

  function getAllCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        // console.log(res.data.data);
        setcategories(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
    pauseOnFocus: false,
  };

  return (
    <>
      <h2 className="text-gray-800 font-semibold font-serif capitalize text-left my-1">
        Shop popular Categories
      </h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div className="text-left" key={category._id}>
            <img
              src={category.image}
              className="w-full h-[200px] object-cover"
              alt=""
            />
            <h4 className="text-sm py-1"> {category.name}</h4>
          </div>
        ))}
      </Slider>
    </>
  );
}
