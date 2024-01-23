import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";

const NewProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [description,setDescription]=useState<string>("")
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);

  const [newProdut] = useNewProductMutation();

  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPrevs, setPhotoPrevs] = useState<string[]>([]);
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
        setPhotoPrevs(allFilePrevs);
        setPhotos(allFiles);
      });
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!photos.length || !price || stock < 0 || !category || !name) return;
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", String(price));
    formData.set("stock", String(stock));
    formData.set("category", category);
    formData.set("description",description);
    photos.forEach((photo) => {
      formData.append("photo", photo);
    });
    const res = await newProdut({ id: user?._id!, formData });
    responseToast(res, navigate, "/admin/product");
  };
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                required
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="eg. laptop, camera etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input
                required
                type="file"
                multiple
                onChange={changeImageHandler}
              />
            </div>

            <div>
              {photoPrevs.map((photoPrev, index) => (
                <img key={index} src={photoPrev} alt="preview" />
              ))}
            </div>
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
