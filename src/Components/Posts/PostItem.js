import React from 'react'; // Importing React to use its features
import '../App/App.css'; // Importing the stylesheet for styling
import StarRating from './StarRating'; // Importing a StarRating component

let hardCodedUser = { "id": 1 }; // Hardcoding a user object for demonstration purposes

// Defining the PostItem functional component. It receives a 'post' object as a prop.
const PostItem = ({ post }) => {
  return (
    // Returning a list item element for each post
    // Using the StarRating component to display ratings for the post
    // Displaying the post title
    // Displaying the post content
    // Displaying the category of the post
    
    <li>
      <StarRating canSpin={true} loggedInUser={hardCodedUser} post={post} starCount={5} averageStarDeciamlPoint={1} />
      
      <h3>{post.title}</h3>
      
      <p>{post.content}</p>
      
      <small>Category: {post.category}</small>
    </li>
  );
};

export default PostItem; // Exporting the PostItem component for use in other parts of the application
