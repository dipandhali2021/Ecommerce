import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/Loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import {
  MdOutlinePhoneIphone,
  MdOutlineComputer,
  MdOutlineCameraAlt,
  MdOutlineHeadphones,
  MdVideogameAsset,
} from "react-icons/md";
import { BsSmartwatch } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerServiceLine } from "react-icons/ri";
import { GoShieldCheck } from "react-icons/go";

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

      <h1>
        Browse By Category
        <Link to={"/categories"} className="findmore">
          More
        </Link>
      </h1>
      <div className="categories-box">
        <Link to="/categories">
          <MdOutlinePhoneIphone />
          Phone
        </Link>
        <Link to="/categories">
          <MdOutlineComputer />
          Computer
        </Link>
        <Link to="/categories">
          <BsSmartwatch />
          SmartWatch
        </Link>
        <Link to="/categories">
          <MdOutlineCameraAlt />
          Camera
        </Link>
        <Link to="/categories">
          <MdOutlineHeadphones />
          HeadPhone
        </Link>

        <Link to="/categories">
          <MdVideogameAsset />
          Gaming
        </Link>
        <Link to="/categories">
          <MdOutlineCameraAlt />
          Camera
        </Link>
      </div>
      <h1>
        Best Selling Products
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

      <section className="categoriesB"></section>
      <h1>
        Explore Our Products
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

      <h1>New Arrivals</h1>
      <div className="new-arrivals-container">
        <div className="ps"></div>
        <div className="other">
          <div className="hat"></div>
          <div className="down">
            <div className="speaker"></div>
            <div className="perfume"></div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="delivery ">
          <div className="feature-icons">
            <TbTruckDelivery />
          </div>
          <div className="details">
            <h3>Free Delivery</h3>
            <p>Free Shipping on all order</p>
          </div>
        </div>
        <div className="delivery ">
          <div className="feature-icons">
            <RiCustomerServiceLine />
          </div>
          <div className="details">
            <h3>Customer Support</h3>
            <p>24/7 Customer Support</p>
          </div>
        </div>
        <div className="delivery ">
          <div className="feature-icons">
            <GoShieldCheck />
          </div>
          <div className="details">
            <h3>Secure Payment</h3>
            <p>100% Secure Payment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
