import React from 'react'
import Layout from '../../component/Layout/Layout.js'
import UserMenu from '../../component/Layout/UserMenu'
import { useAuth } from '../../component/Context/auth.js'

const UserDashboard = () => {
    const [auth] = useAuth()
    return (
        <Layout title={'Dashboard'}>
            <div className="container card p-3 my-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h4 className='text-center'>User Dashboard : E-Commerce App</h4>
                        <div className="card p-3">
                            <h5> User Name : {auth?.user?.name}</h5>
                            <h5> User Email : {auth?.user?.email}</h5>
                            <h5> User Contact : {auth?.user?.phone}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserDashboard
