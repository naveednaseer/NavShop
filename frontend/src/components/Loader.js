import React from 'react'
import { Spinner } from 'react-bootstrap'

export const Loader = () => {
    return (
        <div>
        <Spinner
            animation='grow'
            role='status'
            style={{
                height: '25px',
                width: '25px',
                margin: 'auto',
                marginTop: '160px',
                display:'block',
                color: "#78c2ad"
            }}
        >
            <span className='sr-only'>Loading....</span>
        </Spinner>
            
        <Spinner
            animation='grow'
            role='status'
            style={{
                height: '35px',
                width: '35px',
                margin: 'auto',
                marginTop: '15px',
                display:'block',
                color: "#78c2ad"
            }}
        >
            <span className='sr-only'>Loading....</span>
        </Spinner>


        <Spinner
            animation='grow'
            role='status'
            style={{
                height: '45px',
                width: '45px',
                margin: 'auto',
                marginTop: '15px',
                display:'block',
                color: "#78c2ad"
            }}
        >
            <span className='sr-only'>Loading....</span>
        </Spinner>
        </div>
    )
}


export default Loader