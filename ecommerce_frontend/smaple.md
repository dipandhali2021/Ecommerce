import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../../types/reducer-types";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productAPI";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { server } from "../../../redux/store";
import { Skeleton } from "../../../components/Loader";
import { responseToast } from "../../../utils/features";

const Productmanagement = () => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );

  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useProductDetailsQuery(params.id!);

  const { photo, name, price, stock, category, description } =
    data?.product || {
      photo: "",
      name: "",
      price: 0,
      stock: 0,
      description: "",
      category: "",
    };

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [descriptionUpdate, setDescriptionUpdate] =
    useState<string>(description);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [photoFile, setPhotoFile] = useState<File[]>([]);
  const [photoUpdate, setPhotoUpdate] = useState<string[]>([]);
  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    const allFiles: File[] = [];
    const allFilePrevs: string[] = [];

    if (files) {
      const promises = Array.from(files).map((file, index) => {
        return new Promise((resolve, reject) => {
          const reader: FileReader = new FileReader();

          reader.readAsDataURL(file);
          reader.onloadend = () => {
            if (typeof reader.result === "string") {
              allFilePrevs[index] = reader.result;
              allFiles[index] = file;
              resolve(null);
            } else {
              reject();
            }
          };
        });
      });

      Promise.all(promises).then(() => {
        setPhotoUpdate(allFilePrevs);
        setPhotoFile(allFiles);
      });
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (nameUpdate) formData.set("name", nameUpdate);
    if (priceUpdate) formData.set("price", String(priceUpdate));
    if (stockUpdate !== undefined) formData.set("stock", String(stockUpdate));
    if (categoryUpdate) formData.set("category", categoryUpdate);
    if(descriptionUpdate) formData.set("description",descriptionUpdate);
    if (photoFile) {
      photoFile.forEach((photo) => {
        formData.append("photo", photo);
      });
    }

    const res = await updateProduct({
      formData,
      userId: user?._id!,
      productId: data?.product._id!,
    });
    responseToast(res, navigate, "/admin/product");
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user?._id!,
      productId: data?.product._id!,
    });
    responseToast(res, navigate, "/admin/product");
  };

  useEffect(() => {
    setNameUpdate(data?.product.name!);
    setPriceUpdate(data?.product.price!);
    setStockUpdate(data?.product.stock!);
    setCategoryUpdate(data?.product.category!);
  }, [data]);

  if (isError) return <Navigate to="/404" />;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <section>
              <strong>{data?.product._id}</strong>
              <img src={`${server}/${photo[0]}`} alt="Product" />
              <p>{name}</p>
              {stock > 0 ? (
                <span className="green">{stock} Available</span>
              ) : (
                <span className="red"> Not Available</span>
              )}
              <h3>₹{price}</h3>
            </section>
            <article>
              <button className="product-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <form onSubmit={submitHandler}>
                <h2>Manage</h2>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Description</label>
                  <input
                    type="text"
                    placeholder="Description"
                    value={descriptionUpdate}
                    onChange={(e) => setDescriptionUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label>Category</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                  />
                </div>

                <div>
                  <label>Photo</label>
                  <input type="file" multiple onChange={changeImageHandler} />
                </div>
                <div>
                  {photoUpdate.map((photoUpdate, index) => (
                    <img key={index} src={photoUpdate} alt="preview" />
                  ))}
                </div>

                <button type="submit">Update</button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default Productmanagement;
