import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
export default function Brands() {
 const [GetBrands, setGetBrands] = useState([])
  function getBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    .then((res)=>setGetBrands(res.data.data))
    .catch((err)=>err)
  }
 useEffect(()=>{
  getBrands();
 },[])
 return (
  <div className=" row  mt-5">
    {GetBrands.map((brand) => (
      <Link className='w-1/4 p-3 rounded-sm hover:scale-110 transition-all shadow-sm' key={brand._id} to={"/"}>
        <div
          className="w-full text-center  p-3 cursor-pointer"
        >
          <img
            src={brand.image}
            alt="brand"
            className="w-full h-[250px] object-fit"
          />
          <h3 className="font-bold text-slate-600">{brand.name}</h3>
        </div>
      </Link>
    ))}
  </div>
)
}
