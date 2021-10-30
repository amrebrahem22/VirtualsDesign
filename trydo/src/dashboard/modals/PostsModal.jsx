import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import avatrPng from '../../images/avatar.png';
import Loader from '../Loader/Loader.jsx';
import {postsUrl, postsDetailUrl, endpoint, categoriesUrl} from '../../helpers/API_Routes';

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";


const PostsModal = ({ handleClose, postsTitle, fetchPosts, postUpdate, updateMood }) => {

    const { user } = useSelector(state => state);
    const [title, setTitle] = useState(postUpdate.title || '');
    const [desc] = useState(postUpdate.desc || '');
    const [overview, setOverview] = useState(postUpdate.overview || '');
    const [category, setCategory] = useState(updateMood ? postUpdate.category._id : '');
    const author = user.user._id;
    const [thumb, setThumb] = useState(postUpdate.thumb || '');
    const [cats, setCats] = useState([]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const [loading, setLoading] = useState(false)

    const formData = new FormData();
    formData.append('title', title)
    formData.append('desc', editorState ? JSON.stringify(convertToRaw(editorState.getCurrentContent())) : '')
    formData.append('overview', overview)
    formData.append('category', category)
    formData.append('author', author)
    formData.append('thumb', thumb)

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        console.log(convertToRaw(editorState.getCurrentContent()))
      };

    const fetchCategories = useCallback(() => {
        axios.get(categoriesUrl, { headers: { token: `Bearer ${user.token}` } })
        .then(res => {
            setCats(res.data.categories)
        }).catch(err => {
            console.log(err)
        })
    }, [user.token])

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])


    const hndleCreatePost = e => {
        e.preventDefault();

        setLoading(true)
        axios.post(postsUrl, formData, { 
            headers: { "Content-Type": "multipart/form-data", token : `Bearer ${user.token}` }
        })
        .then(res => {
            console.log(res);
            setLoading(false);
            handleClose();
            fetchPosts();
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            handleClose();
            fetchPosts();
        })
    }
    
    const hndleUpdatePost = e => {
        e.preventDefault();

        setLoading(true)
        axios.put(postsDetailUrl(postUpdate._id), formData, { 
            headers: { "Content-Type": "multipart/form-data", token : `Bearer ${user.token}` }
        })
        .then(res => {
            console.log(res);
            setLoading(false);
            handleClose();
            fetchPosts();
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            handleClose();
            fetchPosts();
        })
    }
    
    return (
        <div className="modal blog-modal">
            <div className="modal-content">
                <i className="fas fa-times" onClick={handleClose}></i>
                <h3>{postsTitle}</h3>
                <form onSubmit={updateMood ? hndleUpdatePost : hndleCreatePost} encType="multipart/form-data">
                    {loading && <Loader />}
                    <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Post Title" />
                    <input type="text" name="overview" value={overview} onChange={e => setOverview(e.target.value)} placeholder="Overview" />
                    {/* <input type="text" name="desc" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" /> */}
                    <div className="editor-modal">
                        <Editor
                        editorState={updateMood ? EditorState.createWithContent(convertFromRaw(JSON.parse(desc))) : editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                        />
                        <div className="view-content" dangerouslySetInnerHTML={{__html: updateMood ? draftToHtml(JSON.parse(desc)) : draftToHtml(convertToRaw(editorState.getCurrentContent()))}}></div>
                    </div>
                    <div className="select-service">
                        <label htmlFor="category">Category</label>
                        <select name="category" id="category" onChange={e => setCategory(e.target.value)} value={category}>
                            {cats.map(singleCategory => (
                                <option value={singleCategory._id}>
                                    {singleCategory.name.length > 25 ? singleCategory.name.slice(0, 25) + '...' : singleCategory.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="profile">
                        <label htmlFor="thumb">
                            <input type="file" name="thumb" id="thumb" onChange={e => setThumb(e.target.files[0])} /> Upload
                        </label>
                        {!updateMood && <img src={thumb && !updateMood ? URL.createObjectURL(thumb) : avatrPng} alt="profile" />}
                        {updateMood && <img src={thumb === postUpdate.thumb ? endpoint + postUpdate.thumb : URL.createObjectURL(thumb)}  alt="profile" />}
                        
                    </div>
                    <button type="submit">{updateMood ? 'Update' : 'Create'}</button>
                </form>
            </div>
        </div>
    )
}

export default PostsModal
