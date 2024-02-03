import toast from "react-hot-toast";
import { BsSmartwatch } from "react-icons/bs";
import { FaTabletScreenButton } from "react-icons/fa6";
import { GoShieldCheck } from "react-icons/go";
import {
  MdOutlineCameraAlt,
  MdOutlineComputer,
  MdOutlineHeadphones,
  MdOutlinePhoneIphone
} from "react-icons/md";
import { RiCustomerServiceLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/Loader";
import ProductCard from "../components/product-card";
import {
  useAllcategoriesQuery,
  useBestSellingProductsQuery,
  useLatestProductsQuery,
} from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { addToWishlist } from "../redux/reducer/wishlistReducer";
import { CustomError } from "../types/api-types";
import { CartItem, WishlistItem } from "../types/types";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  const {
    data: bestSellingData,
    isLoading: bestSellingLoading,
    isError: bestSellingError,
  } = useBestSellingProductsQuery("");
  const dispatch = useDispatch();

  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError: productIsError,
    error: productError,
  } = useAllcategoriesQuery("");

  if (productIsError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem?.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity }));
    toast.success("Added to Cart");
  };

  const addtoWishlistHandler = (wishlistItem: WishlistItem) => {
    if (wishlistItem?.stock < 1) return toast.error("Out of Stock");
    dispatch(
      addToWishlist({ ...wishlistItem, quantity: wishlistItem.quantity })
    );
    toast.success("Added to Wishlist");
  };

  if (isError) toast.error("Cannot Fetch the Products");
  if (bestSellingError) toast.error("Cannot Fetch the Products");
  return (
    <div className="home">
      <div className="hero-banner">
        <div className="banner">
          {!loadingCategories &&
            categoriesResponse?.categories.map((i) => (
              <Link to={`/categories/${i}`}>{i.toLocaleUpperCase()}</Link>
            ))}
        </div>

        <section>
          <Carousel
            autoPlay
            interval={10000}
            infiniteLoop
            useKeyboardArrows
            dynamicHeight
            showThumbs={false}
            showStatus={false}
          >
            <div>
              <img
                src="https://res.cloudinary.com/da9skd1ks/image/upload/v1706444003/ecommerce-assets/aluk049x4ru3wqtajnq5.png"
                alt="Image 1"
              />
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/da9skd1ks/image/upload/v1706444003/ecommerce-assets/aluk049x4ru3wqtajnq5.png"
                alt="Image 2"
              />
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/da9skd1ks/image/upload/v1706444003/ecommerce-assets/aluk049x4ru3wqtajnq5.png"
                alt="Image 3"
              />
            </div>
          </Carousel>
        </section>
      </div>
      {data?.products.length == 0 ? (
        <h1> * Add Products to see Latest Products</h1>
      ) : (
        <h1>
          Latest Products
          <Link to={"/search"} className="findmore">
            More
          </Link>
        </h1>
      )}

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
              photo={i.photo[0]}
              wishHandler={addtoWishlistHandler}
            />
          ))
        )}
      </main>

      <h1>Browse By Category</h1>
      <div className="categories-box">
        <Link to="/categories/phone">
          <MdOutlinePhoneIphone />
          Phone
        </Link>
        <Link to="/categories/laptop">
          <MdOutlineComputer />
          Laptop
        </Link>
        <Link to="/categories/watch">
          <BsSmartwatch />
          SmartWatch
        </Link>
        <Link to="/categories/camera">
          <MdOutlineCameraAlt />
          Camera
        </Link>
        <Link to="/categories/headphone">
          <MdOutlineHeadphones />
          HeadPhone
        </Link>

        <Link to="/categories/tablet">
          <FaTabletScreenButton />
          Tablet
        </Link>
      </div>
      {bestSellingData?.products.length == 0 ? (
        <h1> * No Best Selling Products till now</h1>
      ) : (
        <h1>
          Best Selling Products
          <Link to={"/search"} className="findmore">
            More
          </Link>
        </h1>
      )}
      <main>
        {bestSellingLoading ? (
          <Skeleton width="80vw" />
        ) : (
          bestSellingData?.products?.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
              photo={i.photo[0]}
              wishHandler={addtoWishlistHandler}
            />
          ))
        )}
      </main>

      <section>
        <Carousel
          autoPlay
          interval={10000}
          infiniteLoop
          useKeyboardArrows
          dynamicHeight
          showThumbs={false}
          showStatus={false}
        >
          <div>
            <img
              src="https://res.cloudinary.com/da9skd1ks/image/upload/v1706444003/ecommerce-assets/i5verxhvyrvjjgd9vnnx"
              alt="Image 1"
            />
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/da9skd1ks/image/upload/v1706444003/ecommerce-assets/i5verxhvyrvjjgd9vnnx"
              alt="Image 2"
            />
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/da9skd1ks/image/upload/v1706444003/ecommerce-assets/i5verxhvyrvjjgd9vnnx"
              alt="Image 3"
            />
          </div>
        </Carousel>
      </section>
      {data?.products.length == 0 ? (
        <h1> * Add Products to see Our Products</h1>
      ) : (
        <h1>
          Explore Our Products
          <Link to={"/search"} className="findmore">
            More
          </Link>
        </h1>
      )}

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
              photo={i.photo[0]}
              wishHandler={addtoWishlistHandler}
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
      <Services />
    </div>
  );
};

export default Home;

export const Services = () => {
  return (
    <>
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
    </>
  );
};
