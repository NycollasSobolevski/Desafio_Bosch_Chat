import { useState } from "react";
import CryptoJS from 'crypto-js';
import PostService from "../../../services/post/postService";

function Comment(params) {
  console.log("Params");
  console.log(params);
  return(
    <>
      <p>{params.data.content}</p>
    </>
  )
}

function AddComment(params) {
  const [commentData, setData] = useState("")
  const encryptPassword = process.env.REACT_APP_ENCRYPT_DATA_PASSWORD;
  const postId = params.data._id

  const addComment = async () => {
    try{
      console.log(postId);
      const data = {
        id:postId,
        content: commentData,
        anex:"" 
      }
      const encryptData = CryptoJS.AES.encrypt( JSON.stringify(data), encryptPassword ).toString()
      
      const body = {
        token: sessionStorage.getItem('jwt')?? "",
        data : encryptData
      }
      
      await PostService.createComment(body);
      
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <>
      <input type="text" onChange={(e) => setData(e.target.value)} />
      <button onClick={() => addComment()} >Send</button>
    </>
  )
}
export { Comment, AddComment };