import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader.jsx';
import {servicesUrl, servicesDetailUrl} from '../../helpers/API_Routes';


const ServicesModal = ({ handleClose, servicesTitle, fetchServices, updateServices, updateMood }) => {

    const { user } = useSelector(state => state);
 
    const [title, seTitle] = useState(updateServices.title || '');
    const [desc, setDesc] = useState(updateServices.desc || '');

    const [loading, setLoading] = useState(false)

    const hndleCreateServices = e => {
        e.preventDefault();

        setLoading(true)
        axios.post(servicesUrl, {title, desc}, { 
            headers: { token : `Bearer ${user.token}`, 'Content-Type': 'application/json' }
        })
        .then(res => {
            console.log(res);
            setLoading(false);
            handleClose();
            fetchServices();
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            handleClose();
            fetchServices();
        })
    }
    
    const hndleUpdateServices = e => {
        e.preventDefault();

        setLoading(true)
        axios.put(servicesDetailUrl(updateServices._id), {title, desc}, { 
            headers: { token : `Bearer ${user.token}`, 'Content-Type': 'application/json' }
        })
        .then(res => {
            console.log(res);
            setLoading(false);
            handleClose();
            fetchServices();
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            handleClose();
            fetchServices();
        })
    }
    
    return (
        <div className="modal">
            <div className="modal-content">
                <i className="fas fa-times" onClick={handleClose}></i>
                <h3>{servicesTitle}</h3>
                <form onSubmit={updateMood ? hndleUpdateServices : hndleCreateServices}>
                    {loading && <Loader />}
                    <input type="text" name="title" value={title} onChange={e => seTitle(e.target.value)} placeholder="Service Title" />
                    <input type="text" name="desc" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" />
                    <button type="submit">{updateMood ? 'Update' : 'Create'}</button>
                </form>
            </div>
        </div>
    )
}

export default ServicesModal
