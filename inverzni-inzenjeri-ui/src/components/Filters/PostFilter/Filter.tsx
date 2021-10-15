import React, {useState} from "react";
import CheckBox from "./CheckBox";
import "./Filter.css"

export default function Filter() {

    const [Filters, setFilters] = useState({objave: []});

    const handleFilters = (filters, category) => {
        const newFilters = {...Filters}
        newFilters[category] = filters
        setFilters(newFilters)
    }

    return (
        <CheckBox
            handleFilters={filters => handleFilters(filters, "objave")}
        />
    )
}