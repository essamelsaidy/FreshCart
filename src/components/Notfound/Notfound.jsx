import React from 'react'
import style from './Notfound.module.css'
import notFound from "../../assets/error.svg"

export default function Notfound() {
  return <>
  <div className="row items-center justify-center">
    <img src={notFound} alt="" />
  </div>
  
  
  </>
}
