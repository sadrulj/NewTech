import React, { useState, useEffect } from 'react'
import AdminMenu from '../../component/Layout/AdminMenu.js'
import Layout from '../../component/Layout/Layout.js'
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../component/Form/CategoryForm.js';
import { Modal } from "antd";

const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState("");
    const [updatedName, setUpdatedName] = useState("");

    //handle Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const categoryData = new FormData();
            categoryData.append("name", name);
            categoryData.append("photo", photo);
            console.log(categoryData);
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,
                categoryData
            );

            if (data?.success) {
                toast.success(`${name} is created`);
                setName("")
                setPhoto("")
                getAllCategory()
            } else {
                toast.error(data.message);
            }
            console.log(data);
        } catch (error) {
            console.log(error);
            toast.error("something went wrong in input form");
        }

    };
    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting category");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);


    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const categoryData = new FormData();
            categoryData.append("name", name);
            photo && categoryData.append("photo", photo);

            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
                categoryData
            );
            if (data.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    //delete category
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(
                `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`
            );
            if (data.success) {
                toast.success(`category is deleted`);

                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };
    return (
        <Layout title={'Categories'}>
            <div className="container-fluid m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Category</h1>
                        <div className="p-3 w-50">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter new category"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary" style={{ position: "inherit", marginTop: "10px" }}>
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo && (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={"100px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c, i) => (

                                        <tr key={i}>
                                            <td >{c.name}</td>

                                            <td>
                                                <button
                                                    className="btn btn-primary ms-2"
                                                    onClick={() => {
                                                        setVisible(true);
                                                        setUpdatedName(c.name);
                                                        setSelected(c);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger ms-2"
                                                    onClick={() => {
                                                        handleDelete(c._id);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal
                            onCancel={() => setVisible(false)}
                            footer={null}
                            open={visible}
                        >
                            <CategoryForm
                                value={updatedName}
                                setValue={setUpdatedName}
                                handleSubmit={handleUpdate}
                            />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory
