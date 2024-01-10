import React, { useState, useEffect } from "react";
import ResourceService from "../../Services/ResourceService";
import ResourceTable from "./ResourceTable";
import ResourcesFilter from "./ResourcesFilter";
import categories from "../../Types/categories";

export default function DraftsPage() {


    /* `const [resources, setResources] = useState([]);` is declaring a state variable called
    `resources` and a function to update that state variable called `setResources`. The initial
    value of the `resources` state variable is an empty array `[]`. */
    const [resources, setResources] = useState([]);
    /* `const [filteredResources, setFilteredResources] = useState([]);` is declaring a state variable
    called `filteredResources` and a function to update that state variable called
    `setFilteredResources`. The initial value of the `filteredResources` state variable is an empty
    array `[]`. This state variable is used to store the filtered resources based on the selected
    category in the `ResourcesFilter` component. */
    const [filteredResources, setFilteredResources] = useState([]);
    /* `const [isResourcesLoading, setIsResourcesLoading] = useState(false);` is declaring a state
    variable called `isResourcesLoading` and a function to update that state variable called
    `setIsResourcesLoading`. The initial value of the `isResourcesLoading` state variable is
    `false`. */
    const [isResourcesLoading, setIsResourcesLoading] = useState(false);

    /* The `useEffect` hook is used to perform side effects in functional components. In this case, it
    is used to fetch resources from the server and update the state variables `resources`,
    `filteredResources`, and `isResourcesLoading`. */
    useEffect(() => {
        async function fetchResources() {
            /* `setIsResourcesLoading(true);` is updating the state variable `isResourcesLoading` to
            `true`. This is typically used to indicate that the resources are currently being
            fetched or loaded, and can be used to show a loading spinner or display a loading
            message to the user. */
            setIsResourcesLoading(true);
            /* The code `await ResourceService.getAll().then(fetchedResources => { ... }).catch((err)
            => { ... })` is fetching all the resources from MockAPI using the
            `ResourceService.getAll()` method. */
            await ResourceService.getAll()
                .then(fetchedResources => {
                    let filteredResources = fetchedResources.filter((res) => { return res.rates.length > 5 && ((res.rates.reduce((sum, prevRate) => { return sum + prevRate }, 0) / res.rates.length) >= 4.5) })
                    setResources(filteredResources);
                    setFilteredResources(filteredResources);
                    setIsResourcesLoading(false);
                }).catch((err) => {
                    console.error("Error happened while fetching resources: ", err.message)
                    setIsResourcesLoading(false);
                })
        }
        fetchResources();
    }, []);

    /**
     * The function `handleRemoveResource` deletes a resource from a list of resources and updates the
     * state.
     * @param res2Del - The parameter `res2Del` is an object representing the resource to be removed.
     * It should have an `id` property that uniquely identifies the resource.
     */
    const handleRemoveResource = async (res2Del) => {
        ResourceService.delete(res2Del.id);
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
            {!isResourcesLoading && <ResourceTable resources={filteredResources} handleDelResource={handleRemoveResource} />}
        </>
    )
}