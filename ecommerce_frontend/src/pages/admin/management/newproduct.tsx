import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";
import toast from "react-hot-toast";

const NewProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [uploading, setUploading] = useState<boolean>(false);

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
    setUploading(true);
    if (!photos.length || !price || stock < 0 || !category || !name)
      return toast.error("Please Fill All The Fields");
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", String(price));
    formData.set("stock", String(stock));
    formData.set("category", category);
    formData.set("description", description);
    photos.forEach((photo) => {
      formData.append("photo", photo);
    });
    const res = await newProdut({ id: user?._id!, formData });
    responseToast(res, navigate, "/admin/product");
    setUploading(false);
  };
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <h2>New Product</h2>
        <article>
          <form id="new-product-form" onSubmit={submitHandler}>
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
            <main>
              <label className="upload-photo" htmlFor="file-upload">
                Upload Photo
              </label>
              <input
                id="file-upload"
                style={{ display: "none" }}
                form="new-product-form"
                required
                type="file"
                multiple
                onChange={changeImageHandler}
              />
              <button type="submit">
                {uploading ? "Uploading..." : "Create"}
              </button>
            </main>
            <p>Upload Maximum 4 Photos of the Product</p>
          </form>

          <div>
            <div>
              {photoPrevs.map((photoPrev, index) => (
                <img key={index} src={photoPrev} alt="preview" />
              ))}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
