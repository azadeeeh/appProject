import React from 'react';
import './App.css';

const PostItem = ({ post }) => {

  const borderWidth = Math.min(10, Math.max(1, post.content.length / 100)); // Example calculation

  const itemStyle = {
    borderWidth: `${borderWidth}px`
  };

  return (
    <li style={itemStyle}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <small>Category: {post.category}</small>
      {/* Add any additional post details here */}
    </li>
  );
};

export default PostItem;
