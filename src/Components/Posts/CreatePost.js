import React, { useState } from 'react'; // Import React and useState hook



// Define the CreatePost functional component with addNewPost and categories props

const CreatePost = ({ addNewPost, categories }) => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    category: '',
  });


  const handleItemClick = (categoryName) => {
    setPost({ ...post, category: categoryName });
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    addNewPost(post); // Call addNewPost function with current post state
    setPost({ title: '', content: '', category: '' }); // Reset the form
  };

  return (// Start of JSX block for rendering the form
    <form onSubmit={handleSubmit} className="post-form">
      <input
        type="text"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        placeholder="Post title"
        className="post-title"
      />
      <textarea
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
        placeholder="What's on your mind?"
        className="post-content"
      />


      <div className="category-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-item ${post.category === category.name ? 'clicked' : ''}`}
            onClick={() => handleItemClick(category.name)}
          >
            {category.name === "Crafts" ?
              <img src={`${process.env.PUBLIC_URL}/${category.image}`} alt={category.name} /> :
              <img src={`${process.env.PUBLIC_URL}/${category.image}`.replace(".jpg", ".JPG")} alt={category.name} />}
            <p>{category.name}</p>
          </div>
        ))}
      </div>


      {/*<select
        value={post.category}
        onChange={(e) => setPost({ ...post, category: e.target.value })}
        className="post-category"
      >
        <option value="">Select a Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
        </select>*/}
      <button className="post-submit" type="submit" >Add Post</button>
    </form>
  );
};

export default CreatePost;