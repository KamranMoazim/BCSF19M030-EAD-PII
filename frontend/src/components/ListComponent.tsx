import React from 'react'

const ListComponent = ({list,title}:{list:string[], title:string}) => {
    return (
        <div>
            <p>{title}</p>
            <ul>
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default ListComponent