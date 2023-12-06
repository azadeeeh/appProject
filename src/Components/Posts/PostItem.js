import React from 'react';
import '../App/App.css';
import StarRating from './StarRating';

let hardCodedUser = { "id": 1 };

const PostItem = ({ post }) => {
  return (
    <li>
      <StarRating canSpin={true} loggedInUser={hardCodedUser} post={post} starCount={5} />
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <small>Category: {post.category}</small>
    </li>
  );
};

export default PostItem;
