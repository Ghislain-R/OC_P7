import axios from "axios";

// Configuration d'Axios
export default axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json"
  }
});