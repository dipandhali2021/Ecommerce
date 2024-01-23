import { useParams } from "react-router-dom";
import { useSearchProductsQuery } from "../redux/api/productAPI";
import { Skeleton } from "../components/Loader";
import ProductCard from "../components/product-card";
import { CartItem } from "../types/types";
import toast from "react-hot-toast";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";

const Categories = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { isLoading: productLoading, data: categoryData } =
    useSearchProductsQuery({
      category: params.category || "",
      price: 0,
      page: 1,
      search: "",
      sort: "",
    });

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem?.stock < cartItem.quantity) return toast.error("Out of Stock");
    dispatch(addToCart({ ...cartItem }));
    toast.success("Added to Cart");
  };

  return (
    <>
      {categoryData?.products?.length! > 0 ? (
        <>
          <h1 className="heading">{params.category}</h1>

          <div className="categories">
            {productLoading ? (
              <Skeleton width="80vw" />
            ) : (
              categoryData?.products?.map((i) => (
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
          </div>
        </>
      ) : (
        <h1 className="heading" style={{
            padding: "10rem",
        }}>No item found</h1>
      )}
    </>
  );
};

export default Categories;
