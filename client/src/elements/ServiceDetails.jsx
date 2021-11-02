import React, { useState, useEffect, useCallback } from "react";
import PageHelmet from "../component/common/Helmet";
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import { servicesCildrenUrl, servicesDetailUrl } from "../helpers/API_Routes";
import { FiCast , FiLayers , FiUsers , FiMonitor } from "react-icons/fi";

import axios from "axios";

const ServiceList = [<FiCast /> , <FiLayers/>, <FiUsers/> , <FiMonitor/> , <FiLayers/>, <FiUsers/>]

const ServiceDetails = (props) => {
    const [service, setService] = useState({})
    const [items, setitems] = useState([])

    const fetchService = useCallback(() => {
        axios.get(servicesDetailUrl(props.match.params.id)).then(res => {
            console.log(res.data.service)
            setService(res.data.service)
        }).catch(err => {
            console.log(err)
        })
    }, [props.match.params.id]) 
    
    const fetchItems = useCallback(() => {
        axios.get(servicesCildrenUrl(props.match.params.id)).then(res => {
            console.log(res.data.service)
            setitems(res.data.service)
        }).catch(err => {
            console.log(err)
        })
    }, [props.match.params.id]) 

    useEffect(()=> {
        fetchService()
        fetchItems()
    }, [fetchService, fetchItems])

    return(
        <React.Fragment>
            
            {/* Start Pagehelmet  */}
            <PageHelmet pageTitle={`Services | ${service.title}`} />
            {/* End Pagehelmet  */}

            <Header headertransparent="header--transparent" colorblack="color--black" logoname="logo.png" />

            {/* Start Breadcrump Area */}
            <div className="rn-page-title-area pt--120 pb--190 bg_image bg_image--5"  data-black-overlay="5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="rn-page-title text-center pt--100">
                                <h2 className="title theme-gradient">{service.title}</h2>
                                <p style={{width: '70%', margin: 'auto'}}>{service.desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Breadcrump Area */}

            {/* Start Page Wrapper */}
            <div className="rn-service-details ptb--120">
                <div className="">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* Start Service Area */}
                            <div className="service-area">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="section-title text-center mb--30">
                                                <h2>{service.title}</h2>
                                                <p style={{width: '70%', margin: 'auto'}}>{service.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row service-one-wrapper">
                                    {items.map( (val , i) => (
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
                                </div>
                            </div>
                            {/* End Service Area */}
                        </div>
                    </div>
                </div>
            </div>
            {/* End Page Wrapper */}
            
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

export default ServiceDetails;