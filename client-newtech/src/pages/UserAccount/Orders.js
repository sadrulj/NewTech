import React, { useState, useEffect } from 'react'
import Layout from '../../component/Layout/Layout.js'
import UserMenu from '../../component/Layout/UserMenu';
import axios from 'axios';
import { useAuth } from '../../component/Context/auth.js';
import moment from 'moment';

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [auth] = useAuth()

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`)
            setOrders(data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])
    return (
        <Layout title={'Orders'}>
            <div className="container d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h4>All Orders</h4>
                        {orders?.map((o, i) => {
                            return (
                                <div className="border shadow mb-3">
                                    <table className="table table-success table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Buyer</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Payment</th>
                                                <th scope="col">Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{o?.status}</td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createAt).fromNow()}</td>
                                                <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                <td>{o?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="container">
                                        {o?.products?.map((p, i) => (
                                            <div className="row d-flex">
                                                <div className="col-md-6">
                                                    <img
                                                        src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                                                        className="card-img-top"
                                                        alt={p.name}
                                                        style={{ width: "150px", height: "150px" }}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{p.name}</p>
                                                    <p>{p.description.substring(0, 30)}</p>
                                                    <p>Price : {p.price}</p>
                                                </div>
                                                <hr />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders
