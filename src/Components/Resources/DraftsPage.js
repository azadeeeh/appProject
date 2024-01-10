import React, { useState, useEffect } from "react";
import ResourceService from "../../Services/ResourceService";
import ResourceTable from "./ResourceTable";
import CreatenewResource from "./CreateResource";
import categories from "../../Types/categories"
import ResourcesFilter from "./ResourcesFilter";

export default function DraftsPage() {

    // state for setting the list of resources 
    const [resources, setResources] = useState([]);
    // state for setting the list of filtered resources 
    const [filteredResources, setFilteredResources] = useState([]);
    // state for which is false by default. It is only true when the content is being loaded in the useEffect. It could be used to create a loading component in thn future! 
    const [isResourcesLoading, setIsResourcesLoading] = useState(false);

    /* The `useEffect` hook is used to perform side effects in functional components. In this case, the
    `useEffect` hook is used to fetch resources from the server and update the state variables
    `resources`, `filteredResources`, and `isResourcesLoading` accordingly. */
    useEffect(() => {
        /**
         * The function fetches resources using ResourceService.getAll() and updates the state
         * variables with the fetched resources.
         */
        async function fetchResources() {
            setIsResourcesLoading(true);
            await ResourceService.getAll()
                .then(fetchedResources => {
                    setResources(fetchedResources);
                    setFilteredResources(fetchedResources);
                    setIsResourcesLoading(false);
                }).catch((err) => {
                    console.error("Error happened while fetching resources: ", err.message)
                    setIsResourcesLoading(false);
                })
        }
        fetchResources();
    }, []);

    /**
     * The function `handleAddResource` adds a new resource to a list of resources, with a timestamp
     * and empty user rate IDs and rates.
     * @param newResource - The `newResource` parameter is an object that represents the new resource
     * to be added. It should have the following properties:
     */
    const handleAddResource = async (newResource) => {
        /* The line `newResource.date = new Date().getTime() / 1000;` is setting the `date` property of
        the `newResource` object to the current timestamp in seconds. */
        newResource.date = new Date().getTime() / 1000;
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

    /**
     * The function `handleRemoveResource` deletes a resource from a list and updates the list
     * accordingly.
     * @param res2Del - The parameter `res2Del` is an object representing the resource that needs to be
     * removed. It has a property `id` which is used to identify the resource to be deleted.
     */
    const handleRemoveResource = async (res2Del) => {
        ResourceService.delete(res2Del.id);
        // Set resources after removing the deleted resource form the list
        setResources(resources.filter((res) => {
            return res.id !== res2Del.id;
        }))
    }

    /**
     * The function `filterResources` filters an array of resources based on a specified category.
     * @param resourceCategory - The resourceCategory parameter is a string that represents the
     * category of resources that you want to filter.
     */
    const filterResources = (resourceCategory) => {
        if (!resourceCategory || resourceCategory === '') {
            setFilteredResources(resources);
        } else {
            setFilteredResources(resources.filter(resource => resource.category === resourceCategory));
        }
    };

    return (
        <>
            <ResourcesFilter handleFilterResrouces={filterResources} categories={categories} />
            {!isResourcesLoading && <CreatenewResource addNewResource={handleAddResource} />}
            {!isResourcesLoading && <ResourceTable resources={filteredResources} handleDelResource={handleRemoveResource} />}
        </>
    )
}