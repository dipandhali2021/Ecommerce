import { onAuthStateChanged } from "firebase/auth";
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/protected-route";
import { auth } from "./firebase";
import { getUser } from "./redux/api/userAPI";
import { userExists, userNotExists } from "./redux/reducer/userReducer";
import { RootState } from "./redux/store";
import Footer from "./components/Footer";




const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Search = lazy(() => import("./pages/Search"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const NotFound = lazy(() => import("./pages/Notfound"));
const Checkout = lazy(() => import("./pages/Checkout"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Categories = lazy(() => import("./pages/Categories"));

//admin
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);

const App = () => {
  const { user, loading } = useSelector(
    (state: RootState) => state.userReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExists(data.user));
      } else {
        dispatch(userNotExists());
      }
    });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Router>
      <Header user={user} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          {/* no logged in route */}
          <Route
            path="/register"
            element={
              <ProtectedRoute isAuthenticated={!user ? true : false}>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={!user ? true : false}>
                <Login />
              </ProtectedRoute>
            }
          />
          {/* Logged In User Routes */}
          <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/pay" element={<Checkout />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/categories/:category" element={<Categories />} />
            
          </Route>
          {/* admin routes */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                adminRoute={true}
                isAdmin={user?.role === "admin" ? true : false}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Products />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            {/* Charts */}
            <Route path="/admin/chart/bar" element={<Barcharts />} />
            <Route path="/admin/chart/pie" element={<Piecharts />} />
            <Route path="/admin/chart/line" element={<Linecharts />} />
            {/* Apps */}
            <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/toss" element={<Toss />} />

            {/* Management */}
            <Route path="/admin/product/new" element={<NewProduct />} />

            <Route path="/admin/product/:id" element={<ProductManagement />} />

            <Route
              path="/admin/transaction/:id"
              element={<TransactionManagement />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
