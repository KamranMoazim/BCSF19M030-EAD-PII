import React from 'react'

const ListComponent = ({list,title}:{list:string[], title:string}) => {
    return (

        <div className="col-md-12 mb-4">
            <div className="card shadow">
                <div className="card-header mbg-dark text-white">
                    <h4 className="card-title text-white">{title}</h4>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {list.map((item, index) => (
                            <li key={index} className="list-group-item list-group-item-action">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default ListComponent