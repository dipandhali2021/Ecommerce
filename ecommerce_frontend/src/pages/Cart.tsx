import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/cart-item";
import { addToCart, calculatePrice, removeCartItem } from "../redux/reducer/cartReducer";
import { cartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";

const Cart = () => {
  const dispatch = useDispatch();
  const {
    cartItems,
    tax,
    subtotal,
    shippingCharge: shippingCharges,
    discount,
    total,
  } = useSelector(
    (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
  );
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

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (Math.random() > 0.5) {
        setIsValidCouponCode(true);
      } else {
        setIsValidCouponCode(false);
      }
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
      setIsValidCouponCode(false);
    };
  }, [couponCode]);


  useEffect(()=>{
    dispatch(calculatePrice())
  },[cartItems])


  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <CartItemCard
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              remove={remove}
              key={idx}
              cartItem={i}
            />
          ))
        ) : (
          <h1>No Items Added</h1>
        )}
      </main>
      <aside>
        <p>Subtotal:₹{subtotal}</p>
        <p>Shipping Charges : ₹{shippingCharges}</p>
        <p>Tax : ₹{tax}</p>
        <p>
          Discount : <em className="red"> - ₹{discount}</em>
        </p>
        <p>
          <b>Total : ₹{total}</b>
        </p>

        <input
          placeholder="Coupon Code"
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />

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

        {cartItems.length > 0 && <Link to={"/shipping"}>Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
