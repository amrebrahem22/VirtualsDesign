import React, { useState, useEffect, useCallback } from "react";
import { FaFacebookF , FaLinkedinIn } from "react-icons/fa";
import { endpoint, teamUrl } from '../helpers/API_Routes'
import axios from 'axios'
import { Link } from 'react-router-dom'
import PageHelmet from "../component/common/Helmet";
import Breadcrumb from "../elements/common/Breadcrumb";
import CounterOne from "../elements/counters/CounterOne";
import BrandTwo from "../elements/BrandTwo";
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";


const About = () =>{
    const [team, setTeam] = useState([]);

    const fetchTeam = useCallback(()=> {
        axios.get(teamUrl).then(res => {
            setTeam(res.data.team);
        }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        fetchTeam();
    }, [fetchTeam])

    let title = 'About',
    description = 'Since 2002, we’ve been helping leading European and North American technology companies create their software products by assembling and managing world-class engineering teams in Eastern Europe. We’ve established a comprehensive system of tools and practices to ensure quick ramp-up, the right cultural fit, high productivity, and great quality of our software development services.';
    return(
        <React.Fragment>
            <PageHelmet pageTitle='About' />

            <Header headertransparent="header--transparent" colorblack="color--black" logoname="logo.png" />
            {/* Start Breadcrump Area */}
            <Breadcrumb title={'About'}   />
            {/* End Breadcrump Area */}

            {/* Start About Area  */}
            <div className="rn-about-area ptb--120 bg_color--1">
                <div className="rn-about-wrapper">
                    <div className="container">
                        <div className="row row--35 align-items-center">
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
                                        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="about-us-list">
                                                <h3 className="title">Who we are</h3>
                                                <p>VirtualsDesign is a trusted supplier of software development services operating in Ukraine, Poland, Germany, UAE and Saudi Arabia. With over 2000 experienced specialists, we deliver solutions as a software development company.</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="about-us-list">
                                                <h3 className="title">Our mission</h3>
                                                <p>As a midsize software development company, we combine the best of both worlds. We have the focus and speed of the small IT outsourcing companies along with the scalability and expertise of the big ones.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End About Area  */}

                {/* Start CounterUp Area */}
                <div className="rn-counterup-area pb--120 bg_color--1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title text-center">
                                <h3 className="fontWeight500">Our Fun Facts</h3>
                            </div>
                        </div>
                    </div>
                    <CounterOne />
                </div>
            </div>
            {/* End CounterUp Area */}

            {/* Start Finding Us Area  */}
            <div className="rn-finding-us-area rn-finding-us bg_color--1">
                <div className="inner">
                    <div className="content-wrapper">
                        <div className="content">
                            <h4 className="theme-gradient">Find Your Work Now</h4>
                            <p>The company opened yet another office and recruited more skilled employees. And as far as app development is concerned, the company successfully completed 1800+ app building with the 100% ratio of succes</p>
                            <a className="rn-btn btn-white" href="/about">Get Started</a>
                        </div>
                    </div>
                    <div className="thumbnail">
                        <div className="image">
                            <img src="/assets/images/about/finding-us-01.png" alt="Finding Images"/>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Finding Us Area  */}

            {/* Start Team Area  */}
            <div className="rn-team-area bg_color--1 ptb--120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title service-style--3 text-center mb--25">
                                <h2 className="title">Skilled Team</h2>
                                <p>With our platform engineering expertise and your product vision, we can create a thriving ecosystem of integrated solutions and service providers so you can tap into economies of scale without being anchored by production costs.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                    {team.slice(0, 3).map((value , i ) => (
                        <div className={`col-lg-4 col-md-6 col-sm-6 col-12`} key={i}>
                            <div className="team">
                                <div className="thumbnail">
                                    <img src={`${endpoint}${value.picture}`} alt="Team Member"/>
                                </div>
                                <div className="content">
                                    <h4 className="title">{value.name}</h4>
                                    <p className="designation">{value.major}</p>
                                </div>                      
                                <ul className="social-icon" >
                                    <li><Link target="_blank" to={{pathname: `${value.facebook}`}}><FaFacebookF /></Link></li>
                                    <li><Link target="_blank" to={{pathname: `${value.linkedin}`}}><FaLinkedinIn /></Link></li>
                                </ul>
                            </div>
                        </div>
                    ))}

                    </div>
                </div>
            </div>
            {/* End Team Area  */}

            {/* Start Brand Area */}
            <div className="rn-brand-area brand-separation bg_color--5 ptb--120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <BrandTwo />
                        </div>
                    </div>
                </div>
            </div>
            {/* End Brand Area */}

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
export default About