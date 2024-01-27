import { Link, Navigate, useParams } from "react-router-dom";
import { Skeleton } from "../components/Loader";
import { useOrderDetailsQuery } from "../redux/api/orderAPI";
import { Order, OrderItem } from "../types/types";

const defaultData: Order = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },

  status: "",
  subtotal: 0,
  discount: 0,
  shippingCharge: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: {
    name: "",
    _id: "",
  },
  _id: "",
};

const OrderDetails = () => {
  const param = useParams();

  const { data, isLoading, isError } = useOrderDetailsQuery(param.id!);

  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    user: { name },
    shippingCharge,
    status,
    tax,
    subtotal,
    total,
    discount,
  } = data?.order || defaultData;

  if (isError) return <Navigate to="/*" />;

  return (
    
    <div className="order-user-details">
      {isLoading ? (
        <Skeleton length={20} />
      ) : (
        <>
          <div className="order-info-card"
          
          >
            <h2>Order Items</h2>

            {orderItems.map((i) => (
              <ProductCard
                key={i._id}
                name={i.name}
                photo={i.photo}
                productId={i.productId}
                _id={i._id}
                quantity={i.quantity}
                price={i.price}
              />
            ))}
          </div>

          <div className="address-info-card">
            <h1>Order Info</h1>
            <h5>User Info</h5>
            <p>Name: {name}</p>
            <p>
              Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
            </p>
            <h5>Amount Info</h5>
            <p>Subtotal: ₹{subtotal}</p>
            <p>Shipping Charges: ₹{shippingCharge}</p>
            <p>Tax: ₹{tax}</p>
            <p>Discount: ₹{discount}</p>
            <p>Total: ₹{total}</p>

            <h5>Status Info</h5>
            <p>
              Status:{" "}
              <span
                className={
                  status === "Delivered"
                    ? "purple"
                    : status === "Shipped"
                    ? "green"
                    : "red"
                }
              >
                {status}
              </span>
            </p>
      
          </div>
        </>
      )}
    </div>
  );
};

const ProductCard = ({
  name,
  photo,
  price,
  quantity,
  productId,
}: OrderItem) => (
  <div className="transaction-product-card">
    <img src={photo} alt={name} />
    <Link to={`/product/${productId}`}>{name}</Link>
    <span>
      ₹{price} X {quantity} = ₹{price * quantity}
    </span>
  </div>
);

export default OrderDetails;
