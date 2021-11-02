import React, { useState, useEffect, useCallback } from "react";
import PageHelmet from "../component/common/Helmet";
import Breadcrumb from "../elements/common/Breadcrumb";
import Loader from "../elements/Loader/Loader";
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {endpoint, postsUrl} from '../helpers/API_Routes'
import axios from'axios'
import { Link } from "react-router-dom";

const Pagination = ({pagesNumber, page, updatePage}) => {
    let pagesList = [];

    for(let i = 1; i <= pagesNumber; i++) {
        pagesList.push(i);
    }

    return (
        <div className="row mt--20">
            <div className="col-lg-12">
                <div className="rn-pagination text-center">
                    <ul className="page-list">
                        {page > 1 && <li onClick={() => updatePage(page - 1)}><FaAngleLeft /></li>}
                        {pagesList.slice((page >= 3 ? (page - 3): 0), (page+3)).map((item, i) =>
                            (
                                <li className={item === page? "active" : ""} onClick={() => updatePage(item)}>{item}</li>
                            )
                        )}
                        {pagesNumber > page && <li onClick={() => updatePage(page + 1)}><FaAngleRight /></li>}
                    </ul>
                </div>
            </div>
        </div>
    )
}

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage]= useState(1);
    const [pagesNumber, setPagesNumber] = useState(1)
    const [loading, setLoading] = useState(false)

    const fetchPosts = useCallback((page)=> {
        setLoading(true)
        window.scrollTo(0, 400);
        axios.get(`${postsUrl}?order=desc&sort=createdAt&limit=6&page=${page}`).then(res => {
            setPosts(res.data.posts);
            setPagesNumber(res.data.pagesNumber)
            setLoading(false)
        })
        .catch(err => {
            console.log(err);
            setLoading(false)
        })
    }, []);

    useEffect(()=> {
        fetchPosts(page)
    }, [fetchPosts, page])

    const updatePage = pageNum => {
        setPage(pageNum)
    }

    return(
        <React.Fragment>
            <PageHelmet pageTitle='Blog' />

            <Header headertransparent="header--transparent" colorblack="color--black" logoname="logo.png" />
            {/* Start Breadcrump Area */}
            <Breadcrumb title={'Blog List'}   />
            {/* End Breadcrump Area */}


            {/* Start Blog Area */}
            <div className="rn-blog-area ptb--120 bg_color--1">
                <div className="container">
                    <div className="row" style={{position: 'relative'}}>
                        {loading && <Loader />}
                        {posts.map((value , i ) => (
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={i}>
                                <div className="blog blog-style--1">
                                    <div className="thumbnail">
                                        <Link to={`/blog/${value._id}`}>
                                            <img className="w-100" src={`${endpoint}${value.thumb}`} alt="Post"/>
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
                   <Pagination pagesNumber={pagesNumber} page={page} updatePage={updatePage}/>
                </div>
            </div>
            {/* End Blog Area */}
            
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
export default Blog;
