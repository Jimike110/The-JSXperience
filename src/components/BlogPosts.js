const BlogPosts = ({posts, title, deletePost, loader}) => {
  return (
    <div className="blog-posts">
        <h2>{title}</h2>
      {loader && <div>Loading...</div>}
      {posts.map((post) => (
        <div
          className="post-preview"
          key={post.id}
          style={{
            backgroundColor: post.background,
          }}
        >
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <span>Written by: {post.author}</span>
          <button onClick={() => deletePost(post.id)}>Delete Post</button>
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;
