import React, { useState } from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    const [photo, setPhoto] = useState("");
    console.log(photo);
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter new category"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
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
                <button type="submit" className="btn btn-primary" >
                    Submit
                </button>
            </form>
        </>
    );
};

export default CategoryForm;