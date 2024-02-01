import AddToCartButton from 'src/components/menu/AddToCartButton';
import { IMenuItem } from 'src/interfaces';

interface Props {
  onAddToCart: () => void;
  menuItem: IMenuItem;
}

const MenuItemTile = (props: Props) => {
  const { onAddToCart, menuItem } = props;

  const { image, description, name, basePrice, sizes, extraIngredientPrices } =
    menuItem;

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
        image={image!}
        onClick={onAddToCart}
        basePrice={basePrice!}
      />
    </div>
  );
};

export default MenuItemTile;
