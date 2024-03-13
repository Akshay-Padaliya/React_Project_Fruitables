import React from 'react'
import { useParams } from 'react-router-dom'

export default function UseParams() {

    const { fname } = useParams();

    return (
        <div>
             {/* Single Page Header start */}
             <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">WelCome {fname}</h1>
                
                {/* <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Shop</li>
                </ol> */}
            </div>
            {/* Single Page Header End */}
        </div>
    )
}

