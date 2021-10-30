import React, { useState, useEffect, useCallback } from 'react'
import PageHelmet from "../component/common/Helmet";
import Breadcrumb from "../elements/common/Breadcrumb";
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import { Link } from 'react-router-dom';
import { portfolioUrl, endpoint } from '../helpers/API_Routes.js'
import axios from 'axios';


const Portfolio = () => {
    const [portfolio, setPortfolio] = useState([])
    const [pices, setPices] = useState(6)

    const fetchPortfolio = useCallback((pices) => {
        axios.get(portfolioUrl)
        .then(res => {
            setPortfolio(res.data.portfolio.slice(0, pices))
        }).catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        fetchPortfolio(pices)
    }, [fetchPortfolio, pices])

    return (
        <>
            <PageHelmet pageTitle='Our Work' />

            {/* Start Header Area  */}
            <Header headertransparent="header--transparent" colorblack="color--black" logoname="logo.png" />
            {/* End Header Area  */}
            
            {/* Start Breadcrump Area */}
            <Breadcrumb title={'Portfolio'}   />
            {/* End Breadcrump Area */}

            {/* Start Page Wrapper  */}
            <main className="page-wrapper">


                {/* Start Portfolio Area */}
                <div className="portfolio-area ptb--120 bg_color--1">
                    <div className="portfolio-sacousel-inner">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-title text-center service-style--3 mb--30">
                                        <h2 className="title">All Works</h2>
                                        <p>VirtualsDesign show you a list of some Previous Work in verious majors, like Web Development, and Web Design, Mobile App Development, Graphic design and etc...</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {portfolio.map((value , index) => (
                                    <div className={`col-lg-4 col-md-6 col-sm-6 col-12`} key={index}>
                                        <div className={`portfolio text-left mt--40`}>
                                            <div className="thumbnail-inner">
                                                <div className='thumbnail' style={{backgroundImage: `url(${endpoint}${value.thumb.replace('\\', '/')})`}}></div>
                                                <div className='bg-blr-image' style={{backgroundImage: `url(${endpoint}${value.thumb.replace('\\', '/')})`}}></div>
                                            </div>
                                            <div className="content">
                                                <div className="inner">
                                                    <p>{value.category}</p>
                                                    <h4><a href="/portfolio-details">{value.title}</a></h4>
                                                    <div className="portfolio-button">
                                                        <Link to={`/portfolio/${value._id}`} className="rn-btn">View Details</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link className="link-overlay" to={`/portfolio/${value._id}`}></Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {(portfolio.length >= pices) && (<div className="row">
                                <div className="col-lg-12">
                                    <div className="view-more-btn mt--60 text-center">
                                        <button className="rn-button-style--2 btn-solid" onClick={()=> setPices(pices + pices)}><span>View More Project</span></button>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
                {/* End Portfolio Area */}

            </main>
            {/* End Page Wrapper  */}

            {/* Start Back To Top */}
            <div className="backto-top">
                <ScrollToTop showUnder={160}>
                    <FiChevronUp />
                </ScrollToTop>
            </div>
            {/* End Back To Top */}
            
            {/* Start Footer Area  */}
            <Footer />
            {/* End Footer Area  */}

        </>
        
    )
}

export default Portfolio;