import axios from "axios";

class PostService  {
  static backUrl = process.env.REACT_APP_API_URL;
  static getAll = async (data, page) => {
    console.log(this.backUrl);
    return axios.post(`${this.backUrl}/post/getAll/${page}`, data);
  }

  static createPost = async (data) => {
    return axios.post(`${this.backUrl}/post/create`, {...data, verbose: true})
  }

  static createComment = async (data) => {
    return axios.post(`${this.backUrl}/post/comment`, data)
  }

  static sendLike = async (data) => {
    return axios.post(`${this.backUrl}/post/like`, data)
  }
  static sendUnlike = async (data) => {
    console.log(this.backUrl);
    return axios.post(`${this.backUrl}/post/deslike`, data)
  }
}

export default PostService;