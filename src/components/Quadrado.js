import React from 'react'

export default function Quadrado(props) {
    return (
        <button className="quadrado" onClick={props.onClick}>
            {props.value}
        </button>
    )
}