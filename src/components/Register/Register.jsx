import React, { useContext, useState } from "react";
import style from "./Register.module.css";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Register() {
let{userLogin,setuserLogin}  =useContext(UserContext)

  let navigate = useNavigate();
  const [apiErorr, setapiErorr] = useState("");
  const [isLouding, setisLouding] = useState(false);

  //  first way  ==> not suported
  // async function handleRegister(values) {
  //   console.log(values);

  //   // call api

  //   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values);
  //   console.log(data);

  //   if(data.message == "success"){

  //     // go to home
  //     navigate("/")
  //   }else{

  //     // catch error and show

  //   }

  // }

  // =================================================================
  // custom Validation
  // function myValidation(values) {
  //   let erorrs = {};

  //   if (values.name == "") {
  //     erorrs.name = "name is rquirde";
  //   } else if (!/^[A-Z][a-z]{3}$/.test(values.name)) {
  //     erorrs.name = "name is not valid";
  //   }

  //   if (values.phone == "") {
  //     erorrs.phone = "phone is rquirde";
  //   } else if (!/^[A-Z][a-z]{3}$/.test(values.phone)) {
  //     erorrs.phone = "phone is not valid";
  //   }

  //   return erorrs;
  // }
  // =====================================================================

  //   YUP Validation

  //  second way
  function handleRegister(values) {
    setisLouding(true)
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {

        setisLouding(false)
        console.log(res);
        if(res.data.message == "success"){
          console.log("okay");
          localStorage.setItem("userToken",res.data.token)
          setuserLogin(res.data.token)
          navigate("/")
          
        }

      })
      .catch((res) => {
        setisLouding(false)
        console.log(res.response.data.message);
        setapiErorr(res.response.data.message);
      });
  }

  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "min char is 3")
      .max(20, "max char is 20")
      .required("name is required"),
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "Invalid email! Please enter a correct email format"
      )
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "min lenght is 6")
      .required("password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "Not matched Password"),
    phone: yup.string().matches(/^01[0125][0-9]{8}$/, "phone is not valid"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    // validate: myValidation,   ===> custom validation
    validationSchema, // ===> YUP validation
    onSubmit: handleRegister,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto pb-48 ">
      {apiErorr?  <div className="bg-red-600 text-white p-3 text-center rounded-lg text-lg my-4"><h1>
   {apiErorr} </h1>
  </div> :null }

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Name...
          </label>
        </div>
        {formik.errors.name && formik.touched.name ? (
          <div class="p-4 mb-4 text-sm text-red-800 rounded-lg" role="alert">
            <span class="font-medium">{formik.errors.name}</span>
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Email...
          </label>
        </div>
        {formik.errors.email && formik.touched.email ? (
          <div class="p-4 mb-4 text-sm text-red-800 rounded-lg" role="alert">
            <span class="font-medium">{formik.errors.email}</span>
          </div>
        ) : null}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Password...
          </label>
        </div>
        {formik.errors.password && formik.touched.password ? (
          <div class="p-4 mb-4 text-sm text-red-800 rounded-lg" role="alert">
            <span class="font-medium">{formik.errors.password}</span>
          </div>
        ) : null}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            rePassword...
          </label>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <div class="p-4 mb-4 text-sm text-red-800 rounded-lg" role="alert">
            <span class="font-medium">{formik.errors.rePassword}</span>
          </div>
        ) : null}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Phone...
          </label>
        </div>
        {formik.errors.phone && formik.touched.phone ? (
          <div class="p-4 mb-4 text-sm text-red-800 rounded-lg" role="alert">
            <span class="font-medium">{formik.errors.phone}</span>
          </div>
        ) : null}
      <div className="flex gap-4 items-center">
      <button
          type="submit"
          className="text-white bg-emerald-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
         {isLouding? <i className="fas fa-spinner fa-spin"></i> : "Register"}
        </button>
        <Link to={"/login"} ><span className="text-emerald-600 ">Do you have an account? <span className="underline">Login Now</span></span></Link>
      </div>
      </form>
    </>
  );
}
