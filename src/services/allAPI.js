import commonAPI from "./commonAPI"
import { serverURL } from "./serverURL"

//user reg api
export const registerUserAPI = async (reqbody) => {
    return await commonAPI("POST", `${serverURL}/users`, reqbody)
}

//get all users api
export const getAllUsersAPI = async () => {
    return await commonAPI("GET", `${serverURL}/users`, "")
}

//user login api
export const userLoginAPI = async () => {
    return await commonAPI("GET", `${serverURL}/users`, "")
}

//edit user details api
export const updateUserAPI = async (id, reqbody) => {
    return await commonAPI("PATCH", `${serverURL}/users/${id}`, reqbody)
}

//delete user acc api
export const deleteUserAPI = async (id) => {
    return await commonAPI("DELETE", `${serverURL}/users/${id}`, "")
}

// add appointment
export const addAppointmentAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/appointments`, reqBody);
};

// get all appointments
export const getAppointmentsAPI = async () => {
    return await commonAPI("GET", `${serverURL}/appointments`, "");
};

// update appointment
export const updateAppointmentAPI = async (id, reqBody) => {
    return await commonAPI("PATCH", `${serverURL}/appointments/${id}`, reqBody);
};

// delete appointment
export const deleteAppointmentAPI = async (id) => {
    return await commonAPI("DELETE", `${serverURL}/appointments/${id}`, "");
};

// petcenter login api
export const petCenterLoginAPI = async () => {
    return await commonAPI("GET", `${serverURL}/petcenter`, "");
};

//add pet
export const addPetAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/pets`, reqBody)
}

//get pet
export const getAllPetsAPI = async () => {
  return await commonAPI("GET", `${serverURL}/pets`, "");
};

//update pet
export const updatePetAPI = async (id, reqBody) => {
  return await commonAPI("PATCH", `${serverURL}/pets/${id}`, reqBody);
};

//delete pet
export const deletePetAPI = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/pets/${id}`, "");
};

//add product
export const addProductAPI = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/products`, reqBody);
};

//get products
export const getAllProductsAPI = async () => {
  return await commonAPI("GET", `${serverURL}/products`, "");
};

//update product
export const updateProductAPI = async (id, reqBody) => {
  return await commonAPI("PATCH", `${serverURL}/products/${id}`, reqBody);
};

//delete product
export const deleteProductAPI = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/products/${id}`, "");
};

//add order
export const addOrderAPI = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/orders`, reqBody);
};

//get orders
export const getAllOrdersAPI = async () => {
  return await commonAPI("GET", `${serverURL}/orders`, "");
};

//update order
export const updateOrderAPI = async (id, reqBody) => {
  return await commonAPI("PATCH", `${serverURL}/orders/${id}`, reqBody);
};

//get coupons
export const getAllCouponsAPI = async () => {
  return await commonAPI("GET", `${serverURL}/coupons`, "");
};

//delete coupon after use
export const deleteCouponAPI = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/coupons/${id}`, "");
};

//add adoption request
export const addAdoptionRequestAPI = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/adoptionRequests`, reqBody);
};

//get adoption requests
export const getAllAdoptionRequestsAPI = async () => {
  return await commonAPI("GET", `${serverURL}/adoptionRequests`, "");
};

//update adoption request
export const updateAdoptionRequestAPI = async (id, reqBody) => {
  return await commonAPI("PATCH", `${serverURL}/adoptionRequests/${id}`, reqBody);
};

//delete adoption request
export const deleteAdoptionRequestAPI = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/adoptionRequests/${id}`, "");
};