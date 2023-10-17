import BlogPosts from "./BlogPosts";
import useFetch from "./useFetch";

const Home = () => {
  const API = "https://retoolapi.dev/v0yzGZ/data";

  const {data: posts, loader} = useFetch(API);

  return (
    <div className="home">
      {posts && (
        <BlogPosts
          posts={posts}
          title="All Blog Posts"
          loader={loader}
        />
      )}
      {posts && (
        <BlogPosts
          posts={posts.filter((post) => post.author === "Michael")}
          title="Posts by Michael"
          loader={loader}
        />
      )}
    </div>
  );
};

export default Home;
