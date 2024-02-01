import { cartProductPrice } from 'src/components/AppContext';
import Trash from 'src/components/icons/Trash';
import Image from 'next/image';

interface Props {
  product: any;
  onRemove?: () => void;
}
const CartProduct = (props: Props) => {
  const { product, onRemove } = props;
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="w-24">
        <Image width={240} height={240} src={product.image} alt={''} />
      </div>
      <div className="grow">
        <h3 className="font-semibold">{product.name}</h3>
        {product.size && (
          <div className="text-sm">
            Size: <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map((extra: any) => (
              <div key={extra.name}>
                {extra.name} ${extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">${cartProductPrice(product)}</div>
      {!!onRemove && (
        <div className="ml-2">
          <button type="button" className="p-2" onClick={onRemove}>
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
};

export default CartProduct;
