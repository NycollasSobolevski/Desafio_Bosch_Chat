import axios from "axios";
 
class UserService {
  
  static createUser = async ( data ) => {
    const apiKey = process.env.REACT_APP_API_URL;
    return await axios.post(`${apiKey}/user/add`, data);
  }
  static login = async (data) => {
    const apiKey = process.env.REACT_APP_API_URL;
    return await axios.post(`${apiKey}/user/Login`, data);
  }
}

export default UserService;