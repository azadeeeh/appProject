import '../App/App.css'; // Importing the stylesheet for the application
import React, { useEffect, useState } from 'react'; // Importing React and its hooks
import PostList from '../Posts/PostList'; // Importing the PostList component
import PostFilter from '../Posts/PostFilter'; // Importing the PostFilter component
import CreatePost from '../Events/CreatePost'; // Importing the CreatePost component
import EventButton from '../Events/EventButton'; // Importing a component for event-related actions
import CreateEvent from '../Events/CreateEvent'; // Importing a component for creating events
import PostService from '../../Services/PostService'; // Importing a service for handling posts
import { Routes, Route } from 'react-router-dom'; // Importing React Router for navigation
import Navbar from '../NavBar/navbar'; // Importing the Navbar component

const App = () => {
  // useState hooks for managing the state of posts and filtered posts
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  // Hardcoded categories for filtering purposes
  const [categories,] = useState(['Crafts', 'Outdoor', 'Technology', 'Cooking']);

  // useEffect hook to fetch posts when the component mounts
  useEffect(() => {
    async function fetchPosts() {
      await PostService.getAllPosts()
        .then(fetchedPosts => {
          // Setting the fetched posts to state
          setPosts(fetchedPosts);
          setFilteredPosts(fetchedPosts);
        }).catch((err) => {
          console.error("Error happened while fetching posts: ", err.message)
        })
    }
    fetchPosts();
  }, []);

  // Function to handle adding a new post
  const handleAddPost = async (newPost) => {
    PostService.addPost(newPost)
      .then((addedPost) => {
        // Updating the state with the new post
        setPosts(prevPosts => [addedPost, ...prevPosts]);
        setFilteredPosts(prevFilteredPosts => [addedPost, ...prevFilteredPosts]);
      }).catch((err) => {
        console.error("Error happened while adding new post: ", err.message);
      })
  }

  // Function to filter posts based on category
  const filterPosts = (category) => {
    if (!category || category === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => post.category === category);
      setFilteredPosts(filtered);
    }
  };

  // JSX for rendering the application
  return (
    <div>
      <header>
        <Navbar />
        <PostFilter categories={categories} filterPosts={filterPosts} />
      </header>

      <hr className="hrStyle" />

      <EventButton />

      <Routes>
        <Route index element={<CreatePost addNewPost={handleAddPost} categories={categories} />} />
        <Route index element={<PostList posts={filteredPosts} />} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>

      <PostList posts={filteredPosts} />

      <footer>
        <p> Hobby Hut &copy; 2023</p>
      </footer>
    </div>
  );
};

export default App;
