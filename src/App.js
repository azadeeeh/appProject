import './App.css';
import axios from 'axios';
import logo from './images/hlogo.png';
import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import PostFilter from './PostFilter';
import CreatePost from './CreatePost';
import EventButton from './EventButton';


const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://654166c1f0b8287df1fe51c2.mockapi.io/hobby')
        .then(response => {
            setPosts(response.data);
            setFilteredPosts(response.data);
        })
        .catch(error => console.error('Error:', error));
  }, []);


  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState(['Crafts', 'Outdoor', 'Technology', 'Cooking']); // Example categories

  const addNewPost = (newPost) => {
    axios.post('https://654166c1f0b8287df1fe51c2.mockapi.io/hobby', newPost)
    .then(response => {
        setPosts(prevPosts => [response.data, ...prevPosts]);
        setFilteredPosts(prevFilteredPosts => [response.data, ...prevFilteredPosts]);
    })
    .catch(error => console.error('Error:', error));
  };


  const filterPosts = (category) => {
    if (!category || category === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => post.category === category);
      setFilteredPosts(filtered);
    }
  };

  return (
    <div>
      <header>
        <img className="logo" src={logo} alt="Home Page" />
        <PostFilter categories={categories} filterPosts={filterPosts} />
        <EventButton />


      </header>
      <hr className="hrStyle" />

      <CreatePost addNewPost={addNewPost} categories={categories} />
      <PostList posts={filteredPosts} />
      <footer>
        <p> Hobby Hut &copy; 2023</p>
      </footer>
    </div>
  );
};

export default App;
