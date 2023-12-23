import React from 'react'
import Layout from '../Layout'
import { Outlet, useNavigate } from 'react-router-dom'
import StudentTable from './StudentTable'

const StudentPage = () => {

    const navigation = useNavigate()

    return (
        <Layout>
            <button onClick={() => navigation("/")}>
                Home
            </button>
            <Outlet />
        </Layout>
    )
}

export default StudentPage