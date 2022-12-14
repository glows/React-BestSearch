import React from 'react'
import "./Head.css"

import { useNavigate } from "react-router-dom";
const Head = (props) => {
    let navigate = useNavigate()

    return (
        <div className='headWrap'>
            <div className='title'
                onClick={() => {
                    navigate("/")
                }}
            ><span>Best</span>Search</div>

            <div className='shortTitle'>
                ST
            </div>

            <div className='extra'> {props?.children}</div>
        </div>
    )
}

export default Head