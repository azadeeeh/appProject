import React, { useState } from 'react';
import "./CreateResource.css";
import categories from '../../Types/categories';

const CreateResource = ({ addNewResource }) => {
  // State for the newResource that is going to be sent to the MockAPI
  const [newResource, setNewResource] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // The following function is given to this component as a prop from its parent
    addNewResource(newResource);
    setNewResource({ content: '', category: '', date: '' }); // Reset the form with default resource values
  };

  return (
    <form onSubmit={handleSubmit} className="newResource-form">
      <textarea
        value={newResource.content}
        onChange={(e) => setNewResource({ ...newResource, content: e.target.value })}
        placeholder="Enter a content for you resource"
        className="newResource-content"
        required
      />

      <select
        value={newResource.category}
        onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
        htmlFor="category"
        className="newResource-category"
        required
      >
        <option value="">Select a category:</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
      <button type="submit" className="newResource-submit">Add New Resource</button>
    </form>
  );
};

export default CreateResource;
