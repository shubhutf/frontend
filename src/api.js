// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://amazon-clone-backend-hxsi.onrender.com",
});

export default api;