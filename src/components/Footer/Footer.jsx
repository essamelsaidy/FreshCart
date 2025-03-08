import React from "react";
import style from "./Footer.module.css";
import paypal from "../../assets/paypal.png";
import amazon from "../../assets/amazonpay.png";
import appStore from "../../assets/appStore.png";
import googlePay from "../../assets/googlePlay.png";
import master from "../../assets/mastercard.png";
import american from "../../assets/american.png";

export default function Footer() {
  return (
    <>
      <footer className=" flex-col absolute left-0 right-0 z-50 px-0  w-full p-4 bg-gray-100 border-t border-gray-200 shadow-sm  md:p-6">
        <div className="footer-title text-left">
          <h2 className="text-gray-900 text-xl">Get the FreshCart App</h2>
          <p className="text-gray-500">
            we will send you a link, open it on your phone to download the app
          </p>
        </div>

        <div className="footer-email flex justify-center gap-4 py-6">
          <input
            className="w-3/4 border-none rounded-md outline-none shadow-sm"
            type="text"
            placeholder="    Email...."
          />
          <button className="bg-[#0AAD0A] px-5 py-1 rounded-md text-white text-sm">
            Share App Link
          </button>
        </div>

        <div className="footer-pay w-[90$] border-t border-b  flex justify-between ">
          <div className="payment-partners flex items-center gap-1">
            <h2 className="text-gray-700">Payment Partners</h2>
            <img src={paypal} className="w-[80px]" alt="" />
            <img src={amazon} className="w-[80px]" alt="" />
            <img src={master} className="w-[80px]" alt="" />
            <img src={american} className="w-[80px]" alt="" />
          </div>
          <div className="get-deliveries flex items-center gap-3">
            <h2 className="text-gray-700">Get deliveries with FreshCart</h2>
            <img src={appStore} className="w-[80px]" alt="" />
            <img src={googlePay} className="w-[80px]" alt="" />
          </div>
        </div>
      </footer>
    </>
  );
}
