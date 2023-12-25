import React from 'react'
import Layout from '../Layout'
import { Outlet, useNavigate } from 'react-router-dom'

const StudentPage = () => {

    const navigation = useNavigate()

    return (
        <Layout>
            {/* <button onClick={() => navigation("/students/")}>
                Students
            </button> */}
            <div className="container mt-4">
                <h1>Students</h1>
                <Outlet />
            </div>
        </Layout>
    )
}

export default StudentPage