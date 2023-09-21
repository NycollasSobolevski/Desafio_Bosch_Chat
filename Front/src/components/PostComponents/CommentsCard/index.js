import { useState } from "react";
import CryptoJS from 'crypto-js';
import PostService from "../../../services/post/postService";
import './styless.scss'

function Comment(params) {
  const data = params.data
  return (
    <>
      <div className="comment-container">
        <span>
          <img src="../../../logo.svg" height={30} alt="" />
        </span>
        <span>
          <p>{data.author.name}</p>
          <p>{data.content}</p>
        </span>
      </div>
    </>
  )
}

function AddComment(params) {
  const [commentData, setData] = useState("")
  const encryptPassword = process.env.REACT_APP_ENCRYPT_DATA_PASSWORD;
  const postId = params.data._id

  const addComment = async () => {
    try {
      console.log(postId);
      const data = {
        id: postId,
        content: commentData,
        anex: ""
      }
      const encryptData = CryptoJS.AES.encrypt(JSON.stringify(data), encryptPassword).toString()

      const body = {
        token: sessionStorage.getItem('jwt') ?? "",
        data: encryptData
      }

      await PostService.createComment(body);

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="add-comment-container">
        <div className="input-container-with-button">
          <input type="text" onChange={(e) => setData(e.target.value)} />
          <button onClick={() => addComment()} >Send</button>
        </div>
      </div>
    </>
  )
}
export { Comment, AddComment };