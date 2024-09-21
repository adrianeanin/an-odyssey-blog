import Form from "./components/Form";
import { useEffect, useState } from "react";
import PostInput from "./components/PostInput";
import blogService from "./services/blog";
import Post from "./components/Post";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditTitle, setCurrentEditTitle] = useState(null);

  const [activeForm, setActiveForm] = useState("Login");

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setActiveForm(null);
  };

  const toggleInputVisibility = () => {
    setIsInputVisible(!isInputVisible);
  };

  const handleDelete = async (postId) => {
    try {
      await blogService.remove(postId);
      const newPosts = await blogService.getAllPosts();
      setPosts(newPosts);
    } catch (error) {
      setError(error.data.errors);
      console.log("Error while deleting,", error);

      setTimeout(() => {
        setError(null);
      }, 7000);
    }
  };

  const handleEdit = async (formData) => {
    try {
      await blogService.update(idToUpdate, formData);
      const newPosts = await blogService.getAllPosts();
      setPosts(newPosts);
    } catch (error) {
      setError(error.data.errors);
      console.log("Error while editing,", error);

      setTimeout(() => {
        setError(null);
      }, 7000);
    }
  };

  const handleSubmit = async () => {
    try {
      const newPosts = await blogService.getAllPosts();
      setPosts(newPosts);
    } catch (error) {
      setError(error.data.errors);
      console.log("Error while submiting,", error);

      setTimeout(() => {
        setError(null);
      }, 7000);
    }
  };

  useEffect(() => {
    const showPosts = async () => {
      const allPosts = await blogService.getAllPosts();

      setPosts((prevPosts) => {
        if (JSON.stringify(prevPosts) !== JSON.stringify(allPosts)) {
          console.log(allPosts);
          return allPosts;
        }
        return prevPosts;
      });

      console.log(posts);
    };

    showPosts();
  }, [user, posts]);

  return (
    <>
      <header>
        <h1>anodyssey editor</h1>

        {user && (
          <div>
            <p>{user.name} logged in</p>
          </div>
        )}

        {user && (
          <div>
            {posts.map((post) => (
              <Post
                key={post.id}
                {...post}
                onDelete={handleDelete}
                handleClick={{ handleSubmit, toggleInputVisibility }}
                isEditing={isEditing}
                setEdit={{ setIsEditing, setIdToUpdate, setCurrentEditTitle }}
              />
            ))}
          </div>
        )}
      </header>

      {activeForm === "Login" && (
        <Form
          title={activeForm}
          onLoginSuccess={handleLoginSuccess}
          setActiveForm={setActiveForm}
        />
      )}
      {activeForm === "Signup" && <Form title={activeForm} />}

      {user && (
        <div>
          {isInputVisible && (
            <PostInput
              handleClick={{ handleSubmit, handleEdit }}
              toUpdate={{ idToUpdate, currentEditTitle }}
            />
          )}
          {error && (
            <div>
              <p>Error:</p>
              <ul>
                {error.map((errorItem, index) => (
                  <li key={index}>{errorItem.msg}</li>
                ))}
              </ul>
            </div>
          )}
          <button onClick={toggleInputVisibility}>
            {isInputVisible ? "Hide Post Editor" : "Show Post Editor"}
          </button>
          <button
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            Show / Hide Posts
          </button>

          <button onClick={() => setIdToUpdate(null)}>Reset</button>
        </div>
      )}
    </>
  );
};

export default App;
