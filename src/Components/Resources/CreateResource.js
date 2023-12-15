import React, { useState, useEffect } from 'react';
import "./CreateResource.css"

const CreateResource = ({ addNewResource, posts }) => {
  const [newResource, setNewResource] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    addNewResource(newResource);
    setNewResource({ content: '', hobbyId: '', date: '' }); // Reset the form
  };

  return (
    <form onSubmit={handleSubmit} className="newResource-form">
      <textarea
        value={newResource.content}
        onChange={(e) => setNewResource({ ...newResource, content: e.target.value })}
        placeholder="Enter a content for you resource"
        className="newResource-content"
      />
      
      <select
        value={newResource.hobbyId}
        onChange={(e) => setNewResource({ ...newResource, hobbyId: e.target.value })}
        htmlFor="hobbyId"
        className="newResource-hobby"
      >
        <option value="">Select a Hobby</option>
        {posts.map((hobby, index) => (
          <option key={index} value={hobby.id}>{hobby.title}</option>
        ))}
      </select>
      <button type="submit" className="newResource-submit">Add New Resource</button>
    </form>
  );
};

export default CreateResource;
