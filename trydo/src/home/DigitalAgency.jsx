import React, { Fragment, useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import { slideSlick } from "../page-demo/script";
import ServiceList from "../elements/service/ServiceList";
import Header from "../component/header/Header";
import FooterTwo from "../component/footer/FooterTwo";
import PortfolioList from "../elements/portfolio/PortfolioList";
import Brand from "../elements/Brand";
import CallAction from "../elements/callaction/CallAction";
import TabOne from "../elements/tab/TabOne";
import Helmet from "../component/common/Helmet";
import Team from "../elements/Team";
import { endpoint, postsUrl } from '../helpers/API_Routes'
import axios from 'axios';
import { Link } from "react-router-dom";

const SlideList = [
    {
        textPosition: 'text-center',
        bgImage: 'bg_image--20',
        category: '',
        title: 'Marketing',
        description: 'There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration.',
        buttonText: 'Contact Us',
        buttonLink: '/contact'
    },
    {
        textPosition: 'text-center',
        bgImage: 'bg_image--21',
        category: '',
        title: 'Development.',
        description: 'There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration.',
        buttonText: 'Contact Us',
        buttonLink: '/contact'
    },
    {
        textPosition: 'text-center',
        bgImage: 'bg_image--22',
        category: '',
        title: 'UX Research.',
        description: 'There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration.',
        buttonText: 'Contact Us',
        buttonLink: '/contact'
    },
    {
        textPosition: 'text-center',
        bgImage: 'bg_image--23',
        category: '',
        title: 'UX Research.',
        description: 'There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration.',
        buttonText: 'Contact Us',
        buttonLink: '/contact'
    }
]

const DigitalAgency = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = useCallback(()=> {
        axios.get(`${postsUrl}?order=desc&sort=createdAt&limit=3`).then(res => {
            setPosts(res.data.posts);
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }, []);

    useEffect(()=> {
        fetchPosts()
    }, [fetchPosts])
    
    let title = 'About',
    description = 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum,';
    return(
        <Fragment> 
            
            <Helmet pageTitle="Digital Agency" />

            {/* Start Header Area  */}
            <Header logo="light" color="color-white"/>
            {/* End Header Area  */}
            
            {/* Start Slider Area   */}
            <div className="slider-wrapper color-white">
                <div className="slider-activation slider-digital-agency">
                    <Slider className="rn-slick-dot dot-light" {...slideSlick}>
                        {SlideList.map((value , index) => (
                            <div className={`slide slide-style-2 fullscreen d-flex align-items-center justify-content-center bg_image ${value.bgImage}`} key={index} data-black-overlay="2">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className={`inner ${value.textPosition}`}>
                                                {value.category ? <span>{value.category}</span> : ''}
                                                {value.title ? <h1 className="title">{value.title}</h1> : ''}
                                                {value.description ? <p className="description">{value.description}</p> : ''}
                                                {value.buttonText ? <div className="slide-btn"><a className="rn-button-style--2 btn-primary-color" href={`${value.buttonLink}`}>{value.buttonText}</a></div> : ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                    
                </div>
            </div>
            {/* End Slider Area   */}

            {/* Start Service Area  */}
            <div className="service-area pt--120 pb--50 bg_color--1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title text-center service-style--3 mb--30">
                                <h2 className="title">Our Service</h2>
                                <p>We create complex products, from the initial idea and formulation of product strategy, through building a prototype and testing it with users, right to the creation of the product itself.</p>
                            </div>
                        </div>
                    </div>
                    <ServiceList item="6" column="col-lg-4 col-md-6 col-sm-6 col-12 text-center" />
                </div>
            </div>  
            {/* End Service Area  */} 

            {/* Start Portfolio Area */}
            <div className="portfolio-area ptb--120 bg_image bg_image--3">
                <div className="portfolio-sacousel-inner">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title text-center service-style--3 mb--15">
                                    <h2 className="title">Our Project</h2>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <PortfolioList styevariation="text-center mt--40" column="col-lg-4 col-md-6 col-sm-6 col-12" item="6" />
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="view-more-btn mt--60 text-center">
                                    <a className="rn-button-style--2 btn-solid" href="/portfolio"><span>View More</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Portfolio Area */}

            {/* Start About Area */}
            <div className="about-area ptb--120  bg_color--1">
                <div className="about-wrapper">
                    <div className="container">
                        <div className="row row--35">
                            <div className="col-lg-5">
                                <div className="thumbnail">
                                    <img className="w-100" src="/assets/images/about/about-3.jpg" alt="About Images"/>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="about-inner inner">
                                    <div className="section-title">
                                        <h2 className="title">{title}</h2>
                                        <p className="description">{description}</p>
                                    </div>
                                    <div className="row mt--30">
                                        <TabOne tabStyle="tab-style--1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End About Area */}

            {/* Start Team Area  */}
            <div className="rn-team-area ptb--120 bg_color--1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title service-style--3 text-center mb--25 mb_sm--0">
                                <h2 className="title">Skilled Team</h2>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <Team column="col-lg-4 col-md-6 col-sm-6 col-12" limit={3} />
                    </div>
                </div>
            </div>
            {/* End Team Area  */}

            {/* Start Blog Area */}
            <div className="rn-blog-area pt--120 pb--80 bg_color--1">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-lg-12">
                            <div className="section-title text-center service-style--3">
                                <h2>Latest News</h2>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mt--60">
                        {posts.map((value , i ) => (
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={i}>
                                <div className="blog blog-style--1 text-center">
                                    <div className="thumbnail">
                                        <Link to={`/blog/${value._id}`}>
                                            <img className="w-100" src={`${endpoint}${value.thumb}`} alt="Post thumbnail"/>
                                        </Link>
                                    </div>
                                    <div className="content">
                                        <p className="blogtype">{value.category.name}</p>
                                        <h4 className="title"><Link to={`/blog/${value._id}`}>{value.title}</Link></h4>
                                        <div className="blog-btn">
                                            <Link className="rn-btn text-white" to={`/blog/${value._id}`}>Read More</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="view-more-btn mt--20 text-center">
                                <Link className="rn-button-style--2 btn-solid" to="/blog"><span>View More</span></Link>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
            {/* End Blog Area */}

            {/* Start Brand Area */}
            <div className="rn-brand-area ptb--120 bg_color--5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title text-center service-style--3 mb--30">
                                <h2 className="title">Our Clients</h2>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 mt--40">
                            <Brand branstyle="branstyle--2" />
                        </div>
                    </div>
                </div>
            </div>
            {/* End Brand Area */}
            
            {/* Start call To Action  */}
            <CallAction />
            {/* End call To Action  */}

            {/* Start Footer Style  */}
            <FooterTwo />
            {/* End Footer Style  */}
            {/* Start Back To Top */}
            <div className="backto-top">
                <ScrollToTop showUnder={160}>
                    <FiChevronUp />
                </ScrollToTop>
            </div>
            {/* End Back To Top */}
        </Fragment>
    )
    
}

export default DigitalAgency;