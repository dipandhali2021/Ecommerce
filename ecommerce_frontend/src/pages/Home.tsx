import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";

const Home = () => {
  const addToCartHandler = () => {}

  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to={"/search"} className="findmore">
          More
        </Link>
      </h1>

      <main>
        <ProductCard
          productId="awdwfwf"
          name="mackbook"
          price={4545}
          stock={243}
          handler={addToCartHandler}
          photo="https://m.media-amazon.com/images/I/51G0815SGQL.jpg"
        />
      </main>
    </div>
  );
};

export default Home;
