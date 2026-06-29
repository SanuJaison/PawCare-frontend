import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { TbTruckDelivery } from "react-icons/tb";
import { LuTag } from "react-icons/lu";
import { CiLock } from "react-icons/ci";
import { MdLoop } from "react-icons/md";
import { FaAward } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import upiImg from "../../assets/upi-Photoroom.png";
import gpayImg from "../../assets/gpay-Photoroom.png";
import paytmImg from "../../assets/paytm-Photoroom.png";
import phonepeImg from "../../assets/phonepe-Photoroom.png";
import axisImg from "../../assets/AXIS-Photoroom.png";
import hdfcImg from "../../assets/HDFC-Photoroom.png";
import sbiImg from "../../assets/SBI-Photoroom.png";

import {
  addOrderAPI,
  deleteCouponAPI,
  getAllCouponsAPI,
} from "../../services/allAPI";

const Checkout = () => {
  const navigate = useNavigate();

  const getPrice = (price) => {
    return Number(price.replace(/[₹,]/g, ""));
  };

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [cartItems, setCartItems] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("loading");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const [checkoutData, setCheckoutData] = useState({
    fullName: currentUser?.fullName || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    address: currentUser?.address || "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    shippingMethod: "Standard Delivery",
    paymentMethod: "Cash on Delivery",
    upiApp: "",
    upiId: "",
    cardType: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    notes: "",
    coupon: "",
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      navigate("/cart");
      return;
    }

    setCartItems(cart);
  }, [navigate]);

  const totalItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + getPrice(item.price) * (item.quantity || 1),
    0,
  );

  const shippingCharge =
    checkoutData.shippingMethod === "Express Delivery"
      ? 99
      : checkoutData.shippingMethod === "Standard Delivery"
        ? subtotal > 1000
          ? 0
          : 50
        : 0;

  const discountAmount = appliedCoupon
    ? Math.floor((subtotal * appliedCoupon.discount) / 100)
    : 0;

  const grandTotal = subtotal + shippingCharge - discountAmount;

  const isPaymentValid =
    checkoutData.paymentMethod === "Cash on Delivery" ||
    (checkoutData.paymentMethod === "UPI" &&
      checkoutData.upiApp &&
      checkoutData.upiId.includes("@")) ||
    (checkoutData.paymentMethod === "Credit / Debit Card" &&
      checkoutData.cardType &&
      checkoutData.cardNumber.length === 16 &&
      checkoutData.cardName &&
      checkoutData.expiry &&
      checkoutData.cvv.length === 3) ||
    (checkoutData.paymentMethod === "Net Banking" &&
      checkoutData.bankName &&
      checkoutData.accountNumber &&
      checkoutData.ifsc);

  const handleApplyCoupon = async () => {
    if (!checkoutData.coupon.trim()) {
      alert("Enter coupon code");
      return;
    }

    if (appliedCoupon) {
      alert("Coupon already applied");
      return;
    }

    const result = await getAllCouponsAPI();

    if (result.status >= 200 && result.status < 300) {
      const coupon = result.data.find(
        (item) =>
          item.code.toLowerCase() === checkoutData.coupon.trim().toLowerCase(),
      );

      if (!coupon) {
        alert("Enter valid coupon code");
        return;
      }

      setAppliedCoupon(coupon);
      alert(`${coupon.discount}% coupon applied`);
    } else {
      alert("Failed to check coupon");
    }
  };

  const createOrder = async () => {
    const {
      fullName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      shippingMethod,
      paymentMethod,
    } = checkoutData;

    if (
      !fullName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !shippingMethod ||
      !paymentMethod
    ) {
      alert("Please fill all required details");
      return false;
    }

    if (!isPaymentValid) {
      alert("Please fill valid payment details");
      return false;
    }

    const orderData = {
      userId: currentUser?.id,
      customer: {
        fullName,
        email,
        phone,
      },
      address: {
        address,
        city,
        state,
        pincode,
        landmark: checkoutData.landmark,
      },
      items: cartItems,
      totalItems,
      subtotal,
      shippingCharge,
      discountAmount,
      grandTotal,
      coupon: appliedCoupon
        ? {
            id: appliedCoupon.id,
            code: appliedCoupon.code,
            discount: appliedCoupon.discount,
          }
        : null,
      shippingMethod,
      paymentMethod,
      paymentDetails: {
        upiApp: checkoutData.upiApp,
        upiId: checkoutData.upiId,
        cardType: checkoutData.cardType,
        cardNumber: checkoutData.cardNumber
          ? `**** **** **** ${checkoutData.cardNumber.slice(-4)}`
          : "",
        cardName: checkoutData.cardName,
        bankName: checkoutData.bankName,
        accountNumber: checkoutData.accountNumber
          ? `XXXX${checkoutData.accountNumber.slice(-4)}`
          : "",
        ifsc: checkoutData.ifsc,
      },
      notes: checkoutData.notes,
      status: "Placed",
      paymentStatus:
        paymentMethod === "Cash on Delivery" ? "Pay on Delivery" : "Paid",
      createdAt: new Date().toISOString(),
    };

    const result = await addOrderAPI(orderData);

    if (result.status >= 200 && result.status < 300) {
      if (appliedCoupon) {
        await deleteCouponAPI(appliedCoupon.id);
      }

      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));

      return true;
    }

    alert("Failed to place order");
    return false;
  };

  const handlePlaceOrder = async () => {
    if (checkoutData.paymentMethod === "Cash on Delivery") {
      const success = await createOrder();

      if (success) {
        alert("Order placed successfully");
        navigate("/orders");
      }

      return;
    }

    const {
      fullName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      shippingMethod,
      paymentMethod,
    } = checkoutData;

    if (
      !fullName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !shippingMethod ||
      !paymentMethod
    ) {
      alert("Please fill all required details");
      return;
    }

    if (!isPaymentValid) {
      alert("Please fill valid payment details");
      return;
    }

    setShowPaymentModal(true);
    setPaymentStatus("loading");

    setTimeout(async () => {
      const success = await createOrder();

      if (success) {
        setPaymentStatus("success");
      } else {
        setShowPaymentModal(false);
      }
    }, 2500);
  };

  const paymentMethods = [
    {
      name: "Cash on Delivery",
      img: "https://cdn-icons-png.flaticon.com/128/6491/6491511.png",
    },
    { name: "UPI", img: upiImg },
    {
      name: "Credit / Debit Card",
      img: "https://cdn-icons-png.flaticon.com/128/8983/8983163.png",
    },
    {
      name: "Net Banking",
      img: "https://cdn-icons-png.flaticon.com/128/14366/14366959.png",
    },
  ];

  const upiApps = [
    { name: "Google Pay", img: gpayImg },
    { name: "Paytm", img: paytmImg },
    { name: "PhonePe", img: phonepeImg },
  ];

  const cardTypes = [
    {
      name: "Visa",
      img: "https://cdn-icons-png.flaticon.com/128/5968/5968299.png",
    },
    {
      name: "Master Card",
      img: "https://cdn-icons-png.flaticon.com/128/14082/14082959.png",
    },
    {
      name: "RuPay",
      img: "https://cdn-icons-png.flaticon.com/128/11378/11378315.png",
    },
  ];

  const banks = [
    { name: "Axis Bank", img: axisImg },
    { name: "HDFC Bank", img: hdfcImg },
    { name: "SBI Bank", img: sbiImg },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-450 mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-4xl font-bold mb-2">Checkout</p>
            <p className="text-text">Complete your order and payment details</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-pink-card text-primary flex items-center justify-center mx-auto">
                <IoCartOutline className="text-2xl" />
              </div>
              <p className="text-text font-semibold text-sm mt-1">Cart</p>
            </div>

            <div className="w-24 h-0.5 bg-primary"></div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto">
                <MdPayment className="text-2xl" />
              </div>
              <p className="text-primary font-semibold text-sm mt-1">
                Checkout
              </p>
            </div>

            <div className="w-24 h-0.5 bg-gray-300"></div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center mx-auto">
                <IoCheckmarkCircleOutline className="text-2xl" />
              </div>
              <p className="text-text font-semibold text-sm mt-1">Payment</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 space-y-5">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-pink-card text-primary flex items-center justify-center">
                  <FaRegUser />
                </div>
                <p className="text-xl font-bold">Contact Information</p>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <input
                  type="text"
                  value={checkoutData.fullName}
                  onChange={(e) =>
                    setCheckoutData({
                      ...checkoutData,
                      fullName: e.target.value,
                    })
                  }
                  placeholder="Full Name"
                  className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                />

                <input
                  type="email"
                  value={checkoutData.email}
                  onChange={(e) =>
                    setCheckoutData({
                      ...checkoutData,
                      email: e.target.value,
                    })
                  }
                  placeholder="Email Address"
                  className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                />

                <input
                  type="tel"
                  value={checkoutData.phone}
                  onChange={(e) =>
                    setCheckoutData({
                      ...checkoutData,
                      phone: e.target.value,
                    })
                  }
                  placeholder="Phone Number"
                  className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-pink-card text-primary flex items-center justify-center">
                  <GrLocation />
                </div>
                <p className="text-xl font-bold">Delivery Address</p>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  value={checkoutData.address}
                  onChange={(e) =>
                    setCheckoutData({
                      ...checkoutData,
                      address: e.target.value,
                    })
                  }
                  placeholder="House No., Street, Area"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                />

                <div className="grid grid-cols-3 gap-5">
                  <input
                    type="text"
                    value={checkoutData.city}
                    onChange={(e) =>
                      setCheckoutData({
                        ...checkoutData,
                        city: e.target.value,
                      })
                    }
                    placeholder="City"
                    className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                  />

                  <select
                    value={checkoutData.state}
                    onChange={(e) =>
                      setCheckoutData({
                        ...checkoutData,
                        state: e.target.value,
                      })
                    }
                    className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                  >
                    <option value="">Select state</option>
                    <option>Kerala</option>
                    <option>Karnataka</option>
                    <option>Tamil Nadu</option>
                    <option>Maharashtra</option>
                  </select>

                  <input
                    type="text"
                    value={checkoutData.pincode}
                    onChange={(e) =>
                      setCheckoutData({
                        ...checkoutData,
                        pincode: e.target.value,
                      })
                    }
                    placeholder="Pincode"
                    className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                  />
                </div>

                <input
                  type="text"
                  value={checkoutData.landmark}
                  onChange={(e) =>
                    setCheckoutData({
                      ...checkoutData,
                      landmark: e.target.value,
                    })
                  }
                  placeholder="Landmark Optional"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-pink-card text-primary flex items-center justify-center">
                  <TbTruckDelivery className="text-xl" />
                </div>
                <p className="text-xl font-bold">Shipping Method</p>
              </div>

              <div className="grid grid-cols-3 gap-5">
                {[
                  {
                    name: "Standard Delivery",
                    desc: "3-5 business days",
                    price: subtotal > 1000 ? 0 : 50,
                  },
                  {
                    name: "Express Delivery",
                    desc: "1-2 business days",
                    price: 99,
                  },
                  {
                    name: "Store Pickup",
                    desc: "Pick up from our store",
                    price: 0,
                  },
                ].map((item) => (
                  <label
                    key={item.name}
                    className={`border rounded-2xl p-4 cursor-pointer flex justify-between items-center ${
                      checkoutData.shippingMethod === item.name
                        ? "border-primary bg-pink-card"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={checkoutData.shippingMethod === item.name}
                        onChange={() =>
                          setCheckoutData({
                            ...checkoutData,
                            shippingMethod: item.name,
                          })
                        }
                        className="accent-pink-500"
                      />

                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-sm text-text">{item.desc}</p>
                      </div>
                    </div>

                    <p className="font-bold">₹{item.price}</p>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-pink-card text-primary flex items-center justify-center">
                  <MdPayment className="text-xl" />
                </div>
                <p className="text-xl font-bold">Payment Method</p>
              </div>

              <div className="grid grid-cols-4 gap-5">
                {paymentMethods.map((method) => (
                  <label
                    key={method.name}
                    className={`border rounded-2xl p-4 cursor-pointer ${
                      checkoutData.paymentMethod === method.name
                        ? "border-primary bg-pink-card"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={checkoutData.paymentMethod === method.name}
                        onChange={() =>
                          setCheckoutData({
                            ...checkoutData,
                            paymentMethod: method.name,
                            upiApp: "",
                            upiId: "",
                            cardType: "",
                            cardNumber: "",
                            cardName: "",
                            expiry: "",
                            cvv: "",
                            bankName: "",
                            accountNumber: "",
                            ifsc: "",
                          })
                        }
                        className="accent-pink-500"
                      />

                      <div>
                        <img
                          src={method.img}
                          alt=""
                          className="w-10 h-8 object-contain mb-1"
                        />
                        <p className="font-bold text-sm">{method.name}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {checkoutData.paymentMethod === "UPI" && (
                <div className="mt-5 border border-gray-100 rounded-2xl p-5 bg-gray-50">
                  <p className="font-bold mb-4">Select UPI App</p>

                  <div className="grid grid-cols-3 gap-4">
                    {upiApps.map((app) => (
                      <button
                        key={app.name}
                        type="button"
                        onClick={() =>
                          setCheckoutData({
                            ...checkoutData,
                            upiApp: app.name,
                          })
                        }
                        className={`border rounded-xl p-4 flex items-center justify-center gap-3 font-semibold ${
                          checkoutData.upiApp === app.name
                            ? "border-primary bg-pink-card text-primary"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <img src={app.img} alt="" className="w-10 h-10" />
                        {app.name}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    placeholder="Enter UPI ID, example: name@upi"
                    value={checkoutData.upiId}
                    onChange={(e) =>
                      setCheckoutData({
                        ...checkoutData,
                        upiId: e.target.value,
                      })
                    }
                    className="w-full mt-4 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                  />
                </div>
              )}

              {checkoutData.paymentMethod === "Credit / Debit Card" && (
                <div className="mt-5 border border-gray-100 rounded-2xl p-5 bg-gray-50">
                  <p className="font-bold mb-4">Select Card Type</p>

                  <div className="grid grid-cols-3 gap-4">
                    {cardTypes.map((card) => (
                      <button
                        key={card.name}
                        type="button"
                        onClick={() =>
                          setCheckoutData({
                            ...checkoutData,
                            cardType: card.name,
                          })
                        }
                        className={`border rounded-xl p-4 flex items-center justify-center gap-3 font-semibold ${
                          checkoutData.cardType === card.name
                            ? "border-primary bg-pink-card text-primary"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <img src={card.img} alt="" className="w-10 h-10" />
                        {card.name}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4 mt-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={checkoutData.cardNumber}
                      maxLength="16"
                      onChange={(e) =>
                        setCheckoutData({
                          ...checkoutData,
                          cardNumber: e.target.value,
                        })
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                    />

                    <input
                      type="text"
                      placeholder="Card Holder Name"
                      value={checkoutData.cardName}
                      onChange={(e) =>
                        setCheckoutData({
                          ...checkoutData,
                          cardName: e.target.value,
                        })
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={checkoutData.expiry}
                        onChange={(e) =>
                          setCheckoutData({
                            ...checkoutData,
                            expiry: e.target.value,
                          })
                        }
                        className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                      />

                      <input
                        type="password"
                        placeholder="CVV"
                        value={checkoutData.cvv}
                        maxLength="3"
                        onChange={(e) =>
                          setCheckoutData({
                            ...checkoutData,
                            cvv: e.target.value,
                          })
                        }
                        className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {checkoutData.paymentMethod === "Net Banking" && (
                <div className="mt-5 border border-gray-100 rounded-2xl p-5 bg-gray-50">
                  <p className="font-bold mb-4">Select Bank</p>

                  <div className="grid grid-cols-3 gap-4">
                    {banks.map((bank) => (
                      <button
                        key={bank.name}
                        type="button"
                        onClick={() =>
                          setCheckoutData({
                            ...checkoutData,
                            bankName: bank.name,
                          })
                        }
                        className={`border rounded-xl p-4 flex items-center justify-center gap-3 font-semibold ${
                          checkoutData.bankName === bank.name
                            ? "border-primary bg-pink-card text-primary"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <img src={bank.img} alt="" className="w-10 h-10" />
                        {bank.name}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4 mt-4">
                    <input
                      type="text"
                      placeholder="Account Number"
                      value={checkoutData.accountNumber}
                      onChange={(e) =>
                        setCheckoutData({
                          ...checkoutData,
                          accountNumber: e.target.value,
                        })
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                    />

                    <input
                      type="text"
                      placeholder="IFSC Code"
                      value={checkoutData.ifsc}
                      onChange={(e) =>
                        setCheckoutData({
                          ...checkoutData,
                          ifsc: e.target.value,
                        })
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
                    />
                  </div>
                </div>
              )}

              {checkoutData.paymentMethod === "Cash on Delivery" && (
                <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-xl">
                  Pay directly when your order is delivered. No online payment
                  needed.
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <p className="text-xl font-bold mb-4">
                Order Notes{" "}
                <span className="text-text font-semibold text-base">
                  Optional
                </span>
              </p>

              <textarea
                rows="3"
                value={checkoutData.notes}
                onChange={(e) =>
                  setCheckoutData({
                    ...checkoutData,
                    notes: e.target.value,
                  })
                }
                placeholder="Add any special instructions or notes for your order..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary resize-none"
              />
            </div>
          </div>

          <div className="col-span-4">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <p className="text-3xl font-bold mb-6">Order Summary</p>

              <div className="space-y-4 max-h-72 overflow-y-auto pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b border-gray-100 pb-4"
                  >
                    <div className="w-18 h-18 bg-pink-bg rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-bold">{item.name}</p>
                      <p className="text-text text-sm">{item.description}</p>
                      <p className="text-text text-sm">
                        Qty: {item.quantity || 1}
                      </p>
                    </div>

                    <p className="font-bold">
                      ₹{getPrice(item.price) * (item.quantity || 1)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex justify-between">
                  <p className="text-text">Subtotal</p>
                  <p className="font-bold">₹{subtotal}</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-text">Delivery Charge</p>
                  <p className="font-bold">₹{shippingCharge}</p>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <p>
                      Discount ({appliedCoupon.code} - {appliedCoupon.discount}
                      %)
                    </p>
                    <p className="font-bold">-₹{discountAmount}</p>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 my-6"></div>

              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold">Total Amount</p>

                <p className="text-primary text-4xl font-bold">₹{grandTotal}</p>
              </div>

              <div className="grid grid-cols-12 gap-3 mt-6">
                <input
                  type="text"
                  value={checkoutData.coupon}
                  disabled={appliedCoupon}
                  onChange={(e) =>
                    setCheckoutData({
                      ...checkoutData,
                      coupon: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="Enter coupon code"
                  className="col-span-7 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary disabled:bg-gray-100"
                />

                <button
                  onClick={handleApplyCoupon}
                  disabled={appliedCoupon}
                  className="col-span-5 border border-primary text-primary rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-pink-card disabled:opacity-50"
                >
                  <LuTag />
                  Apply
                </button>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full mt-5 bg-primary text-white py-4 rounded-2xl text-lg font-semibold hover:bg-primary-dark transition"
              >
                Place Order
              </button>

              <p className="text-center text-sm text-text mt-4">
                By placing this order, you agree to our{" "}
                <span className="text-primary font-semibold">
                  Terms & Conditions.
                </span>
              </p>

              <div className="border-t border-gray-100 my-6"></div>

              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <CiLock className="text-primary text-2xl" />
                  <div>
                    <p className="font-bold">100% Secure Payment</p>
                    <p className="text-sm text-text">
                      Your payment information is safe with us.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MdLoop className="text-primary text-2xl" />
                  <div>
                    <p className="font-bold">Easy Returns</p>
                    <p className="text-sm text-text">
                      Hassle-free returns within 7 days.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaAward className="text-primary text-2xl" />
                  <div>
                    <p className="font-bold">Best Quality Products</p>
                    <p className="text-sm text-text">
                      We ensure top quality for your pets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showPaymentModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-3xl text-center w-[400px]">
              {paymentStatus === "loading" && (
                <>
                  <div className="w-16 h-16 border-4 border-gray-300 border-t-primary rounded-full animate-spin mx-auto"></div>

                  <h2 className="text-xl font-bold mt-4">
                    Processing Payment...
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Please wait while we confirm your payment
                  </p>
                </>
              )}

              {paymentStatus === "success" && (
                <>
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl">
                    ✓
                  </div>

                  <h2 className="text-xl font-bold text-green-600 mt-4">
                    Payment Successful
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Your order has been placed successfully
                  </p>

                  <button
                    onClick={() => navigate("/orders")}
                    className="mt-5 bg-primary text-white px-5 py-2 rounded-xl"
                  >
                    OK
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
