import React, { useEffect, useState } from "react";
import style from "./ProdutDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

export default function ProdutDetails() {
  const [product, setproduct] = useState(null);
  const [relatedProducts, setrelatedProducts] = useState([])
  let { id,category } = useParams();


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay : true,
    autoplaySpeed :2000,
    cssEase: "linear",
    pauseOnHover: false,    
    pauseOnFocus: false,
    arrows:false
  };

  
  function getSpasificProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        // console.log(res.data.data);
        setproduct(res.data.data);
        // console.log(product);
      })
      .catch(() => {
        console.log(res);
      });
  }

  function getAllProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        // console.log(res.data.data); ==> arr 40 products
        let relatedProducts = res.data.data.filter( (product) => product.category.name == category)
        // console.log(relatedProducts);
        setrelatedProducts(relatedProducts)
        
      })
      .catch((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    getSpasificProduct(id);
    getAllProducts();
  }, [id , category]);

  return (
    <>
      <div className="row items-center ">
        <div className="w-1/4">

        <Slider {...settings}>  
                {product?.images.map((src)=> <img src={src}  />  )}
                
                 </Slider> 
          {/* <img
            src={product?.imageCover}
            className="w-full"
            alt={product?.title}
          /> */}
        </div>
        <div className="w-3/4 text-left p-5">
          <h3 className="font-semibold font-serif text-2xl">
            {product?.title}
          </h3>
          <h4 className="text-gray-600 my-4">{product?.description}</h4>
          <h4 className="text-gray-600 ">{product?.category.name}</h4>
          <div className="flex mb-2 justify-between">
            <span className="text-gray-600">{product?.price} EGP</span>
            <span>
              <i className="fas fa-star text-yellow-500"></i>
              {product?.ratingsAverage}
            </span>
          </div>
          <button className="btn">Add To Cart</button>
        </div>
      </div>




      <div className="row">
        {  relatedProducts.length > 0?    relatedProducts.map((product) => (
          <div key={product.id} className=" w-1/6">



            <div className="product p-3  text-left">

              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
              <img src={product.imageCover} className="w-full" alt="" />
              <h3 className="text-emerald-600">{product.category.name}</h3>
              <h3 className="mb-3 font-semibold text-[15px]">{product.title.split(" ").slice(0,2).join(" ")}</h3>
              <div className="flex mb-1 justify-between">
                <span>{product.price} EGP</span>
                <span><i className="fas fa-star text-yellow-500"></i> {product.ratingsAverage} </span>
              </div>
              </Link>

              <button className="btn">Add To Cart</button>
            </div>



          </div>
        )) :<div className="loader absolute top-[20%] left-[50%] "></div>  }
      </div>


    </>
  );
}
