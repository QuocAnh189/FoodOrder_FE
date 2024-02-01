'use client';

import { useContext, useState } from 'react';
import { Box } from '@chakra-ui/react';

//components
import { CartContext } from 'src/components/AppContext';
import MenuItemTile from 'src/components/menu/MenuItemTile';

//next
import Image from 'next/image';

// import FlyingButton from "react-flying-item";
//interface
import { IExtraPrice, IMenuItem } from 'src/interfaces';

interface Props {
  menuItem: IMenuItem;
}

const MenuItem = (props: Props) => {
  const { menuItem } = props;
  const { image, name, description, basePrice, sizes, extraIngredientPrices } =
    menuItem;

  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState<IExtraPrice[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart }: any = useContext(CartContext);

  const handleAddToCartButtonClick = async () => {
    console.log('add to cart');
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtras);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('hiding popup');
    setShowPopup(false);
  };

  const handleExtraThingClick = (ev: any, extraThing: IExtraPrice) => {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras(prev => [...prev, extraThing]);
    } else {
      setSelectedExtras(prev => {
        return prev.filter((e: IExtraPrice) => e.name !== extraThing.name);
      });
    }
  };

  let selectedPrice = basePrice!;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra?.price;
    }
  }

  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={ev => ev.stopPropagation()}
            className="my-8 bg-white p-2 rounded-lg w-2/5"
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: 'calc(100vh - 100px)' }}
            >
              <Image
                src={image!}
                alt={name!}
                width={300}
                height={200}
                className="mx-auto"
              />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {sizes.map((size: IExtraPrice) => (
                    <label
                      key={size._id}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        type="radio"
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        name="size"
                      />
                      {size.name} ${basePrice! + size.price}
                    </label>
                  ))}
                </div>
              )}
              {extraIngredientPrices?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Any extras?</h3>
                  {extraIngredientPrices.map((extraThing: IExtraPrice) => (
                    <label
                      key={extraThing._id}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        type="checkbox"
                        onChange={ev => handleExtraThingClick(ev, extraThing)}
                        checked={selectedExtras
                          .map((e: IExtraPrice) => e?._id)
                          .includes(extraThing._id)}
                        name={extraThing.name}
                      />
                      {extraThing.name} +${extraThing.price}
                    </label>
                  ))}
                </div>
              )}
              {/* <FlyingButton
                targetTop={'5%'}
                targetLeft={'95%'}
                src={image}> */}

              <button
                type="button"
                onClick={handleAddToCartButtonClick}
                className="mt-4 bg-primary text-white rounded-full px-8 py-2"
              >
                Add to cart ${selectedPrice}
              </button>
              {/* </FlyingButton> */}
              <button className="mt-2 py-2" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile
        onAddToCart={() => setShowPopup(true)}
        menuItem={menuItem}
      />
    </>
  );
};

export default MenuItem;
