import './App.css';
import logo from './images/hlogo.png';
import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import PostFilter from './PostFilter';
import CreatePost from './CreatePost';
import EventButton from './EventButton';
import PostService from './Services/PostService';


const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      await PostService.getAllPosts()
        .then(fetchedPosts => {
          setPosts(fetchedPosts);
          setFilteredPosts(fetchedPosts);
        }).catch((err) => {
          console.error("Error happend while fetching posts: ", err.Message)
        })
    }
    fetchPosts();
  }, []);


  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState(['Crafts', 'Outdoor', 'Technology', 'Cooking']); // Example categories

  const handleAddPost = async (newPost) => {
    PostService.addPost(
      newPost
    ).then((addedPost) => {
      setPosts(prevPosts => [addedPost, ...prevPosts]);
      setFilteredPosts(prevFilteredPosts => [addedPost, ...prevFilteredPosts]);
    }).catch((err) => {

      console.error("Error happened while adding new post: ", err.message);
    })
  }

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

      <CreatePost addNewPost={handleAddPost} categories={categories} />
      <PostList posts={filteredPosts} />
      <footer>
        <p> Hobby Hut &copy; 2023</p>
      </footer>
    </div>
  );
};

export default App;
