import axios from "axios";
import React, { createContext, useEffect } from "react";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addToWishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: productId },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function getLoggedUserWishlist() {
    return axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/wishlist
`,
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function removeItemFromWish(id) {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}
`,
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  useEffect(() => {
    getLoggedUserWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        addToWishlist,
        getLoggedUserWishlist,
        removeItemFromWish
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}
