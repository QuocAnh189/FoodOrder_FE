'use client';

//charkra-ui
import { ChakraProvider } from '@chakra-ui/react';
import { createContext, useEffect, useState } from 'react';

//toast
import toast from 'react-hot-toast';

//redux
import store from 'src/redux/store';
import { Provider } from 'react-redux';

export const CartContext = createContext({});

export function cartProductPrice(cartProduct: any) {
  let price = cartProduct.basePrice;
  if (cartProduct.size) {
    price += cartProduct.size.price;
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price;
    }
  }
  return price;
}

const AppProvider = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [cartProducts, setCartProducts] = useState<any>([]);

  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')!));
    }
  }, []);

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(indexToRemove: any) {
    setCartProducts((prevCartProducts: any) => {
      const newCartProducts = prevCartProducts.filter(
        (v: any, index: any) => index !== indexToRemove
      );
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success('Product removed');
  }

  function saveCartProductsToLocalStorage(cartProducts: any) {
    if (ls) {
      ls.setItem('cart', JSON.stringify(cartProducts));
    }
  }

  function addToCart(product: any, size = null, extras = []) {
    setCartProducts((prevProducts: any) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }

  return (
    <ChakraProvider>
      <Provider store={store}>
        <CartContext.Provider
          value={{
            cartProducts,
            setCartProducts,
            addToCart,
            removeCartProduct,
            clearCart
          }}
        >
          {children}
        </CartContext.Provider>
      </Provider>
    </ChakraProvider>
  );
};

export default AppProvider;
