import React, { useState, useEffect } from 'react'
import AdminMenu from '../../component/Layout/AdminMenu.js'
import Layout from '../../component/Layout/Layout.js'
import axios from 'axios'
import { useAuth } from '../../component/Context/auth.js';
import moment from 'moment';
import { Select } from 'antd'

const { Option } = Select;

const AdminOrder = () => {
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "delivered", "cancel"])
    const [orders, setOrders] = useState([])
    const [auth] = useAuth()

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`)
            setOrders(data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])

    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, {
                status: value,
            });
            getOrders(data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout title={"All Orders"}>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h4>All Orders</h4>
                    {orders?.map((o, i) => {
                        return (
                            <div className="border shadow" key={i}>
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
                                            <td>
                                                <Select
                                                    bordered={false}
                                                    onChange={(value) => handleChange(o._id, value)}
                                                    defaultValue={o?.status}
                                                >
                                                    {status.map((s, i) => (
                                                        <Option key={i} value={s}>
                                                            {s}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </td>
                                            <td>{o?.buyer?.name}</td>
                                            <td>{moment(o?.createAt).fromNow()}</td>
                                            <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                            <td>{o?.products?.length}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="container">
                                    {o?.products?.map((p, i) => (
                                        <div className="row" key={i}>
                                            <div className="col">
                                                <img
                                                    src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                                                    className="card-img-top"
                                                    alt={p.name}
                                                    style={{ width: "150px", height: "150px" }}
                                                />
                                            </div>
                                            <div className="col">
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
        </Layout>
    )
}

export default AdminOrder
