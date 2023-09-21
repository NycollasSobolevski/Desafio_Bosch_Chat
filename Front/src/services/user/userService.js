import axios from "axios";
 
class UserService {
  
  static createUser = async ( data ) => {
    const apiKey = process.env.REACT_APP_API_URL;
    console.log("api key " + apiKey);
    return await axios.post(`${apiKey}/user/add`, data);
    // return await axios.post(`http://localhost:8000/user/add`, data);
  }
  static login = async (data) => {
    const apiKey = process.env.REACT_APP_API_URL;
    console.log("apiKey "+apiKey);
    return await axios.post(`http://localhost:8000/user/login`, data);
    return await axios.post(`${apiKey}/user/Login`, data);
  }
}

export default UserService;