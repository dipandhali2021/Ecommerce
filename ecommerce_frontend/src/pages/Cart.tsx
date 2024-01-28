import { FormEvent, ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";
import { useApplyCouponQuery } from "../redux/api/couponAPI";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/store";
import { CartItem } from "../types/types";
import axios from "axios";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  quantity: ReactElement;
  subtotal: number;
  remove: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Subtotal",
    accessor: "subtotal",
  },
  {
    Header: "Remove",
    accessor: "remove",
  },
];
const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, tax, subtotal, shippingCharge, discount, total } =
    useSelector((state: RootState) => state.cartReducer);
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return toast.error("Out of Stock");
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return toast.error("Minimum Quantity is 1");

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const remove = (productId: string) => {
    dispatch(removeCartItem(productId));
    toast.error("Removed from Cart");
  };

  const [rows, setRows] = useState<DataType[]>([]);
  useEffect(() => {
    if (cartItems)
      setRows(
        cartItems.map((i: CartItem) => ({
          photo: <img src={i.photo} />,
          name: i.name,
          price: i.price,
          quantity: (
            <div className="quantity">
              <button onClick={() => decrementHandler(i)}>
                <FaMinus />
              </button>
              <p>{i.quantity}</p>
              <button onClick={() => incrementHandler(i)}>
                <FaPlus />
              </button>
            </div>
          ),
          subtotal: i.price * i.quantity,
          remove: (
            <div className="remove">
              <button onClick={() => remove(i.productId)}>
                <MdDelete />
              </button>
            </div>
          ),
        }))
      );
  }, [cartItems]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "cart-item-heading",
    "Cart",
    rows.length > 6
  )();

  useEffect(() => {
    const { token, cancel } = axios.CancelToken.source();

    const timeOutId = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken: token,
        })
        .then((res): void => {
          dispatch(discountApplied(res.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch((): void => {
          dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
      setIsValidCouponCode(false);
      cancel();
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <div className="cart-items">
      <main>{cartItems.length > 0 ? Table : <h1>No Items Added</h1>}</main>
      <Link to={"/search"}>Return to Shop</Link>
      <div className="total">
        <div className="left">
          <div className="coupon">
            <input
              placeholder="Coupon Code"
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
  
              <h3>Apply Coupon</h3>
     
          </div>
          {couponCode &&
            (isValidCouponCode ? (
              <span className="green">
                {discount} off using the <code>{couponCode}</code>
              </span>
            ) : (
              <span className="red">
                Invalid Coupon <VscError />{" "}
              </span>
            ))}
        </div>

        <aside>
          <h3>Cart Total</h3>
          <div>
            <span>Subtotal:</span>
            <span>₹{subtotal}</span>
          </div>
          <div>
            <span>Shipping Charges :</span>
            <span>₹{shippingCharge}</span>
          </div>
          <div>
            <span>Tax :</span>
            <span>₹{tax}</span>
          </div>
          <div>
            <span>Discount :</span>
            <span className="red"> - ₹{discount}</span>
          </div>
          <div>
            <span>Total :</span>
            <span>₹{total}</span>
          </div>

          {cartItems.length > 0 && (
            <Link to={"/shipping"}>Process to Checkout</Link>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Cart;
