import React, { useEffect } from "react";
import { getDetail, resetDetail } from "../action/index"
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import "./Detail.css"

const Detail = () => {
    const { idPais } = useParams()
    const detail = useSelector((state) => state.detail)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getDetail(idPais))
        return () =>{
            dispatch(resetDetail())
        }
    }, [])

    return (
        <div className="detail_container">
            <nav className="brand_detail">
                <Link to="/home" className="home_detail">
                    <span>Country</span>
                </Link>
            </nav>
            <h2>Detail</h2>
            <div className="detail_info">
                {!detail ? (
                    <h2>no country yet.!!</h2>
                ) : (
                    <div className="detail_header">
                        <div className="image_detail">
                            <img src={detail.image} alt="" />
                        </div>
                        <div className="detail_ambos">

                            <div>
                                <h2>id: {detail.id}</h2>
                            </div>
                            <div>
                                <h2>Name: {detail.name}</h2>
                            </div>
                            <div>
                                <h2>Capiral: {detail.capital}</h2>
                            </div>
                            <div>
                                <h2>Continent: {detail.continents}</h2>
                            </div>
                            <div>
                                <h2>Subregion: {detail.subregion}</h2>
                            </div>
                            <div>
                                <h2>Population: {detail.population}</h2>
                            </div>
                            <div>
                                <h2>Area: {detail.area}</h2>
                            </div>
                            <div>
                                <h2>Activities: </h2>
                                {
                                    detail.activities.length > 0 ? detail.activities.map(activity => {
                                        return (
                                            <div key={activity.id}>
                                                <h2>{activity.name}</h2>
                                                <h2>{activity.difficulty}</h2>
                                                <h2>{activity.duration}</h2>
                                                <h2>{activity.season}</h2>
                                            </div>
                                        )
                                    }) : (
                                        <h3>Not Activities</h3>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </div>

    )

}

export default Detail

