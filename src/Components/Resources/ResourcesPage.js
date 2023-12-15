import React, { useState, useEffect } from "react";
import ResourceService from "../../Services/ResourceService";
import PostService from "../../Services/PostService";
import ResourceTable from "./ResourceTable";
import CreatenewResource from "./CreateResource";

export default function ResourcesPage() {

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
                    setResources(fetchedResources);
                    setIsResourcesLoading(false);
                }).catch((err) => {
                    console.error("Error happened while fetching resources: ", err.message)
                    setIsResourcesLoading(false);
                })
        }
        fetchPosts();
        fetchResources();
    }, []);

    const handleAddResource = async (newResource) => {
        newResource.date = new Date().getTime();
        newResource.userRateIds = [];
        newResource.rates = [];
        
        ResourceService.add(
            newResource
        ).then((addedResource) => {
            setResources(prevResources => [addedResource, ...prevResources]);
        }).catch((err) => {
            console.error("Error happened while adding new resource: ", err.message);
        })
    }

    return (
        <>
            {(!isPostsLoading && !isResourcesLoading) && <CreatenewResource addNewResource={handleAddResource} posts={posts} />}
            {(!isPostsLoading && !isResourcesLoading) && <ResourceTable resources={resources} posts={posts} />}
        </>
    )
}