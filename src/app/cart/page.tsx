'use client';
import { useContext, useEffect, useState } from 'react';

//components
import { CartContext, cartProductPrice } from 'src/components/AppContext';
import Trash from 'src/components/icons/Trash';

//icons
import AddressInputs from 'src/components/layout/AddressInputs';
import SectionHeaders from 'src/components/layout/SectionHeaders';
import CartProduct from 'src/components/menu/CartProduct';

//toast
import toast from 'react-hot-toast';

export default function CartPage() {
  // const {cartProducts,removeCartProduct} = useContext(CartContext);
  const cartProducts: any = [];
  const [address, setAddress] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed 😔');
      }
    }
  }, []);

  // useEffect(() => {
  //   if (profileData?.city) {
  //     const {phone, streetAddress, city, postalCode, country} = profileData;
  //     const addressFromProfile = {
  //       phone,
  //       streetAddress,
  //       city,
  //       postalCode,
  //       country
  //     };
  //     setAddress(addressFromProfile);
  //   }
  // }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }
  function handleAddressChange(propName: any, value: any) {
    setAddress(prevAddress => ({ ...prevAddress, [propName]: value }));
  }
  async function proceedToCheckout(ev: any) {
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
  }

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
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product: any, index: any) => (
              <CartProduct key={index} product={product} onRemove={() => {}} />
            ))}
          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-500">
              Subtotal:
              <br />
              Delivery:
              <br />
              Total:
            </div>
            <div className="font-semibold pl-2 text-right">
              ${subtotal}
              <br />
              $5
              <br />${subtotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              phone="0702465814"
              streetAddress="O dau ke me tao"
              postalCode="123456"
              city="Thu Duc City"
              country="VietNam"
              setAddressProp={handleAddressChange}
              disabled={false}
            />
            <button type="submit">Pay ${subtotal + 5}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
