'use client';
import { useContext, useEffect, useState } from 'react';

//chakra-ui
import { Box, Button, FormControl, Grid, Text } from '@chakra-ui/react';

//components
import { CartContext, cartProductPrice } from 'src/components/AppContext';
import Trash from 'src/components/icons/Trash';

//icons
import AddressInputs from 'src/components/layout/AddressInputs';
import SectionHeaders from 'src/components/layout/SectionHeaders';
import CartProduct from 'src/components/menu/CartProduct';

//toast
import toast from 'react-hot-toast';

//redux
import { useAppSelector } from 'src/redux/hooks';

const CartPage = () => {
  const { cartProducts, removeCartProduct }: any = useContext(CartContext);
  const [address, setAddress] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed 😔');
      }
    }
  }, []);

  const user = useAppSelector(state => state.auth.authData?.user);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }

  const handleAddressChange = (propName: any, value: any) => {
    setAddress(prevAddress => ({ ...prevAddress, [propName]: value }));
  };
  const proceedToCheckout = async (ev: any) => {
    ev.preventDefault();
    // address and shopping cart products

    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          cartProducts
        })
      }).then(async (response: any) => {
        if (response.ok) {
          // resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Redirecting to payment...',
      error: 'Something went wrong... Please try again later'
    });
  };

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <Box className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </Box>
      <Grid className="mt-8 grid gap-8 grid-cols-2">
        <Box>
          {cartProducts?.length === 0 && (
            <Text>No products in your shopping cart</Text>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product: any, index: number) => (
              <CartProduct
                key={index}
                product={product}
                onRemove={() => removeCartProduct(index)}
              />
            ))}
          <Box className="py-2 pr-16 flex justify-end items-center">
            <Box className="text-gray-500">
              <Text>Subtotal:</Text>
              <br />
              <Text> Delivery:</Text>
              <br />
              Total:
            </Box>
            <Box className="font-semibold pl-2 text-right">
              <Text>${subtotal}</Text>
              <br />
              <Text>$5</Text>
              <br />
              <Text>${subtotal + 5}</Text>
            </Box>
          </Box>
        </Box>
        <Box className="bg-gray-100 p-4 rounded-lg">
          <Text>Checkout</Text>
          <FormControl as="form" onSubmit={proceedToCheckout}>
            <AddressInputs info={user?.info!} />
            <Button mt={2} type="submit">
              Pay ${subtotal + 5}
            </Button>
          </FormControl>
        </Box>
      </Grid>
    </section>
  );
};

export default CartPage;
