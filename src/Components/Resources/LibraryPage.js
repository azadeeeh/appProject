import React, { useState, useEffect } from "react";
import ResourceService from "../../Services/ResourceService";
import PostService from "../../Services/PostService";
import ResourceTable from "./ResourceTable";

export default function DraftsPage() {

    const [posts, setPosts] = useState([]);
    const [resources, setResources] = useState([]);
    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [isResourcesLoading, setIsResourcesLoading] = useState(false);

    useEffect(() => {
        async function fetchPosts() {
            setIsPostsLoading(true);
            await PostService.getAll()
                .then(fetchedPosts => {
                    setPosts(fetchedPosts);
                    setIsPostsLoading(false);
                }).catch((err) => {
                    console.error("Error happened while fetching posts: ", err.message)
                    setIsPostsLoading(false);
                })
        }
        async function fetchResources() {
            setIsResourcesLoading(true);
            await ResourceService.getAll()
                .then(fetchedResources => {
                    let filteredResources = fetchedResources.filter((res) => { return res.rates.length > 5 && ((res.rates.reduce((sum, prevRate) => { return sum + prevRate }, 0) / res.rates.length) >= 4.5) })
                    setResources(filteredResources);
                    setIsResourcesLoading(false);
                }).catch((err) => {
                    console.error("Error happened while fetching resources: ", err.message)
                    setIsResourcesLoading(false);
                })
        }
        fetchPosts();
        fetchResources();
    }, []);

    return (
        <>
            {(!isPostsLoading && !isResourcesLoading) && <ResourceTable resources={resources} posts={posts} />}
        </>
    )
}