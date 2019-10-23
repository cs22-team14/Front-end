import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  console.log("token", token);

  const newToken = axios.create({
    headers: {
      Authorization: "Token " + token
    },
    baseURL: "https://lambda-mud-test.herokuapp.com" // Lambda MUD Test Server
  });
  console.log(newToken);
  return newToken;
};

export default axiosWithAuth;
