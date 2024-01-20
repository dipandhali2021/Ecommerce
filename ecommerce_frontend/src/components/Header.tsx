import { useState } from "react";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign out successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Failed");
    }
  };

  return (
    <nav className="header">
      <Link className="logo"  to={"/"}>Ecommerce</Link>

      <div className="navigation">
        <Link to={"/"}>Home</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/about"}>About</Link>
      </div>

      <Link to={"/search"}>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="What are you looking for?"
          />

          <FaSearch />
        </div>
      </Link>

      <div className="account">
        <Link to={"/wishlist"}>
          <MdOutlineFavoriteBorder />
        </Link>
        <Link to={"/cart"}>
          <FaShoppingBag />
        </Link>
        {user?._id ? (
          <>
            <button onClick={() => setIsOpen((prev) => !prev)}>
              <FaUser />
            </button>
            <dialog open={isOpen}>
              <div>
                {user.role === "admin" && (
                  <Link
                    onClick={() => setIsOpen(false)}
                    to={"/admin/dashboard"}
                  >
                    Admin
                  </Link>
                )}

                <Link onClick={() => setIsOpen(false)} to={"/orders"}>
                  Orders
                </Link>
                <button onClick={logoutHandler}>
                  <FaSignOutAlt />
                </button>
              </div>
            </dialog>
          </>
        ) : (
          <Link onClick={() => setIsOpen(false)} to={"/login"}>
            <FaSignInAlt />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
