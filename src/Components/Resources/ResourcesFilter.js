import React from 'react'; // Importing React to use its features
import '../App/App.css'; // Importing the stylesheet for styling

// Defining the ResrouceFilter functional component. It takes 'categories' and 'handleFilterResrouces' as props.
const ResourcesFilter = ({ categories, handleFilterResrouces }) => {
  return (
    // Returning a select dropdown element
    // Default option to show all categories
    // Mapping over the 'categories' prop to create an option for each category
    // Displaying the category name in each option
    
    <select className="filter-category-button" onChange={(e) => handleFilterResrouces(e.target.value)}>
      
      <option value="">All Categories</option>
      
      {categories.map((category, index) => (
        <option key={index} value={category}>
          
          {category}
        </option>
      ))}
    </select>
  );
};

export default ResourcesFilter; // Exporting the ResrouceFilter component for use in other parts of the application
