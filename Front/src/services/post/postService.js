import axios from "axios";

class PostService  {
  static backUrl = process.env.REACT_APP_API_URL;
  static getAll = async () => {
    return axios.get(`${this.backUrl}/forum`);
  }
}

export default PostService;