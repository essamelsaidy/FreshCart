import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useProducts from '../../Hooks/useProducts';
export default function Products() {
  



 let { data, isError, error, isLoading } = useProducts()

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
            <div key={product.id} className="  hover:shadow-lg hover:rounded-lg hover:scale-[1.2] transition-all sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/6 ">
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
                <button className="btn">Add To Cart</button>
              </div>
            </div>
          ))
         }
      </div>
    </>
  );
}
