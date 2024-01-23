import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/Loader";
import ProductCard from "../components/product-card";
import {
  useAllcategoriesQuery,
  useLatestProductsQuery,
} from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import {
  MdOutlinePhoneIphone,
  MdOutlineComputer,
  MdOutlineCameraAlt,
  MdOutlineHeadphones,
  MdVideogameAsset,
} from "react-icons/md";
import { FaTabletScreenButton } from "react-icons/fa6";
import { BsSmartwatch } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerServiceLine } from "react-icons/ri";
import { GoShieldCheck } from "react-icons/go";
import { useEffect } from "react";
import { CustomError } from "../types/api-types";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
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

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,es,fr,de,ja,ko,ru,ar",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      var addScript = document.createElement("script");
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      addScript.setAttribute("id", "google-translate-script");
      document.body.appendChild(addScript);
    }

    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

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
          {!loadingCategories &&
            categoriesResponse?.categories.map((i) => (
              <Link to={`/categories/${i}`}>{i.toLocaleUpperCase()}</Link>
            ))}
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
              photo={i.photo[0]}
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

        <Link to="/categories/gaming">
          <MdVideogameAsset />
          Gaming
        </Link>

        <Link to="/categories/tablet">
          <FaTabletScreenButton />
          Tablet
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
              photo={i.photo[0]}
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
              photo={i.photo[0]}
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
