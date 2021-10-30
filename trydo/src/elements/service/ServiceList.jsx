import React, { useState, useEffect, useCallback } from 'react'
import { FiCast , FiLayers , FiUsers , FiMonitor } from "react-icons/fi";
import axios from 'axios'
import { servicesUrl } from '../../helpers/API_Routes.js'
import { Link } from 'react-router-dom';

const ServiceList = [<FiCast /> , <FiLayers/>, <FiUsers/> , <FiMonitor/> , <FiLayers/>, <FiUsers/>]

const ServiceThree = props => {
    const {column } = props;
    const [services, setServices] = useState([])

    const fetchServices = useCallback(() => {
        axios.get(servicesUrl)
        .then(res => {
            setServices(res.data.service)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        fetchServices()
    }, [fetchServices])

    return(
        <React.Fragment>
            <div className="row">
                {services.map( (val , i) => (
                    <div className={`${column}`} key={i}>
                        <Link to={`/services/${val._id}`}>
                            <div className="service service__style--2">
                                <div className="icon">
                                    {ServiceList[i]}
                                </div>
                                <div className="content">
                                    <h3 className="title">{val.title}</h3>
                                    <p>{val.desc.slice(0, 100)}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </React.Fragment>
    )
}

export default ServiceThree;
