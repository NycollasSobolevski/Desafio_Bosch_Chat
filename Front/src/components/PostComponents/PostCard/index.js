import { useEffect, useState } from "react";
import profileImage from "./perfil-image.png"
import CryptoJS from "crypto-js";
import thumbUp from '../../../assets/img/thumb-up.svg'
import thumbDown from '../../../assets/img/thumb-down.svg'
import PostService from "../../../services/post/postService";
import {Comment, AddComment} from "../CommentsCard";
import './styled.scss'

function PostCard(params) {
  const encryptPassword = process.env.REACT_APP_ENCRYPT_DATA_PASSWORD;
  const [liked, setLiked] = useState(false);
  const [unliked, setUnliked] = useState(false);
  const [comment, setComment] = useState();
  const [commentArea, setCommentArea] = useState(false);
  const data = params.data;

  const likedPost = async () => {
    setLiked(!liked)
    setUnliked(false)

    const data = {
      postId: params.data._id
    }
    const encryptData = CryptoJS.AES.encrypt( JSON.stringify(data), encryptPassword ).toString()
    const body = {
      token: sessionStorage.getItem('jwt')?? "",
      data: encryptData,
      verbose:false
    }
    await PostService.sendUnlike(body);
  }
  const dislikePost = async () => {
    setUnliked(!unliked)
    setLiked(false)

    const data = {
      postId: params.data._id
    }
    const encryptData = CryptoJS.AES.encrypt( JSON.stringify(data), encryptPassword ).toString()
    const body = {
      token: sessionStorage.getItem('jwt')?? "",
      data: encryptData,
      verbose:false
    }
    const res = await PostService.sendUnlike(body);
  }
  
  const toggleComment = () => {
    setCommentArea(!commentArea)
  }
  const createComment = (data) => {
    return (
      <>
        <Comment data={data} />
      </>
    )
  }
  const setRenderComment = () => {
    var list = []

    data.comments.forEach(element => {
      list.push(createComment(element))
    });

    setComment(list)
  }
  const commentsRender = () => {
      if (!commentArea)
        return
      return (
        <>
          <hr />
          <h6>Comments</h6>
          {comment}
          <AddComment data={data} />
        </>
      )
  }
  useEffect(() => setRenderComment(), [data])

  return (
    <>
      <div className="container">
        <div className="header">
          <img src={profileImage} height={50} alt="profile-image" />
          <span>
            <h4>{data.title}</h4>
            {/* <p>{data.author.name}</p> */}
          </span>
        </div>
        <hr />
        <div className="content">
          <p>{data.content}</p>
        </div>
        <div className="footer">
          <div className="reactions">
            <button onClick={() => likedPost()}>
              <svg className={`default ${liked? "liked" : ""}`} id="like" viewBox="0 0 24 24" ><path d="M 10 0 L 0 15 L 20 15 L 10 0" /></svg>
            </button>
            <button onClick={() => dislikePost()} >
              <svg  className={`default ${unliked? "unliked" : ""}`} id="dislike" viewBox="0 0 24 24" ><path d="M 10 0 L 0 15 L 20 15 L 10 0" /></svg>
            </button>
            <button onClick={() => toggleComment()}>
              <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </button>
          </div>
        </div>
        <>
          { commentsRender() }
        </>
      </div>
    </>
  )
}


export default PostCard;