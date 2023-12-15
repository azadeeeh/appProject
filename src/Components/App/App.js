import '../App/App.css';
// import React, { useEffect, useState } from 'react';
// import PostList from '../Posts/PostList';
// import PostFilter from '../Posts/PostFilter';
// import CreatePost from '../Posts/CreatePost';
// import EventButton from '../Events/EventButton';
import CreateEvent from '../Events/CreateEvent';
// import PostService from '../../Services/PostService';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../NavBar/navbar';
import PostsPage from '../Posts/PostsPage';
import ResourcesPage from '../Resources/ResourcesPage';



const App = () => {
  // const [posts, setPosts] = useState([]);
  // const [filteredPosts, setFilteredPosts] = useState([]);
  // const [categories,] = useState(['Crafts', 'Outdoor', 'Technology', 'Cooking']); // Example categories

  // useEffect(() => {
  //   async function fetchPosts() {
  //     await PostService.getAllPosts()
  //       .then(fetchedPosts => {
  //         setPosts(fetchedPosts);
  //         setFilteredPosts(fetchedPosts);
  //       }).catch((err) => {
  //         console.error("Error happened while fetching posts: ", err.message)
  //       })
  //   }
  //   fetchPosts();
  // }, []);

  // const handleAddPost = async (newPost) => {
  //   PostService.addPost(
  //     newPost
  //   ).then((addedPost) => {
  //     setPosts(prevPosts => [addedPost, ...prevPosts]);
  //     setFilteredPosts(prevFilteredPosts => [addedPost, ...prevFilteredPosts]);
  //   }).catch((err) => {
  //     console.error("Error happened while adding new post: ", err.message);
  //   })
  // }

  // const filterPosts = (category) => {
  //   if (!category || category === '') {
  //     setFilteredPosts(posts);
  //   } else {
  //     const filtered = posts.filter(post => post.category === category);
  //     setFilteredPosts(filtered);
  //   }
  // };

  return (
    <div>
      {/* <header>
          <img className="logo" src={logo} alt="Home Page" />
          <PostFilter categories={categories} filterPosts={filterPosts} />
        </header> */}
      <header>
        <Navbar />
        {/* <PostFilter categories={categories} filterPosts={filterPosts} /> */}
      </header>

      <hr className="hrStyle" />

      {/* <EventButton /> */}

      <Routes>
        <Route path='/Drafts' element={<ResourcesPage />} />
        <Route path='/Hobbies' element={<PostsPage showAddPost={true} />} />
        <Route path='/' element={<PostsPage showAddPost={false} />} />
        {/* <Route index element={<CreatePost addNewPost={handleAddPost} categories={categories} />} />
        <Route index element={<PostList posts={filteredPosts} />} /> */}
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>

      {/* <PostList posts={filteredPosts} /> */}

      <footer>
        <p> Hobby Hut &copy; 2023</p>
      </footer>
    </div>
  );
};

export default App;
