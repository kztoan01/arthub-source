import { createContext, useEffect, useState } from "react";
import apiCourse from '../api/axiosCourseConfig'

export const ShopContext = createContext(null);

const getDefaultCart = (courses) => {
  let cart = {};
  for (let i = 1; i < courses?.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
    
  const [courses, setCourses] = useState()
  const getCourses = async () => {
    try {
      const response = await apiCourse.get("/getCourses");
      setCourses(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCourses();
  }, []
  )
  const [cartItems, setCartItems] = useState(getDefaultCart(courses));

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = courses.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };
  console.log(cartItems)
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: true }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: false }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = () => {
    setCartItems(getDefaultCart());
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};