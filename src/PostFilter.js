import React from 'react';
import './App.css';

const PostFilter = ({ categories, filterPosts }) => {
  return (
    <select className="filter-category-button" onChange={(e) => filterPosts(e.target.value)}>
      <option value="">All Categories</option>
      {categories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default PostFilter;
