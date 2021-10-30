import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import avatrPng from '../../images/avatar.png';
import Loader from '../Loader/Loader.jsx';
import {portfolioUrl, portfolioDetailUrl, endpoint} from '../../helpers/API_Routes';


const MemberModal = ({ handleClose, portfolioTitle, fetchPortfolio, updatePortfolio, updateMood }) => {

    const { user } = useSelector(state => state);
 
    const [title, seTitle] = useState(updatePortfolio.title || '');
    const [subtitle, setSubtitle] = useState(updatePortfolio.subtitle || '');
    const [duration, setDuration] = useState(updatePortfolio.duration || '');
    const [deliverables, setDeliverables] = useState(updatePortfolio.deliverables || '');
    const [technologies, setTechnologies] = useState(updatePortfolio.technologies || '');
    const [desc, setDesc] = useState(updatePortfolio.desc || '');
    const [category, setCategory] = useState(updatePortfolio.category || '');
    const [thumb, setThumb] = useState(updatePortfolio.thumb || '');

    const [loading, setLoading] = useState(false)

    const formData = new FormData();
    formData.append('title', title)
    formData.append('subtitle', subtitle)
    formData.append('duration', duration)
    formData.append('deliverables', deliverables)
    formData.append('technologies', technologies)
    formData.append('desc', desc)
    formData.append('category', category)
    formData.append('thumb', thumb)


    const hndleCreatePortfolio = e => {
        e.preventDefault();

        setLoading(true)
        axios.post(portfolioUrl, formData, { 
            headers: { "Content-Type": "multipart/form-data", token : `Bearer ${user.token}` }
        })
        .then(res => {
            console.log(res);
            setLoading(false);
            handleClose();
            fetchPortfolio();
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            handleClose();
            fetchPortfolio();
        })
    }
    
    const hndleUpdatePortfolio = e => {
        e.preventDefault();

        setLoading(true)
        axios.put(portfolioDetailUrl(updatePortfolio._id), formData, { 
            headers: { "Content-Type": "multipart/form-data", token : `Bearer ${user.token}` }
        })
        .then(res => {
            console.log(res);
            setLoading(false);
            handleClose();
            fetchPortfolio();
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            handleClose();
            fetchPortfolio();
        })
    }
    
    return (
        <div className="modal">
            <div className="modal-content">
                <i className="fas fa-times" onClick={handleClose}></i>
                <h3>{portfolioTitle}</h3>
                <form onSubmit={updateMood ? hndleUpdatePortfolio : hndleCreatePortfolio} encType="multipart/form-data">
                    {loading && <Loader />}
                    <input type="text" name="title" value={title} onChange={e => seTitle(e.target.value)} placeholder="Portfolio Title" />
                    <input type="text" name="subTitle" value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="Portfolio subTitle" />
                    <input type="text" name="duration" value={duration} onChange={e => setDuration(e.target.value)} placeholder="Duration" />
                    <input type="text" name="deliverables" value={deliverables} onChange={e => setDeliverables(e.target.value)} placeholder="Deliverables" />
                    <input type="text" name="technologies" value={technologies} onChange={e => setTechnologies(e.target.value)} placeholder="Technologies" />
                    <input type="text" name="category" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
                    <input type="text" name="desc" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" />
                    
                    <div className="profile">
                        <label htmlFor="thumb">
                            <input type="file" name="thumb" id="thumb" onChange={e => setThumb(e.target.files[0])} /> Upload
                        </label>
                        {!updateMood && <img src={thumb && !updateMood ? URL.createObjectURL(thumb) : avatrPng} alt="Thumbnail" />}
                        {updateMood && <img src={thumb === updatePortfolio.thumb ? endpoint + updatePortfolio.thumb : URL.createObjectURL(thumb)}  alt="Thumbnail" />}
                        
                    </div>
                    <button type="submit">{updateMood ? 'Update' : 'Create'}</button>
                </form>
            </div>
        </div>
    )
}

export default MemberModal
