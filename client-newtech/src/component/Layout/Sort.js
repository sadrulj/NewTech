import React, { useState } from 'react'
import { BiSortDown } from "react-icons/bi"
const Sort = () => {


    return (
        <div>
            <div className="container dropdown d-flex justify-content-end">
                <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Sort <BiSortDown />
                </button>
                <ul className="dropdown-menu">
                    <li><span className="dropdown-item">Price (lowest)</span></li>
                    <li><span className="dropdown-item">Price (highest)</span></li>
                    <li><span className="dropdown-item">Ascending (a-z)</span></li>
                    <li><span className="dropdown-item">Descending (z-a)</span></li>
                </ul>
            </div>
        </div>
    )
}

export default Sort
