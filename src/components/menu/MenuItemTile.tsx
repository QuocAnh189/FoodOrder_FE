import AddToCartButton from 'src/components/menu/AddToCartButton';

interface Props {
  onAddToCart: any;
  image: any;
  description: any;
  name: any;
  basePrice: any;
  sizes: any;
  extraIngredientPrices: any;
}

const MenuItemTile = (props: Props) => {
  const {
    onAddToCart,
    image,
    description,
    name,
    basePrice,
    sizes,
    extraIngredientPrices
  } = props;
  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngredientPrices?.length > 0;
  return (
    <div
      className="bg-gray-200 p-4 rounded-lg text-center
      group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all"
    >
      <div className="text-center">
        <img
          src={image}
          className="max-h-auto max-h-24 block mx-auto"
          alt="pizza"
        />
      </div>
      <h4 className="font-semibold text-xl my-3">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <AddToCartButton
        image={image}
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
      />
    </div>
  );
};

export default MenuItemTile;
