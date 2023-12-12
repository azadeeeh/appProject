import React, { useEffect, useState } from "react";
import EventButton from "../Events/EventButton";
import PostFilter from "./PostFilter";
import PostList from "./PostList";
import CreatePost from "./CreatePost";
import PostService from "../../Services/PostService";

export default function PostsPage({ showAddPost }) {

    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [categories,] = useState(['Crafts', 'Outdoor', 'Technology', 'Cooking']); // Example categories

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
        <>
            <EventButton />
            {showAddPost && <CreatePost addNewPost={handleAddPost} categories={categories} />}
            <PostFilter categories={categories} filterPosts={filterPosts} />
            <PostList posts={filteredPosts} />
        </>
    )
}