import axios from "axios";

class PostService  {
  static backUrl = process.env.REACT_APP_API_URL;
  static getAll = async () => {
    return axios.get(`${this.backUrl}/post`);
  }

  static createPost = async (data) => {
    console.log(data);
    return axios.post(`${this.backUrl}/post`, {...data, verbose: true})
  }
}

export default PostService;