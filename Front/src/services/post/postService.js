import axios from "axios";

class PostService  {
  static backUrl = process.env.REACT_APP_API_URL;
  static getAll = async (data, page) => {
    console.log(this.backUrl);
    return axios.post(`${this.backUrl}/post/getAll/${page}`, data);
  }

  static createPost = async (data) => {
    console.log(data);
    return axios.post(`${this.backUrl}/post/create`, {...data, verbose: true})
  }
}

export default PostService;