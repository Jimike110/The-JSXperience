import { useState } from "react";

const Create = () => {
  const API = "https://retoolapi.dev/v0yzGZ/data";

  const [posts, setPosts] = useState([]);

  const addPost = async (e) => {
    e.preventDefault();

    const newPost = {
      title: e.target.title.value,
      body: e.target.body.value,
      author: e.target.author.value,
      background: e.target.background.value,
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
      window.alert(error);
    }
  };

  return (
    <form id="create" method="post" onSubmit={addPost}>
      <h2>Add a New Post</h2>
      <div>
        Title:
        <input required type="text" id="title" name="title"></input>
      </div>
      <div>
        Body:
        <textarea required type="text" id="body" name="body"></textarea>
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
  );
};

export default Create;
