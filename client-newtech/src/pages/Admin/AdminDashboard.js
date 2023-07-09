import React from 'react'
import AdminMenu from '../../component/Layout/AdminMenu.js'
import Layout from '../../component/Layout/Layout.js'
import { useAuth } from '../../component/Context/auth.js'

const AdminDashboard = () => {
    const [auth] = useAuth()
    return (
        <Layout title={'Admin Dashboard'}>
            <div className="container card p-3 my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h4>Admin Dashboard : E-Commerce App</h4>
                        <div className="card p-3">
                            <h5> Admin Name : {auth?.user?.name}</h5>
                            <h5> Admin Email : {auth?.user?.email}</h5>
                            <h5> Admin Contact : {auth?.user?.phone}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard
