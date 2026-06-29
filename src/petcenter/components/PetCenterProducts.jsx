import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoWarningOutline } from "react-icons/io5";
import { ImCheckmark } from "react-icons/im";
import {
  addProductAPI,
  deleteProductAPI,
  getAllProductsAPI,
  updateProductAPI,
} from "../../services/allAPI";

const PetCenterProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [stockFilter, setStockFilter] = useState("All Stock Status");

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [productData, setProductData] = useState({
    image: "",
    name: "",
    description: "",
    price: "",
    category: "Food",
    stock: "",
    badge: "New",
    rating: 4.5,
    reviews: 0,
  });

  const loadProducts = async () => {
    const result = await getAllProductsAPI();

    if (result.status >= 200 && result.status < 300) {
      setProducts(result.data);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const resetForm = () => {
    setProductData({
      image: "",
      name: "",
      description: "",
      price: "",
      category: "Food",
      stock: "",
      badge: "New",
      rating: 4.5,
      reviews: 0,
    });

    setEditId(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    resetForm();
    setShowModal(false);
  };

  const getStockStatus = (stock) => {
    const count = Number(stock);

    if (count <= 0) return "Out of Stock";
    if (count <= 10) return "Low Stock";
    return "In Stock";
  };

  const getStockStyle = (stock) => {
    const status = getStockStatus(stock);

    if (status === "In Stock") return "bg-green-100 text-green-600";
    if (status === "Low Stock") return "bg-yellow-100 text-yellow-600";
    return "bg-red-100 text-red-500";
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchKey.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchKey.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchKey.toLowerCase());

    const matchesCategory =
      categoryFilter === "All Categories" ||
      product.category === categoryFilter;

    const matchesStock =
      stockFilter === "All Stock Status" ||
      getStockStatus(product.stock) === stockFilter;

    return matchesSearch && matchesCategory && matchesStock;
  });

  const totalProducts = products.length;

  const inStockProducts = products.filter(
    (product) => getStockStatus(product.stock) === "In Stock",
  ).length;

  const lowStockProducts = products.filter(
    (product) => getStockStatus(product.stock) === "Low Stock",
  ).length;

  const outOfStockProducts = products.filter(
    (product) => getStockStatus(product.stock) === "Out of Stock",
  ).length;

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const { image, name, description, price, category, stock } = productData;

    if (
      !image ||
      !name ||
      !description ||
      !price ||
      !category ||
      stock === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const finalProduct = {
      ...productData,
      price: productData.price.startsWith("₹")
        ? productData.price
        : `₹${productData.price}`,
      stock: Number(productData.stock),
      createdAt: new Date().toISOString(),
    };

    const result = await addProductAPI(finalProduct);

    if (result.status >= 200 && result.status < 300) {
      alert("Product added successfully");
      handleCloseModal();
      loadProducts();
    } else {
      alert("Failed to add product");
    }
  };

  const handleEditProduct = (product) => {
    setEditId(product.id);

    setProductData({
      image: product.image,
      name: product.name,
      description: product.description,
      price: product.price?.replace("₹", "") || "",
      category: product.category || "Food",
      stock: product.stock,
      badge: product.badge || "New",
      rating: product.rating || 4.5,
      reviews: product.reviews || 0,
    });

    setShowModal(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const { image, name, description, price, category, stock } = productData;

    if (
      !image ||
      !name ||
      !description ||
      !price ||
      !category ||
      stock === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const updatedProduct = {
      ...productData,
      price: productData.price.startsWith("₹")
        ? productData.price
        : `₹${productData.price}`,
      stock: Number(productData.stock),
    };

    const result = await updateProductAPI(editId, updatedProduct);

    if (result.status >= 200 && result.status < 300) {
      alert("Product updated successfully");
      handleCloseModal();
      loadProducts();
    } else {
      alert("Failed to update product");
    }
  };

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    const result = await deleteProductAPI(id);

    if (result.status >= 200 && result.status < 300) {
      alert("Product deleted successfully");
      loadProducts();
    } else {
      alert("Failed to delete product");
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-6 min-h-screen">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-3xl font-bold text-heading">Products</p>

          <p className="text-text font-semibold mt-2">
            Manage pet shop products for the user side
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition flex items-center gap-2"
        >
          + Add Product
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Search products by name..."
            className="w-full border border-gray-200 bg-white rounded-xl pl-11 pr-4 py-3 outline-none focus:border-primary font-semibold"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-200 bg-white rounded-xl px-4 py-3 outline-none font-semibold"
        >
          <option>All Categories</option>
          <option>Food</option>
          <option>Toys</option>
          <option>Grooming</option>
          <option>Accessories</option>
          <option>Health</option>
        </select>

        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="border border-gray-200 bg-white rounded-xl px-4 py-3 outline-none font-semibold"
        >
          <option>All Stock Status</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-5 mt-5">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-pink-card flex items-center justify-center">
            <HiOutlineShoppingBag className="text-primary text-3xl" />
          </div>

          <div>
            <p className="text-sm text-text font-semibold">Total Products</p>
            <p className="text-3xl font-bold">{totalProducts}</p>
            <p className="text-xs text-text font-semibold">
              All products listed
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <ImCheckmark className="text-green-600 text-3xl" />
          </div>

          <div>
            <p className="text-sm text-text font-semibold">In Stock</p>
            <p className="text-3xl font-bold">{inStockProducts}</p>
            <p className="text-xs text-text font-semibold">
              Products available
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
            <IoWarningOutline className="text-yellow-600 text-3xl" />
          </div>

          <div>
            <p className="text-sm text-text font-semibold">Low Stock</p>
            <p className="text-3xl font-bold">{lowStockProducts}</p>
            <p className="text-xs text-text font-semibold">Running low</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <MdClose className="text-red-500 text-3xl" />
          </div>

          <div>
            <p className="text-sm text-text font-semibold">Out of Stock</p>
            <p className="text-3xl font-bold">{outOfStockProducts}</p>
            <p className="text-xs text-text font-semibold">
              Currently unavailable
            </p>
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-4 gap-6 mt-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition"
            >
              <div className="relative bg-pink-bg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-contain p-6"
                />

                <span
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${getStockStyle(
                    product.stock,
                  )}`}
                >
                  {getStockStatus(product.stock)}
                </span>
              </div>

              <div className="p-4">
                <p className="font-bold text-heading">{product.name}</p>

                <p className="text-sm text-text mt-1 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-primary font-bold text-xl">
                    {product.price}
                  </p>

                  <p className="text-sm text-text font-semibold">
                    {product.stock} in stock
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="flex items-center justify-center gap-2 border border-gray-200 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    <FaPencilAlt />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="flex items-center justify-center gap-2 border border-red-300 text-red-500 py-2 rounded-lg font-semibold hover:bg-red-50 transition"
                  >
                    <FaRegTrashAlt />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl mt-8 border border-gray-100">
          <HiOutlineShoppingBag className="text-7xl text-gray-300 mx-auto mb-4" />
          <p className="text-xl font-bold">No Products Found</p>
          <p className="text-text mt-2">Added products will appear here.</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl shadow-xl max-h-[90vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <p className="text-2xl font-bold">
                  {editId ? "Edit Product" : "Add Product"}
                </p>
                <p className="text-text font-semibold text-sm mt-1">
                  Fill product details for the pet shop
                </p>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
              >
                <MdClose className="text-2xl" />
              </button>
            </div>

            <form
              onSubmit={editId ? handleUpdateProduct : handleAddProduct}
              className="p-6 space-y-5"
            >
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="font-semibold text-heading">
                    Product Name
                  </label>

                  <input
                    type="text"
                    value={productData.name}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Eg: Pedigree Dog Food"
                    className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-semibold text-heading">Category</label>

                  <select
                    value={productData.category}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        category: e.target.value,
                      })
                    }
                    className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                  >
                    <option>Food</option>
                    <option>Toys</option>
                    <option>Grooming</option>
                    <option>Accessories</option>
                    <option>Health</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-heading">Price</label>

                  <input
                    type="text"
                    value={productData.price}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        price: e.target.value,
                      })
                    }
                    placeholder="Eg: 1299"
                    className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-semibold text-heading">Stock</label>

                  <input
                    type="number"
                    value={productData.stock}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        stock: e.target.value,
                      })
                    }
                    placeholder="Eg: 45"
                    min="0"
                    className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-semibold text-heading">Badge</label>

                  <select
                    value={productData.badge}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        badge: e.target.value,
                      })
                    }
                    className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                  >
                    <option>New</option>
                    <option>Best Seller</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-heading">
                    Image URL
                  </label>

                  <input
                    type="url"
                    value={productData.image}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        image: e.target.value,
                      })
                    }
                    placeholder="https://example.com/product.png"
                    className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-heading">
                  Short Description
                </label>

                <textarea
                  rows="3"
                  value={productData.description}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Short product description"
                  className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary resize-none"
                />
              </div>

              {productData.image && (
                <div>
                  <p className="font-semibold text-heading mb-2">
                    Image Preview
                  </p>

                  <img
                    src={productData.image}
                    alt=""
                    className="w-40 h-32 rounded-xl object-contain border border-gray-100 bg-pink-bg p-3"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3 rounded-xl border border-gray-200 font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark"
                >
                  {editId ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetCenterProducts;
