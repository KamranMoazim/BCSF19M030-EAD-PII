import React from 'react'

interface StatusGridProps {
    keys:string[]
    labels:string[]
}

const StatusGridComponent = ({keys, labels}:StatusGridProps) => {
    return (
        <div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Status</th>
                        {keys.map((key) => (
                            <th scope="col" key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {labels.map((label, index) => (
                        <tr key={index}>
                            <th scope="row">{label}</th>
                            {/* {keys.map((key) => (
                                <td>...</td>
                            ))} */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default StatusGridComponent