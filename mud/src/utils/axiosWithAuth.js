import axios from 'axios';

const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        headers: {
            Authorization: token
        },
        baseURL: 'https://lambda-mud-test.herokuapp.com/' // Lambda MUD Test Server
    });
};

export default axiosWithAuth;