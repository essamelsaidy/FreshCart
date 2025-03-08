import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import logo from '../../assets/freshcart-logo.svg'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CategoriesSlider from '../categoriesSlider/categoriesSlider'

export default function Categories() {
  const [GetCategories, setGetCategories] = useState([])

  function getCategories() {
    return axios
      .get('https://ecommerce.routemisr.com/api/v1/categories')
      .then((res) => setGetCategories(res.data.data))
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    getCategories()
  }, [])

  return <>
  <CategoriesSlider/>
    <div className="row mt-5 ">
      {GetCategories.map((category) => (
        <Link className='w-1/4 p-3 shadow-sm hover:scale-110 transition-all ' key={category._id} to={`/`}>
          <div
            className="w-full text-center "
          >
            <img
              src={category.image}
              alt="category"
              className="w-full h-[250px] object-contain"
            />
            <h3>{category.name}</h3>
          </div>
        </Link>
      ))}
    </div>
    </>
}
