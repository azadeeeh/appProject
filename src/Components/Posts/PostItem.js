import React from 'react';
import '../App/App.css';

const PostItem = ({ post }) => {

  return (
    <li>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <small>Category: {post.category}</small>
    </li>
  );
};

export default PostItem;
