import Form from "./components/Form";
import { useEffect, useState } from "react";
import PostInput from "./components/PostInput";
import blogService from "./services/blog";
import PublishedPost from "./components/PublishedPost";

const App = () => {
  // const [posts, setPosts] = useState([]);
  const [publishedPosts, setPublishedPosts] = useState([]);
  // const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleDelete = async (postId) => {
    await blogService.remove(postId);
    const newPosts = await blogService.getPublishedPosts();
    setPublishedPosts(newPosts);
  };

  const handleSubmit = async () => {
    const newPublishedPosts = await blogService.getPublishedPosts();
    setPublishedPosts(newPublishedPosts);
  };

  useEffect(() => {
    const showPublished = async () => {
      const publishedPosts = await blogService.getPublishedPosts();
      setPublishedPosts(publishedPosts);
      console.log(publishedPosts);
    };

    showPublished();
  }, [user]);

  return (
    <>
      <h1>Blog</h1>

      {user && (
        <div>
          <p>{user.name} logged in</p>
        </div>
      )}

      {user && (
        <div>
          {publishedPosts.map((post) => (
            <PublishedPost key={post.id} {...post} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <Form title={"Login"} onLoginSuccess={handleLoginSuccess} />
      <Form title={"Signup"} />
      <PostInput handleClick={handleSubmit} />
    </>
  );
};

export default App;
