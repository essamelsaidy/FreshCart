import React, { useContext, useEffect, useState } from "react";
import stle from "./ResentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../context/WishlistContext";

export default function ResentProducts() {
  // const [products, setproducts] = useState([]);
  // function getProducts() {
  //   axios
  //     .get(`https://ecommerce.routemisr.com/api/v1/products`)
  //     .then((res) => {
  //       // console.log(res.data.data);
  //       setproducts(res.data.data);
  //     })
  //     .catch(() => {});
  // }
  // useEffect(() => {
  //   getProducts();
  // }, []);
  let { addProductToCart,cartItems ,setcartItems } = useContext(CartContext);
  let { data, isError, error, isLoading } = useProducts();
  let { addToWishlist } = useContext(WishlistContext)
  const [Louding, setLouding] = useState(false);



  const [curentId, setcurentId] = useState(0)


  async function addToWish(id){
   let res = await addToWishlist(id)
   console.log(res.data.status);
   if (res.data.status == "success") {
    toast.success(res.data.message);
  } else {
    toast.error(res.data.message);
  }

  }


  async function addToCart(id) {
    setcurentId(id)
    setLouding(true);
    let res = await addProductToCart(id);
    console.log(res.data);
    if (res.data.status == "success") {
      setLouding(false);
      setcartItems(cartItems + 1)

      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
      setLouding(false);
    }
  }

  if (isError) {
    return <h3>{error.message}</h3>;
  }
  if (isLoading) {
    return <div className="loader mx-auto "></div>;
  }
  
  
  
  
  return (
    <>
      <div className="row">
        {data?.data?.data.map((product) => (
          <div
            key={product.id}
            className=" hover:shadow-lg hover:rounded-lg hover:scale-[1.2] transition-all sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/6  "
          >
            <div className="product p-3  text-left">
              <Link
                to={`productdetails/${product.id}/${product.category.name}`}
              >
                <img src={product.imageCover} className="w-full" alt="" />
                <h3 className="text-emerald-600">{product.category.name}</h3>
                <h3 className="mb-3 font-semibold text-[15px]">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex mb-1 justify-between">
                  <span className="text-slate-500">{product.price} EGP</span>

                  <span className="text-slate-500">
                    <i className="fas fa-star text-yellow-500"></i>{" "}
                    {product.ratingsAverage}{" "}
                  </span>
                </div>
              </Link>
              <span onClick={()=> addToWish(product.id)} className="text-slate-500 cursor-pointer text-xl hover:text-emerald-600 "> <i class="fa-solid fa-heart"></i> </span>

              <button
                onClick={() => addToCart(product.id)}
                className="btn md:text[10px]"
              >
             {Louding  && curentId == product.id ? <i className="fas fa-spinner fa-spin"></i> : "Add To Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
