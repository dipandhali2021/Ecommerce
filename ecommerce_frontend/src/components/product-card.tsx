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

  

  return (
    <div className="product-card">
      <div className="back">
        <div className="off">
          <p>-50%</p>
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

          <p>(78)</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
