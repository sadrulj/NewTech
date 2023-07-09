import React from 'react'
import featured1 from '../Images/featured1.jpg'
import featured2 from '../Images/featured2.jpg'
import featured3 from '../Images/featured3.jpg'


const Features = () => {

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col">
                    <a href=""><img src={featured1} className="img-thumbnail" alt="..."></img></a>
                </div>
                <div className="col">
                    <a href=""><img src={featured2} className="img-thumbnail" alt="..."></img></a>
                </div>
                <div className="col">
                    <a href=""><img src={featured3} className="img-thumbnail" alt="..."></img></a>
                </div>
            </div>
        </div>
    )
}

export default Features
