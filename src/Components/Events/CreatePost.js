import React, { useState } from 'react';


const CreatePost = ({ addNewPost, categories }) => {
  const [post, setPost] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    addNewPost(post);
    setPost({ title: '', content: '', category: '' }); // Reset the form
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input
        type="text"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        placeholder="Post title"
        className="post-title"
      />
      <textarea
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
        placeholder="What's on your mind?"
        className="post-content"
      />

      <select
        value={post.category}
        onChange={(e) => setPost({ ...post, category: e.target.value })}
        className="post-category"
      >
        <option value="">Select a Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
      <button type="submit" className="post-submit">Add Post</button>
    </form>
  );
};

export default CreatePost;
