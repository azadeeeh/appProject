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
    

    const Categories = [
        { name: "Crafts", image: '../../images/crafts.jpg' },
        { name: "Outdoor", image: '../../images/outdoor.jpg' },
        { name: "Photography", image: '../../images/photography.jpg' },
        { name: "Writing", image: '../../images/writing.jpg' },
        { name: "Reading", image: '../../images/reading.jpg' },
        { name: "Cooking", image: '../../images/cooking.jpg' },
        { name: "Gardening", image: '../../images/gardening.jpg' },
        { name: "Knitting and Crocheting", image: '../../images/knitting.jpg' },
        { name: "Woodworking", image: '../../images/woodworking.jpg' },
        { name: "Sculpting", image: '../../images/sculpting.jpg' },
        { name: "Ski and Snowboard", image: '../../images/ski.jpg' },
        { name: "Playing Musical Instruments", image: '../../images/musical.jpg' },
        { name: "Dancing", image: '../images/dancing.jpg' },
        { name: "Hiking", image: '../../images/hiking.jpg' },
        { name: "Camping", image: '../../images/camping.jpg' },
        { name: "Fishing", image: '../../images/fishing.jpg' },
        { name: "Bird Watching", image: '../../images/bird.jpg'},
        { name: "Yoga and Meditation", image: '../../images/yoga.jpg' },
        { name: "Fitness and Exercise", image: '../../images/fitness.jpg' },
        { name: "Running", image: '../../images/running.jpg' },
        { name: "Cycling", image: '../../images/cycling.jpg' },
        { name: "Swimming", image: '../../images/swimming.jpg' },
        { name: "Singing", image: '../../images/singing.jpg' },
        { name: "Acting and Theater", image: '../../images/acting.jpg' },
        { name: "DIY and Crafts", image: '../../images/DIY.jpg' },
        { name: "Collecting (Stamps, Coins, etc.)", image: '../../images/collecting.jpg' },
        { name: "Gaming", image: '../../images/gaming.jpg' },
        { name: "Traveling", image: '../../images/travelling.jpg' },
        { name: "Chess and Board Games", image: '../../images/chess.jpg' },
        { name: "Model Building", image: '../../images/model.jpg' },
        { name: "Metalworking", image: '../../images/metal.jpg' },
        { name: "Fashion Design", image: '../../images/fashion.jpg' }
      ];

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
            {showAddPost && <CreatePost addNewPost={handleAddPost} categories={Categories} />} {/*conditional rendering of component CreatPost if showAddPost is True*/}

            <PostList posts={filteredPosts} /> {/*rendering component post with the prop filteredPsots*/}
        </>
    )
}