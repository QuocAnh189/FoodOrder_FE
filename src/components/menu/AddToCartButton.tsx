// import FlyingButton from 'react-flying-item';

interface Props {
  hasSizesOrExtras: boolean;
  onClick: () => void;
  basePrice: number;
  image: string;
}
const AddToCartButton = (props: Props) => {
  const { hasSizesOrExtras, onClick, basePrice, image } = props;
  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent mt-4">
        {/* <FlyingButton targetTop={'5%'} targetLeft={'95%'} src={image}> */}
          <div onClick={onClick}>Add to cart ${basePrice}</div>
        {/* </FlyingButton> */}
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2"
    >
      <span>Add to cart (from ${basePrice})</span>
    </button>
  );
};

export default AddToCartButton;
