import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    removeAllCartItems,
    removeCartItem,
    getLoggedUserCart,
    updateProductQount,
  } = useContext(CartContext);
  let { cartItems, setcartItems } = useContext(CartContext);
  const [cartDetails, setcartDetails] = useState(null);

  async function getCartItems() {
    let res = await getLoggedUserCart();

    if (res.data.status == "success") {
      setcartDetails(res.data.data);
    }
  }
  async function updateQount(id, newCount) {
    if (newCount == 0) {
      removeItem(id);
    } else {
      let res = await updateProductQount(id, newCount);

      if (res.data.status == "success") {
        toast.success("Product Ubdated Successfuly");

        setcartDetails(res.data.data);
      } else {
        toast.error("Error");
      }
    }
  }
  async function removeItem(productId) {
    let res = await removeCartItem(productId);
    console.log(res.data);
    if (res.data.status == "success") {
      setcartDetails(res.data.data);
      toast.success("Item Removed Successfuly");
      setcartItems(cartItems - 1);
    } else {
      toast.error("Error");
    }
  }

  async function RemoveItems() {
    let res = await removeAllCartItems();
    console.log(res);
    if (res.data.message == "success") {
      
      setcartDetails(null);

      toast.success("cart deleted successfuly");
    } else {
      toast.error("Cart ID not found!");
    }
  }

  // async function clearItems(cartId){
  //  let res = await removeAllCartItems(cartId)
  //  console.log(res);
  //  if(res.data.status == "success"){
  //   setcartDetails(null);
  //   // console.log(cartDetails);

  //   toast.success("cart deleted successfuly")
  //  }else{
  //   toast.error("Cart ID not found!")
  //  }

  // }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      {cartDetails?.products.length > 0 ? (
        <>
          <h2 className="font-bold text-2xl text-[#0aad0a] capitalize mb-3 py-3">
            Total Price : {cartDetails?.totalCartPrice}
          </h2>
          <div className="relative w-full overflow-x-auto shadow-lg shadow-[#0aad0aa5]  sm:rounded-lg">
            <table className="w-full  min-w-max text-sm text-left  rtl:text-right text-gray-500">
              <thead className="text-xs text-[#0aad0a] font-bold uppercase bg-gray-50-700">
                <tr>
                  <th scope="col" className="px-4 py-3 sm:px-6">
                    Image
                  </th>
                  <th scope="col" className="px-4 py-3 sm:px-6">
                    Product
                  </th>
                  <th scope="col" className="px-4 py-3 sm:px-6">
                    Qty
                  </th>
                  <th scope="col" className="px-4 py-3 sm:px-6">
                    Price
                  </th>
                  <th scope="col" className="px-4 py-3 sm:px-6">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails?.products.map((product) => (
                  <tr
                    key={product.product.id}
                    className="bg-white border-b-800 border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-2 sm:p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-10 sm:w-16 md:w-24  lg:w-32 max-w-full max-h-full"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-2 py-2 sm:px-4 text-gray-600 sm:py-4 font-semibold ">
                      {product.product.title}
                    </td>
                    <td className="px-2 py-2 sm:px-4 sm:py-4">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <button
                          onClick={() =>
                            updateQount(product.product.id, product.count - 1)
                          }
                          className="p-1 text-xs sm:text-sm h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-gray-200-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                        >
                          <svg
                            className="w-3 h-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <span className="text-[#0aad0a]">{product.count}</span>
                        <button
                          onClick={() =>
                            updateQount(product.product.id, product.count + 1)
                          }
                          className="p-1 text-xs sm:text-sm h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-gray-200-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                        >
                          <svg
                            className="w-3 h-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-2 py-2 sm:px-4 sm:py-4 font-semibold text-[#0aad0a]">
                      {product.price * product.count}
                    </td>
                    <td className="px-2 py-2 sm:px-4 sm:py-4">
                      <span
                        onClick={() => removeItem(product.product.id)}
                        className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-4 justify-between">
            <button
              onClick={() => RemoveItems(cartDetails?._id)}
              className="btn capitalize hover:bg-transparent hover:text-[#0aad0a] outline transition-all  outline-[#0aad0a] mt-3"
            >
              clear your cart
            </button>

            <Link
              to={"/checkout"}
              className="btn capitalize hover:bg-transparent hover:text-[#0aad0a] outline transition-all  outline-[#0aad0a] mt-3"
            >
              Checkout Now
            </Link>
          </div>
        </>
      ) : (
        <h1 className="text-3xl capitalize font-bold text-red-900 py-3 px-5">
          no product add yet
        </h1>
      )}
    </>
  );
}
