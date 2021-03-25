import './ShowZip.css';
import React from 'react'

export default function ShowZip({ data, zip, coincidencias }) {

    if (zip.length < 5 && zip.length > 0 && coincidencias.length === 0) {
        return (
            <div className='container'>
                <p>No se encontraron coincidencias, prueba con otro código zip!</p>
            </div>
        )
    }

    if (data === undefined || zip.length < 5) {
        return null
    }

    if (data === null) {
        return (
            <div className='container'>
                <p>No se encontraron coincidencias, prueba con otro código zip!</p>
            </div>
        )
    }

    return (
        <div className='container'>
            <p><span>Postal Code: </span>{ data.PostalCode }</p>
            <p><span>Department: </span>{ data.Department }</p>
            <p><span>Municipality: </span>{ data.Municipality }</p>
            <p><span>Neighbourhood: </span>{ data.Neighbourhood }</p>
        </div>
    )
}


