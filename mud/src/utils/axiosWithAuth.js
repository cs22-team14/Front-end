import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  console.log("token", token);

  return axios.create({
    headers: {
      Authorization: "Token " + token
    },
    baseURL: "https://adventure14.herokuapp.com" // Lambda MUD Test Server
  });
};

export default axiosWithAuth;
