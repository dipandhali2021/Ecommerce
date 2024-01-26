import { FaCircleMinus } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import { TiStarFullOutline } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";
import { server } from "../redux/store";
import { CartItem, WishlistItem } from "../types/types";
type ProductCardProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
  wishHandler: (wishlistItem: WishlistItem) => string | undefined | void;
};

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,

  handler,
  wishHandler,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const generateDiscount = () => {
    const min = 10;
    const max = 50;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const generateReviews = () => {
    const min = 10;
    const max = 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div className="product-card">
      <div className="back">
        <div className="off">
          <p>-{generateDiscount()}%</p>
          <div
            onClick={() =>
              wishHandler({
                productId,
                photo,
                name,
                price,
                stock,
                quantity: 1,
              })
            }
          >
            {pathname == "/wishlist" ? <FaCircleMinus /> : <MdFavoriteBorder />}
          </div>
        </div>

        <img
          src={`${server}/${photo}`}
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

          <p>({generateReviews()})</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
