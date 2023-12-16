import React from 'react'; // Importing React to use its features
import PostItem from './PostItem'; // Importing the PostItem component
import '../App/App.css'; // Importing the stylesheet for styling

// Defining the PostList functional component. It receives 'posts' as a prop.
const PostList = ({ posts }) => {
  return (
    // Returning an unordered list element to display the list of posts
    // Mapping over the 'posts' array and rendering a PostItem for each post
    <ul>
      {posts.map(post => <PostItem key={post.id} post={post} />)}
    </ul>
  );
};

export default PostList; // Exporting the PostList component for use in other parts of the application
