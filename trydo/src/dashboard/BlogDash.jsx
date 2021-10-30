import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import {useSelector} from 'react-redux'
import PostsModal from './modals/PostsModal'
import CategoryModal from './modals/CategoryModal'
import {postsUrl, postsDetailUrl, categoriesUrl, categoriesDetailUrl, endpoint} from '../helpers/API_Routes';
import Loader from './Loader/Loader.jsx';
import avatrPng from '../images/avatar.png';

const BlogDash = () => {
    const [show, setShow] = useState(false)
    const [showCat, setShowCat] = useState(false)
    const [updateMood, setUpdateMood] = useState(false)
    const [updateMoodcat, setUpdateMoodcat] = useState(false)
    const [updatePosts, setUpdatePosts] = useState({})
    const [updatecat, setUpdatecat] = useState({})
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [categories, setCategories] = useState([])

    const {user} = useSelector(state => state)
    console.log(updatecat)

    const fetchPosts = useCallback(() => {
        setLoading(true)
        axios.get(`${postsUrl}/?order=desc&limit=1000&sort=createdAt`, { headers: { token: `Bearer ${user.token}` } })
        .then(res => {
            setPosts(res.data.posts)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }, [user.token])
    
    const fetchCategories = useCallback(() => {
        setLoading(true)
        axios.get(categoriesUrl, { headers: { token: `Bearer ${user.token}` } })
        .then(res => {
            setCategories(res.data.categories)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }, [user.token])
    
    const deleteSinglePost = (id) => {
        setLoading(true)
        axios.delete(postsDetailUrl(id), { headers: { token: `Bearer ${user.token}` } })
        .then(res => {
            fetchPosts()
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }
    
    const deleteSingleCategory = (id) => {
        setLoading(true)
        axios.delete(categoriesDetailUrl(id), { headers: { token: `Bearer ${user.token}` } })
        .then(res => {
            fetchCategories()
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchPosts()
        fetchCategories()
    }, [fetchPosts, fetchCategories])

    const toggleUpdateMood = (post) => {
        setUpdateMood(true);
        setUpdatePosts(post)
        setShow(true);
    }
    
    const toggleUpdateMoodCategory = (cat) => {
        setUpdateMoodcat(true);
        setUpdatecat(cat)
        setShowCat(true);
    }

    return (
        <div className="team services-container">
            { show && <PostsModal postsTitle='Add a New Post' handleClose={() => setShow(false)} fetchPosts={fetchPosts} postUpdate={updatePosts} updateMood={updateMood} /> }
            { showCat && <CategoryModal categoryTitle='Add a New Category' handleClose={() => setShowCat(false)} fetchCategories={fetchCategories} updatecat={updatecat} updateMood={updateMoodcat} /> }
            <div className="recent-grid" style={{gridTemplateColumns: '4fr 2fr'}}>
                <div className="projects">
                    <div className="card">
                        <div className="card-header">
                            <h2>Posts List</h2>
                            <button onClick={() => {setShow(true); setUpdatePosts({}); setUpdateMood(false)}}>
                                Create <span className="fas fa-arrow-right" />{" "}
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                {loading && <Loader />}
                                <table width="100%">
                                    <thead>
                                        <tr>
                                            <td>Title</td>
                                            <td>Overview</td>
                                            <td>Thumb</td>
                                            <td>Category</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {posts && posts.map(post => (

                                            <tr key={post._id}>
                                                <td title={post.title}>{post.title.length >= 10 ? post.title.slice(0, 10) + '...' : post.title}</td>
                                                <td title={post.overview}>{post.overview.length >= 10 ? post.overview.slice(0, 10) + '...' : post.overview}</td>
                                                <td>
                                                    <img src={endpoint + post.thumb || avatrPng} alt="post" width='40px' height='40px' />
                                                </td>
                                                <td>{post.category.name}</td>
                                                <td>
                                                    <i className="fas fa-edit" onClick={() => toggleUpdateMood(post)}></i>
                                                    <i className="fas fa-times" onClick={() => deleteSinglePost(post._id)}></i>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="projects">
                    <div className="card">
                        <div className="card-header">
                            <h2>Categories</h2>
                            <button onClick={() => {setShowCat(true); setUpdatecat({}); setUpdateMoodcat(false)}}>
                                Create <span className="fas fa-arrow-right" />{" "}
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                {loading && <Loader />}
                                <table width="100%">
                                    <thead>
                                        <tr>
                                            <td>#</td>
                                            <td>Name</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories && categories.map((category, i) => (

                                            <tr key={category._id}>
                                                <td>{i+1}</td>
                                                <td>{category.name.length >= 25 ? category.name.slice(0, 25) + '...' : category.name}</td>
                                                <td>
                                                    <i className="fas fa-edit" onClick={() => toggleUpdateMoodCategory(category)}></i>
                                                    <i className="fas fa-times" onClick={() => deleteSingleCategory(category._id)}></i>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDash;
