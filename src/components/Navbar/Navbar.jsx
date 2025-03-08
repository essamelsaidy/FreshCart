import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from "../../assets/freshcart-logo.svg"
import { UserContext } from '../../context/UserContext'
import { CartContext } from './../../context/CartContext';



export default function Navbar() {
  let {userLogin,setuserLogin}=useContext(UserContext)
let navigate=useNavigate()
let {cartItems} = useContext(CartContext)

  function signOut(){
    localStorage.removeItem("userToken")
    setuserLogin(null)
    navigate("/login")

  }



  return <>
  
<nav className="bg-gray-100 fixed top-0 left-0 right-0 z-[500] border-gray-200 items-center">
    <div className="flex flex-wrap justify-center  lg:justify-between gap-3  items-center mx-auto max-w-screen-xl p-4">

        <div className='flex gap-4 items-center'>
      <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} width={"120px"} alt="FreshCart" />
        </Link>

        {userLogin != null ?  <ul className='flex gap-4' >
          <li className='text-slate-500 text-lg '>
            <NavLink to="">Home</NavLink>
          </li>
          <li className='text-slate-500 relative text-lg'><NavLink to="cart">Cart
            <div className='absolute top-[-13px] right-[-13px] flex items-center justify-center p-[10px] bg-emerald-500 text-white size-4 rounded-full text-[15px]'>{cartItems}</div>
            
            </NavLink></li>
          <li className='text-slate-500 text-lg'><NavLink to="products">Products</NavLink></li>
          <li className='text-slate-500 text-lg'> <NavLink to="categories">Categories</NavLink></li>
          <li className='text-slate-500 text-lg'><NavLink to="brands">Brands</NavLink></li>
          <li className='text-slate-500 text-lg'><NavLink to="wishlist"> <i class="fa-solid fa-heart"></i></NavLink></li>
        </ul> :null}
      
        </div>

        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <ul className='flex gap-4 '>
            <li className='text-gray-700 hover:text-[#0AAD0A] text-[18px]'><i class="fa-brands fa-facebook-f"></i></li>
            <li className='text-gray-700 hover:text-[#0AAD0A] text-[18px]'><i class="fa-brands fa-instagram"></i></li>
            <li className='text-gray-700 hover:text-[#0AAD0A] text-[18px]'><i class="fa-brands fa-linkedin"></i></li>
            <li className='text-gray-700 hover:text-[#0AAD0A] text-[18px]'><i class="fa-brands fa-twitter"></i></li>
            <li className='text-gray-700 hover:text-[#0AAD0A] text-[18px]'><i class="fa-brands fa-tiktok"></i></li>
            <li className='text-gray-700 hover:text-[#0AAD0A] text-[18px]' ><i class="fa-brands fa-youtube"></i></li>
          </ul>

          <ul className='flex gap-3'>
            {userLogin !=null ?  <li className='text-slate-500 text-lg'> <span className='cursor-pointer' onClick={signOut} >SignOut</span> </li> :<>
            <li className='text-slate-500 text-lg'> <NavLink to="login">Login</NavLink> </li>
            <li className='text-slate-500 text-lg'> <NavLink to="register">Register</NavLink> </li>
            </> }
          </ul>

        </div>
    </div>
</nav>

  </>
}
