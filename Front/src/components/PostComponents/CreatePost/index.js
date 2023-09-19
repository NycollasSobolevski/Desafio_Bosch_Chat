import { useState } from 'react';
import CryptoJS from 'crypto-js';
import './styles.scss'
import '../../../DefaultStyles.scss'
import PostService from '../../../services/post/postService';

function CreatePost(parameters) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  
  const data = {
    title:title,
    content:content,
    anex: {},
    author: sessionStorage.getItem('jwt') ?? ""
  }

  const createPost = async (data) => {
    if(data.author == "")
      return

    const encryptPassword = process.env.REACT_APP_ENCRYPT_DATA_PASSWORD;
    const encryptDataString = CryptoJS.AES.encrypt( JSON.stringify(data), encryptPassword ).toString()
    const body = {
      data: encryptDataString
    }
    try{
      const res = await PostService.createPost(body)
  
      if(res.status == 200)
        window.location.reload()
    }
    catch (e){
      console.log(e);
    }
    
  }
  
  return(
    <div className='create-post-card'>
      <h3>Create Post</h3>
      <span className='input_container'>
        <label>Title</label>
        <input type="text" name="title" id="title" onChange={(e) => setTitle( e.target.value )} className='input' />
      </span>
      <span className='input_container textarea-container'>
        <label>Content</label>
        <textarea type="text" name="content" id="content" onChange={(e) => setContent( e.target.value )} className='input' />
      </span>
      <span>
        <button>Submit</button>
      </span>
    </div>
  )
}

export default CreatePost;