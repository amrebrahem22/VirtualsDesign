import React, { useState, useEffect, useCallback } from 'react'
import { FiCast , FiLayers , FiUsers , FiMonitor, FiChevronUp } from "react-icons/fi";
import axios from 'axios'
import { servicesUrl, servicesCildrenUrl } from '../helpers/API_Routes.js'
import { Link } from 'react-router-dom';
import PageHelmet from "../component/common/Helmet";
import Breadcrumb from "../elements/common/Breadcrumb";
import ScrollToTop from 'react-scroll-up';
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";


const ServiceList = [<FiCast /> , <FiLayers/>, <FiUsers/> , <FiMonitor/> , <FiLayers/>, <FiUsers/>]

const SingleService = ({id}) => {
    const [items, setItems] = useState([])

    const fetchItems = useCallback(() => {
        axios.get(servicesCildrenUrl(id)).then(res => {
            console.log(res.data.service)
            setItems(res.data.service)
        }).catch(err => {
            console.log(err)
        })
    }, [id]) 

    useEffect(() => {
        fetchItems()
    }, [fetchItems])

    return (
        <>
            {items.map((val , i) => (
                <div className={`col-lg-4 col-md-6 col-sm-6 col-12 text-center`} key={i}>
                    <div className="service service__style--2">
                        <div className="icon">
                            {ServiceList[i]}
                        </div>
                        <div className="content">
                            <h3 className="title">{val.title}</h3>
                            <p>{val.desc.slice(0, 100)}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

const Service = () => {
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
            <PageHelmet pageTitle='Service' />
            <Header headertransparent="header--transparent" colorblack="color--black" logoname="logo.png" />

            {/* Start Breadcrump Area */}
            <Breadcrumb title={'Service'}   />
            {/* End Breadcrump Area */}

            {/* Start Service Area */}
            {services.map(service => (<div className="service-area ptb--120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title text-center mb--30">
                                <h2><Link to={`/service/${service._id}`} style={{color: 'rgb(243 25 92)'}}>{service.title}</Link></h2>
                                <p>{service.desc}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row service-one-wrapper">
                        <SingleService id={service._id} />
                    </div>
                </div>
            </div>))}
            {/* End Service Area */}

            {/* Start Back To Top */}
            <div className="backto-top">
                <ScrollToTop showUnder={160}>
                    <FiChevronUp />
                </ScrollToTop>
            </div>
            {/* End Back To Top */}
            
            <Footer />


        </React.Fragment>
    )
}
export default Service;