import React, { useState, useEffect } from "react";
import ResourceService from "../../Services/ResourceService";
import ResourceTable from "./ResourceTable";
import CreatenewResource from "./CreateResource";
import categories from "../../Types/categories"
import ResourcesFilter from "./ResourcesFilter";

export default function DraftsPage() {

    const [resources, setResources] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);
    const [isResourcesLoading, setIsResourcesLoading] = useState(false);

    useEffect(() => {
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

    const handleAddResource = async (newResource) => {
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

    const handleRemoveResource = async (res2Del) => {
        ResourceService.delete(res2Del.id);
        setResources(resources.filter((res) => {
            return res.id !== res2Del.id;
        }))
    }

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