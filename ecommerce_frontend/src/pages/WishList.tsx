import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Skeleton } from "../components/Loader";
import ProductCard from "../components/product-card";
import { WishlistItem } from "../types/types";
import toast from "react-hot-toast";
import { addToCart } from "../redux/reducer/cartReducer";
import { removeFromWishlist } from "../redux/reducer/wishlistReducer";

const WishList = () => {
  const dispatch = useDispatch();
  const { loading, wishlist } = useSelector(
    (state: RootState) => state.wishlistReducer
  );
  const addToCartHandler = (wishlist: WishlistItem) => {
    if (wishlist?.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart({ ...wishlist, quantity: wishlist.quantity }));
    toast.success("Added to Cart");
  };
  const remove = (wishlist: WishlistItem) => {
    dispatch(removeFromWishlist(wishlist.productId));
    toast.error("Removed from Whislist");
  };

  if (wishlist.length == 0)
    return <h1 className="heading margin">No Wishlist Items Selected</h1>;
  return (
    <div className="wishlist">
      {loading ? (
        <Skeleton />
      ) : (
        wishlist.map((i: WishlistItem) => {
          return (
            <ProductCard
              productId={i.productId}
              name={i.name}
              photo={i.photo}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
              wishHandler={remove}
            />
          );
        })
      )}
    </div>
  );
};

export default WishList;
