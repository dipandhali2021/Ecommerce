import { TiStarFullOutline } from "react-icons/ti";
import { server } from "../redux/store";
import { CartItem } from "../types/types";
import { MdFavoriteBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
type ProductCardProps = {
  productId: string;
  photo: string[];
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}: ProductCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="product-card">
      <div className="back">
        <div className="off">
          <p>-50%</p>
          <MdFavoriteBorder />
        </div>

        <img
          src={`${server}/${photo[0]}`}
          alt={name}
          onClick={() => navigate(`/product/${productId}`)}
        />
        <button
          onClick={() =>
            handler({
              productId,
              photo,
              name,
              price,
              stock,
              quantity: 1,
            })
          }
        >
          Add To Cart
        </button>
        <p>{name}</p>

        <span>₹{price}</span>
        <div className="rating">
          <TiStarFullOutline />
          <TiStarFullOutline />
          <TiStarFullOutline />
          <TiStarFullOutline />
          <TiStarFullOutline />

          <p>(78)</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
