import React from 'react'

const ListComponent = ({list,title}:{list:string[], title:string}) => {
    return (
        // <div>
        //     <p>{title}</p>
        //     <ul>
        //         {list.map((item, index) => (
        //             <li key={index}>{item}</li>
        //         ))}
        //     </ul>
        // </div>
        <div className="col-md-6">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">{title}</h4>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {list.map((item, index) => (
                            <li key={index} className="list-group-item">{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ListComponent