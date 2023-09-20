import { useEffect, useState } from "react";
import PostCard from "../../components/PostComponents/PostCard";
import PostService from "../../services/post/postService";

export default function MainPage() {
  const [posts, setPosts] = useState([])
  const [renderPost, setRender] = useState([])

  const renderPosts = (post) => {
    return (
      <PostCard data={post} />
    )
  }

  const onInit = async () => {
    const body = {
      token: sessionStorage.getItem('jwt') ?? ""
    }
    if (body.token == "")
      return

    const res = await PostService.getAll(body, 1);
    setPosts(res.data.data)
  }


  useEffect(()=> {
    var list = []
    posts.forEach(element => {
      list.push(renderPosts(element))
      console.log(element);
    });
    setRender(list)
  }, [posts])


  useEffect(() => {
    onInit();
  },[])

  return (
    <main>
      <div className="first-container"></div>
      <div className="main-content">
        {renderPost}
      </div>
    </main>
  )
}