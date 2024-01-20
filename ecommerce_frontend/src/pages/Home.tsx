import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/Loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem?.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity }));
    toast.success("Added to Cart");
  };

  if (isError) toast.error("Cannot Fetch the Products");
  return (
    <div className="home">
      <div className="hero-banner">
        <div className="banner">
          <Link to="/categories">Woman's Fashion</Link>
          <Link to="/categories">Men's Fashion</Link>
          <Link to="/categories">Electronics</Link>
          <Link to="/categories">Home & Lifestyle</Link>
          <Link to="/categories">Medicine</Link>
          <Link to="/categories">Sports & Outdoor</Link>
          <Link to="/categories">Baby's & Toys</Link>
          <Link to="/categories">Groceries & Pets</Link>
          <Link to="/categories">Health & Beauty</Link>
        </div>
        

        <section></section>
      </div>
      <h1>
        Latest Products
        <Link to={"/search"} className="findmore">
          More
        </Link>
      </h1>

      <main>
        {isLoading ? (
          <Skeleton width="80vw" />
        ) : (
          data?.products?.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
              photo={i.photo}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
