import '../App/App.css';
import logo from '../../Assets/images/hlogo.png';
import React, { useEffect, useState } from 'react';
import PostList from '../Posts/PostList';
import PostFilter from '../Posts/PostFilter';
import CreatePost from '../Events/CreatePost';
import EventButton from '../Events/EventButton';
import PostService from '../../Services/PostService';


const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      await PostService.getAllPosts()
        .then(fetchedPosts => {
          setPosts(fetchedPosts);
          setFilteredPosts(fetchedPosts);
        }).catch((err) => {
          console.error("Error happened while fetching posts: ", err.message)
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
