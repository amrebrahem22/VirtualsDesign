import React, { useState, useEffect, useCallback } from "react";
import PageHelmet from "../component/common/Helmet";
import { FiClock , FiUser , FiMessageCircle } from "react-icons/fi";
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import axios from 'axios';
import moment from 'moment'
import { postsDetailUrl, endpoint, commentsUrl } from '../helpers/API_Routes'
import avatarPng from '../images/avatar.png'
import draftToHtml from "draftjs-to-html";
import Loader from "../elements/Loader/Loader";


const BlogDetails = (props) => {
    const [post, setPost] = useState({author: {username: ''}, comments: []});
    const [comment, setComment] = useState({name: '', email: '', website: '', content: '', postId: props.match.params.id})
    const [loading, setLoading] = useState(false)

    const fetchPost = useCallback(()=> {
        axios.get(postsDetailUrl(props.match.params.id))
        .then(res => {
            setPost(res.data.post)
            console.log(res.data.post)
        })
        .catch(err => console.log(err))
    }, [props.match.params.id]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    const handleChange = e => {
        setComment({...comment, [e.target.name]: e.target.value})
    }

    const submitComment = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.post(commentsUrl, comment)
        .then(res => {
            setComment({name: '', email: '', website: '', content: '', postId: props.match.params.id})
            fetchPost();
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    return(
        <React.Fragment>
            <PageHelmet pageTitle={`Blog ${post.title}`} />
            <Header headertransparent="header--transparent" colorblack="color--black" logoname="logo.png" />
            
            {/* Start Breadcrump Area */}
            <div className="rn-page-title-area pt--120 pb--190 bg_image bg_image--7" data-black-overlay="7">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="blog-single-page-title text-center pt--100">
                                <h2 className="title theme-gradient">{post.title}</h2>
                                <ul className="blog-meta d-flex justify-content-center align-items-center">
                                    <li><FiClock />{moment(post.createdAt).fromNow()}</li>
                                    <li><FiUser />{post.author.username}</li>
                                    <li><FiMessageCircle />{post.comments.length} Comments</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Breadcrump Area */}

            {/* Start Blog Details */}
            <div className="rn-blog-details pt--110 pb--70 bg_color--1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-wrapper">
                                <div className="inner">
                                    <p>{post.overview}</p>
                                    <div className="thumbnail">
                                        <img src={`${endpoint}${post.thumb}`} alt={post.title}/>
                                    </div>
                                </div>
                                {post.desc && <div className="view-content" dangerouslySetInnerHTML={{__html: draftToHtml(JSON.parse(post.desc))}}></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Blog Details */}
            <div className="comments-list">
                <div className="container" style={{position: 'relative'}}>
                    <h2>Comments</h2>
                    {post.comments.map(comment => (
                        <div className="single-comment-display">
                            <div className="info">
                                <img src={avatarPng} alt='comment' />
                                <h4>{comment.name}</h4>
                            </div>
                            <div className="comment">{comment.content}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Start BLog Comment Form  */}
            <div className="blog-comment-form pb--120 bg_color--1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12" style={{position: 'relative'}}>
                            {loading && <Loader />}
                            <div className="inner">
                                <h3 className="title mb--40 fontWeight500">Leave a Reply</h3>
                                <form onSubmit={submitComment} method="POST">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-12 col-12">
                                            <div className="rnform-group">
                                                <input type="text" placeholder="Name" value={comment.name} name="name" onChange={handleChange} />
                                            </div>
                                            <div className="rnform-group">
                                                <input type="email" placeholder="Email" value={comment.email} name="email" onChange={handleChange} />
                                            </div>
                                            <div className="rnform-group">
                                                <input type="text" placeholder="Website" value={comment.website} name="website" onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12 col-12">
                                            <div className="rnform-group">
                                                <textarea type="text" placeholder="Comment" value={comment.content} name="content" onChange={handleChange} ></textarea>
                                            </div>
                                            
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="blog-btn">
                                                {/* <a className="rn-button-style--2 btn-solid" href="#"></a> */}
                                                <button type="submit" className="rn-button-style--2 btn-solid"><span>SEND MESSAGE</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End BLog Comment Form  */}

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
export default BlogDetails;