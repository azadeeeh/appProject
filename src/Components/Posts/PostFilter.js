import React from 'react'; // Importing React to use its features
import '../App/App.css'; // Importing the stylesheet for styling

// Defining the PostFilter functional component. It takes 'categories' and 'filterPosts' as props.
const PostFilter = ({ categories, filterPosts }) => {
  return (
    // Returning a select dropdown element
    // Default option to show all categories
    // Mapping over the 'categories' prop to create an option for each category
    // Displaying the category name in each option
    
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

export default PostFilter; // Exporting the PostFilter component for use in other parts of the application
