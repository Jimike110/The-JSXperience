import { useState, useEffect } from "react";
import BlogPosts from "./BlogPosts";

const Home = () => {
    const API = "https://retoolapi.dev/v0yzGZ/data";

  const [posts, setPosts] = useState([]);

  const [name, setName] = useState("Michael");

  const addPost = async (e) => {
    e.preventDefault();
  
    const newPost = {
      title: e.target.title.value,
      body: e.target.body.value,
      author: e.target.author.value,
      background: e.target.background.value,
      // No need to set id here; the API should handle it
    };
  
    try {
      // First, submit the data to the API
      const response = await fetch(`${API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add post to API.");
      }
  
      // If successful, update the React state
      const updatedPosts = [...posts, newPost];
      setPosts(updatedPosts);
  
      // Reset the form
      e.target.reset();
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  const deletePost = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete post.");
        }
        return res.json(); // You might need this depending on your API response
      })
      .then(() => {
        const remainingPosts = posts.filter((post) => post.id !== id);
        setPosts(remainingPosts);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error as needed
      });
  };

  useEffect(() => {
    fetch(`${API}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPosts(data);
      });
  }, [deletePost]);

  return (
    <div className="home">
      <h1>{name}</h1>
      <button onClick={() => setName("Jimike")}>Change name</button>
      {posts && 
        <BlogPosts
          posts={posts}
          title="All Blog Posts"
          deletePost={deletePost}
        />
      }
      {posts && 
        <BlogPosts
          posts={posts.filter((post) => post.author === "Michael")}
          title="Posts by Michael"
          deletePost={deletePost}
        />
      }
      <form id="create" method="post" onSubmit={addPost}>
        <h2>Add a New Post</h2>
        <div>
          Title:
          <input required type="text" id="title" name="title"></input>
        </div>
        <div>
          Body:
          <textarea
            required
            type="text"
            id="body"
            name="body"
          ></textarea>
        </div>
        <div>
          Author:
          <input required type="text" id="author" name="author"></input>
        </div>
        <div>
          Background color:
          <select name="background">
            <option value="#FFEEEE">Pale Pink</option>
            <option value="#D1FFFF">Cyan</option>
            <option value="#EEFFF7">Mint</option>
          </select>
        </div>
        <button>Add a Post</button>
      </form>
    </div>
  );
};

export default Home;
