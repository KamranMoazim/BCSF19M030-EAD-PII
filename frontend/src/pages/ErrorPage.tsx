import React from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const ErrorPage = () => {

    const error = useRouteError()

    return (
        <div>
            <h1>Oops...</h1>
            <div>
                {isRouteErrorResponse(error) ? <>Invalid Page</> : <>Unexptected Error</>}
            </div>
        </div>
    )
}

export default ErrorPage