import axios from "axios";

const commonAPI = async (httpMethod, url, data) => {
  const reqConfig = {
    method: httpMethod,
    url,
    data,
  };

  try {
    return await axios(reqConfig);
  } catch (err) {
    return {
      status: err.response?.status || 0,
      data: err.response?.data || null,
      error: err.message || "Network error",
    };
  }
};

export default commonAPI;
