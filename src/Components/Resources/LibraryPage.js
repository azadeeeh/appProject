import React, { useState, useEffect } from "react";
import ResourceService from "../../Services/ResourceService";
import ResourceTable from "./ResourceTable";
import ResourcesFilter from "./ResourcesFilter";
import categories from "../../Types/categories";

export default function DraftsPage() {

    const [resources, setResources] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);
    const [isResourcesLoading, setIsResourcesLoading] = useState(false);

    useEffect(() => {
        async function fetchResources() {
            setIsResourcesLoading(true);
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
            {!isResourcesLoading && <ResourceTable resources={filteredResources} handleDelResource={handleRemoveResource} />}
        </>
    )
}