import './ShowZip.css';
import React from 'react'

export default function ShowZip({ data, zip, coincidencias }) {

    if (zip.length < 5 && zip.length > 0 && coincidencias.length === 0) {
        return (
            <div className='show-zip'>
                <p>No matches found, try another zip code!</p>
            </div>
        )
    }

    if (data === undefined || zip.length < 5) {
        return null
    }

    if (data === null) {
        return (
            <div className='show-zip'>
                <p>No matches found, try another zip code!</p>
            </div>
        )
    }

    return (
        <div className='show-zip'>
            <p><span>Postal Code: </span>{ data.PostalCode }</p>
            <p><span>Department: </span>{ data.Department }</p>
            <p><span>Municipality: </span>{ data.Municipality }</p>
            <p><span>Neighbourhood: </span>{ data.Neighbourhood }</p>
        </div>
    )
}


