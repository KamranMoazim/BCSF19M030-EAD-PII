import React from 'react'

interface StatusGridProps {
    keys:string[]
    labels:string[]
}

const StatusGridComponent = ({keys, labels}:StatusGridProps) => {
    return (
        <div>
            <h3>
                Student Status Grid
            </h3>
            <table className="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th scope="col">Student Status</th>
                        <th scope="col">Count</th>
                    </tr>
                </thead>
                <tbody>
                    {labels.map((label, index) => (
                        <tr key={index}>
                            <th scope="row">{keys[index]}</th>
                            <th scope="row">{label}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default StatusGridComponent