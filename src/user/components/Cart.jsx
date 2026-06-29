import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuTag } from "react-icons/lu";
import { CiLock } from "react-icons/ci";
import { MdLoop } from "react-icons/md";
import { FaAward } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const Cart = () => {
  const navigate = useNavigate();

  const getPrice = (price) => {
    return Number(price.replace(/[₹,]/g, ""));
  };

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const totalItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + getPrice(item.price) * (item.quantity || 1),
    0,
  );

  const deliveryCharge = subtotal > 1000 ? 0 : 50;

  const grandTotal = subtotal + deliveryCharge;

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item,
    );

    updateCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) - 1 } : item,
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  const handleCheckout = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser) {
      alert("Please login to checkout");
      navigate("/user/login");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-450 mx-auto p-6">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-16 text-center">
            <p className="text-3xl font-bold mb-4">Your Cart is Empty</p>

            <p className="text-text mb-6">
              Looks like you haven't added any products yet.
            </p>

            <Link
              to="/pet-shop"
              className="inline-block bg-primary text-white px-8 py-4 rounded-2xl font-semibold"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-4xl font-bold mb-2">My Cart</p>

                <p className="text-text">Review your selected pet products</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto">
                    <IoCartOutline className="text-2xl" />
                  </div>
                  <p className="text-primary font-semibold text-sm mt-1">
                    Cart
                  </p>
                </div>

                <div className="w-24 h-0.5 bg-gray-300"></div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-pink-card text-primary flex items-center justify-center mx-auto">
                    <MdPayment className="text-2xl" />
                  </div>
                  <p className="text-text font-semibold text-sm mt-1">
                    Checkout
                  </p>
                </div>

                <div className="w-24 h-0.5 bg-gray-300"></div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center mx-auto">
                    <IoCheckmarkCircleOutline className="text-2xl" />
                  </div>
                  <p className="text-text font-semibold text-sm mt-1">
                    Payment
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-8 space-y-5">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border-l-4 border-primary rounded-3xl shadow-sm p-5"
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-2">
                        <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                      </div>

                      <div className="col-span-4">
                        <p className="text-2xl font-bold">{item.name}</p>

                        <p className="text-text mt-1">{item.description}</p>
                      </div>

                      <div className="col-span-3 flex justify-center">
                        <div>
                          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className="px-5 py-3 text-xl font-bold"
                            >
                              -
                            </button>

                            <div className="px-6 py-3 font-bold text-lg">
                              {item.quantity || 1}
                            </div>

                            <button
                              onClick={() => increaseQuantity(item.id)}
                              className="px-5 py-3 text-xl font-bold"
                            >
                              +
                            </button>
                          </div>

                          <p className="text-sm text-center text-text mt-2">
                            {item.price} each
                          </p>
                        </div>
                      </div>

                      <div className="col-span-3 flex justify-between items-center">
                        <p className="text-primary text-3xl font-bold">
                          ₹{getPrice(item.price) * (item.quantity || 1)}
                        </p>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="border border-gray-200 p-3 rounded-xl hover:bg-red-50"
                        >
                          <FaRegTrashAlt />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <Link
                  to="/pet-shop"
                  className="inline-block mt-4 border border-primary text-primary px-8 py-4 rounded-2xl font-semibold hover:bg-pink-card transition"
                >
                  ← Continue Shopping
                </Link>
              </div>

              <div className="col-span-4">
                <div className="bg-white rounded-3xl shadow-sm p-6 sticky top-4">
                  <p className="text-3xl font-bold mb-8">Order Summary</p>

                  <div className="space-y-5">
                    <div className="flex justify-between">
                      <span className="text-text">Items ({totalItems})</span>

                      <span className="font-semibold">₹{subtotal}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-text">Delivery Charge</span>

                      <span className="font-semibold">₹{deliveryCharge}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 my-6"></div>

                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold">Total Amount</p>

                    <p className="text-primary text-4xl font-bold">
                      ₹{grandTotal}
                    </p>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full mt-8 bg-primary text-white py-4 rounded-2xl text-lg font-semibold hover:opacity-90 transition"
                  >
                    Proceed to Checkout →
                  </button>

                  <button className="w-full mt-4 border border-primary text-primary py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-pink-card transition">
                    <LuTag />
                    Apply Coupon
                  </button>

                  <div className="mt-8 space-y-5">
                    <div className="flex items-center gap-3 text-text">
                      <CiLock className="text-xl" />
                      <span>100% Secure Payment</span>
                    </div>

                    <div className="flex items-center gap-3 text-text">
                      <MdLoop className="text-xl" />
                      <span>Easy Returns</span>
                    </div>

                    <div className="flex items-center gap-3 text-text">
                      <FaAward className="text-xl" />
                      <span>Best Quality Products</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
