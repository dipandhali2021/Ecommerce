import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { TbTruckDelivery, TbTruckReturn } from "react-icons/tb";
import { TiStarFullOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "../components/Loader";
import {
  useProductDetailsQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { server } from "../redux/store";
import { CartItem } from "../types/types";
import ProductCard from "../components/product-card";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useProductDetailsQuery(params.id!);

  const { photo, name, price, stock, category, description, _id } =
    data?.product || {
      photo: [],
      name: "",
      price: 0,
      stock: 0,
      category: "",
      description: "",
    };
  const { isLoading: productLoading, data: searchData } =
    useSearchProductsQuery({
      category,
      price: 0,
      page: 1,
      search: "",
      sort: "",
    });

  const dispatch = useDispatch();
  // const { cartItems } = useSelector((state: RootState) => state.cartReducer);

  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    setMainImage(photo[0]);
  }, [photo]);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem?.stock < quantity) return toast.error("Out of Stock");
    dispatch(
      addToCart({ ...cartItem, quantity: quantity })
    );
    toast.success("Added to Cart");
  };
  const buyNowHandler = (cartItem: CartItem) => {
    if (cartItem?.stock < quantity) return toast.error("Out of Stock");
    dispatch(
      addToCart({ ...cartItem, quantity: quantity })
    );
    navigate("/cart");
  };

  if (isError) toast.error("Cannot Fetch the Products");
  return (
    <div className="product-page">
      <div className="product">
        {isLoading ? (
          <Skeleton length={23} />
        ) : (
          <>
            <div className="product-images">
              <div className="all-images">
                {photo.map((p) => {
                  return (
                    <img
                      src={`${server}/${p}`}
                      alt={name}
                      onClick={() => setMainImage(p)}
                    />
                  );
                })}
              </div>
              <div className="live-image">
                <img src={`${server}/${mainImage}`} alt={name} />
              </div>
            </div>
            <div className="product-details">
              <h1>{name}</h1>
              <div>
                <div className="rating">
                  <TiStarFullOutline />
                  <TiStarFullOutline />
                  <TiStarFullOutline />
                  <TiStarFullOutline />
                  <TiStarFullOutline />
                </div>
                <p>(78 Reviews)</p>

                <div>
                  {stock > 0 ? (
                    <span className="green">In Stock</span>
                  ) : (
                    <span className="red">Out of Stock</span>
                  )}
                </div>
              </div>

              <h2>₹{price}</h2>
              <span>{description}</span>

              <div>
                <div className="quantity">
                  <button onClick={decrementQuantity}>
                    <FaMinus />
                  </button>
                  <p>{quantity}</p>
                  <button onClick={incrementQuantity}>
                    <FaPlus />
                  </button>
                </div>

                <button
                  onClick={() =>
                    buyNowHandler({
                      productId: params.id!,
                      name,
                      price,
                      stock,
                      photo: photo[0],
                      quantity,
                    })
                  }
                  disabled={stock < 1}
                >
                  Buy Now
                </button>
                <span>
                  <MdFavoriteBorder />
                </span>
              </div>

              <aside>
                <div>
                  <TbTruckDelivery />
                  <p>Free Delivery over $1000</p>
                </div>

                <div>
                  <TbTruckReturn />
                  <p> Return Delivery</p>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
      {searchData?.products.length! > 1 ?(<h3>Related Items</h3>):""}
      {productLoading ? (
        <Skeleton length={10} />
      ) : (
        <div className="search-product-list">
          {searchData?.products
            .filter((i) => i._id !== _id)
            .map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photo={i.photo[0]}
              />
            ))}
            
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
