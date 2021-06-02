import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({variant, children}) => {
    return (
        <Alert className= "mx-1 px-3 " variant={variant}>
            {children}
        </Alert>
    )
}

export default Message

