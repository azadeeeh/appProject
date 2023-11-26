import React from 'react';
import PostItem from './PostItem';
import './App.css';

const PostList = ({ posts }) => {
  return (
    <ul>
      {posts.map(post => <PostItem key={post.id} post={post} />)}
    </ul>
  );
};

export default PostList;
