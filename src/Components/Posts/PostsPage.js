import React, { useEffect, useState } from "react"; /*importing react for creating react component, importing usestate is a react hook for handling states and useEffect is a react hook to handle side effects*/
import PostFilter from "./PostFilter";
import PostList from "./PostList";
import CreatePost from "./CreatePost";
import PostService from "../../Services/PostService";

export default function PostsPage({ showAddPost }) { /*showAddPost is a prop which can be True or False*/

    const [posts, setPosts] = useState([]);{/*defining the states*/}
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [categories,] = useState(['Crafts', 'Outdoor', 'Technology', 'Cooking',"Drawing and Painting",
    "Photography",
    "Writing",
    "Reading",
    "Cooking",
    "Gardening",
    "Knitting and Crocheting",
    "Outdoor",
    "Woodworking",
    "Sculpting",
    "Ski and Snowboard",
    "Playing Musical Instruments",
    "Dancing",
    "Hiking",
    "Camping",
    "Fishing",
    "Bird Watching",
    "Yoga and Meditation",
    "Fitness and Exercise",
    "Running",
    "Cycling",
    "Swimming",
    "Singing",
    "Acting and Theater",
    "DIY and Crafts",
    "Collecting (Stamps, Coins, etc.)",
    "Gaming",
    "Traveling",
    "Chess and Board Games",
    "Model Building",
    "Metalworking",
    "Fashion Design"]); // Example categories

    useEffect(() => { {/*in case of fetching data, subscription, or manual DOM manipulation, we handle the states as below*/}
        async function fetchPosts() { /*asynchronous operations*/
            await PostService.getAll() /*pusue the execution of fetchPosts until the Promise returned by PostService.getAll() is resolved.*/
                .then(fetchedPosts => {/*when the promise is resolved the fetch data will be as fetchedposts*/
                    setPosts(fetchedPosts); {/*update the fetchPost by applying setposts and setfilteredposts on the featchdata*/}
                    setFilteredPosts(fetchedPosts);
                }).catch((err) => {
                    console.error("Error happened while fetching posts: ", err.message)
                })
        }
        fetchPosts();
    }, []); /*ensures that the effectState happens only once*/

    const handleAddPost = async (newPost) => { /*this function is for adding a new post and updating the added post by including the new post*/
        PostService.add(
            newPost
        ).then((addedPost) => {
            setPosts(prevPosts => [addedPost, ...prevPosts]);
            setFilteredPosts(prevFilteredPosts => [addedPost, ...prevFilteredPosts]);
        }).catch((err) => {
            console.error("Error happened while adding new post: ", err.message);
        })
    }

    const filterPosts = (category) => { /*is responsible for updating the state FilteredPost given the category*/
        if (!category || category === '') {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter(post => post.category === category);
            setFilteredPosts(filtered);
        }
    };

    return (
        <>

            <PostFilter categories={categories} filterPosts={filterPosts} /> {/*render postfilter component with two props: predefined categories and filteredposts function*/}
            {showAddPost && <CreatePost addNewPost={handleAddPost} categories={categories} />} {/*conditional rendering of component CreatPost if showAddPost is True*/}

            <PostList posts={filteredPosts} /> {/*rendering component post with the prop filteredPsots*/}
        </>
    )
}