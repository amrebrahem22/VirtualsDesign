import React, { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom';
import PageHelmet from "../component/common/Helmet";
import {FaTwitter ,FaInstagram ,FaFacebookF , FaLinkedinIn} from "react-icons/fa";
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import { endpoint, portfolioDetailUrl, portfolioUrl } from "../helpers/API_Routes";
import axios from 'axios';

const SocialShare = [
    {Social: <FaFacebookF /> , link: 'https://www.facebook.com/'},
    {Social: <FaLinkedinIn /> , link: 'https://www.linkedin.com/'},
    {Social: <FaInstagram /> , link: 'https://www.instagram.com/'},
    {Social: <FaTwitter /> , link: 'https://twitter.com/'},
]

const PortfolioDetails = (props) => {

    const [portfolio, setPortfolio] = useState({})
    const [items, setItems] = useState([]) 

    const fetchPortfolio = useCallback(() => {
        axios.get(portfolioDetailUrl(props.match.params.id)).then(res => {
            setPortfolio(res.data.post)
        }).catch(err => {
            console.log(err)
        })
    }, [props.match.params.id]) 
    
    const fetchItems = useCallback(() => {
        axios.get(portfolioUrl).then(res => {
            const itemsList = res.data.portfolio.filter(item => item._id !== props.match.params.id)
            setItems(itemsList.slice(0, 2))
        }).catch(err => {
            console.log(err)
        })
    }, [props.match.params.id]) 

    useEffect(()=> {
        fetchPortfolio();
        fetchItems();
    }, [fetchPortfolio, fetchItems])

    return(
        <React.Fragment>
            <PageHelmet pageTitle={`Portfolio | ${portfolio.title}`} />

            <Header headertransparent="header--transparent" colorblack="color--black" logoname="logo.png" />
            
            {/* Start Breadcrump Area */}
            <div className="rn-page-title-area pt--120 pb--190 bg_image bg_image--4"  data-black-overlay="7">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="rn-page-title text-center pt--100">
                                <h2 className="title theme-gradient">{portfolio.title}</h2>
                                <p>{portfolio.subtitle} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Breadcrump Area */}

            {/* Start Portfolio Details */}
            <div className="rn-portfolio-details ptb--120 bg_color--1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="portfolio-details">
                                <div className="inner">
                                    <h2>{portfolio.title}</h2>
                                    <p className="subtitle">{portfolio.subtitle}</p>
                                    <p><strong>Deliverables: </strong> {portfolio.deliverables}</p>

                                    <div className="portfolio-view-list d-flex flex-wrap">
                                        <div className="port-view">
                                            <span>Duration</span>
                                            <h4>{portfolio.duration}</h4>
                                        </div>

                                        <div className="port-view">
                                            <span>Technologies</span>
                                            <h4>{portfolio.technologies}</h4>
                                        </div>

                                        <div className="port-view">
                                            <span>Category</span>
                                            <h4>{portfolio.category}</h4>
                                        </div>
                                    </div>

                                    <div className="portfolio-share-link mt--20 pb--70 pb_sm--40">
                                        <ul className="social-share rn-lg-size d-flex justify-content-start liststyle mt--15">
                                            {SocialShare.map((val , i) => (
                                                <li key={i}><a href={`${val.link}`}>{val.Social}</a></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="portfolio-thumb-inner portfolio-item-split">
                                    <div className="thumb">
                                        <img src={endpoint + portfolio.thumb} alt="Portfolio Images" style={{width: '100%', height: 'auto'}}/>
                                    </div>
                                    <p><strong>Description: </strong> {portfolio.desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Portfolio Details */}

            {/* Start Related Work */}
            <div className="portfolio-related-work pb--120 bg_color--1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title text-center">
                                <span className="theme-color font--18 fontWeight600">Related Work</span>
                                <h2>Our More Projects</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt--10">
                        {items.map(item => (
                            <div className="col-lg-6 col-md-6 col-12" key={item._id}>
                            <div className="related-work text-center mt--30">
                                <div className="thumb">
                                    <Link to={`/portfolio/${item._id}`}>
                                        <img src={endpoint + item.thumb} alt="Portfolio-images"/>
                                    </Link>
                                </div>
                                <div className="inner">
                                    <h4><Link to={`/portfolio/${item._id}`}>{item.title}</Link></h4>
                                    <span className="category">{item.category}</span>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* End Related Work */}

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
export default PortfolioDetails;
