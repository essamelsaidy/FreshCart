import React, { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import { useState , useEffect } from "react";
import toast from "react-hot-toast";

export default function Wishlist() {
  let { getLoggedUserWishlist,removeItemFromWish } = useContext(WishlistContext);
  const [wishDetails, setwishDetails] = useState(null);
  

  async function getWishItems() {
    let res = await getLoggedUserWishlist();

    if(res.data.status == "success"){
      setwishDetails(res.data.data)
    }
    // console.log(res.data.data);
    
   
  }
  async function removeItem(id) {
    let res = await removeItemFromWish(id);

    if(res.data.status == "success"){
      setwishDetails(res.data.data)
      console.log(res.data.message);
      toast.success(res.data.message)
    }else {
      toast.error("Error");
    }
    // console.log(res.data.data);
    
   
  }

  useEffect(() => {
    getWishItems();
  }, []);
  return (
    <>
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
                Price
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          {wishDetails?.map((product)=>
            <tr key={product?.id} className="bg-white border-b-800 border-gray-200 hover:bg-gray-50">
            <td className="p-2 sm:p-4">
              <img src={product?.imageCover} alt={product?.title} className="w-10 sm:w-16 md:w-24  lg:w-32 max-w-full max-h-full" />
            </td>
            <td className="px-2 py-2 sm:px-4 text-gray-600 sm:py-4 font-semibold "> {product?.title}</td>
           
            <td className="px-2 py-2 sm:px-4 sm:py-4 font-semibold text-[#0aad0a]">{product?.price}</td>
            <td className="px-2 py-2 sm:px-4 sm:py-4">
                      <span onClick={()=>removeItem(product?.id)}
                       
                        className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </span>
                    </td>
          </tr>
          )}
          </tbody>
        </table>
      </div> 
      
    </>
  );
}
