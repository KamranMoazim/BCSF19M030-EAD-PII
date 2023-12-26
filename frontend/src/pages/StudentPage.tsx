import React from 'react'
import Layout from '../Layout'
import { Outlet } from 'react-router-dom'
import { FaUserGraduate } from 'react-icons/fa'

const StudentPage = () => {

    return (
        <Layout>
            <div className="container mt-4">
                <h1>Students Management<FaUserGraduate className="ms-2" /></h1>
                <Outlet />
            </div>
        </Layout>
    )
}

export default StudentPage