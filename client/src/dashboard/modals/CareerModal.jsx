import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader.jsx';
import {careerUrl, careerDetailUrl} from '../../helpers/API_Routes';


const CareerModal = ({ handleClose, careerTitle, fetchCareer, updateCareer, updateMood }) => {

    const { user } = useSelector(state => state);
 
    const [title, seTitle] = useState(updateCareer.title || '');
    const [location, setLocation] = useState(updateCareer.location || '');
    const [desc, setDesc] = useState(updateCareer.desc || '');

    const [loading, setLoading] = useState(false)

    const hndleCreateCareer = e => {
        e.preventDefault();

        setLoading(true)
        axios.post(careerUrl, {title, location, desc}, { 
            headers: { token : `Bearer ${user.token}`, 'Content-Type': 'application/json' }
        })
        .then(res => {
            console.log(res);
            setLoading(false);
            handleClose();
            fetchCareer();
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            handleClose();
            fetchCareer();
        })
    }
    
    const hndleUpdateCareer = e => {
        e.preventDefault();

        setLoading(true)
        axios.put(careerDetailUrl(updateCareer._id), {title, location, desc}, { 
            headers: { token : `Bearer ${user.token}`, 'Content-Type': 'application/json' }
        })
        .then(res => {
            console.log(res);
            setLoading(false);
            handleClose();
            fetchCareer();
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            handleClose();
            fetchCareer();
        })
    }
    
    return (
        <div className="modal">
            <div className="modal-content">
                <i className="fas fa-times" onClick={handleClose}></i>
                <h3>{careerTitle}</h3>
                <form onSubmit={updateMood ? hndleUpdateCareer : hndleCreateCareer}>
                    {loading && <Loader />}
                    <input type="text" name="title" value={title} onChange={e => seTitle(e.target.value)} placeholder="Job Title" />
                    <input type="text" name="location" value={location} onChange={e => setLocation(e.target.value)} placeholder="Job Location" />
                    <input type="text" name="desc" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" />
                    <button type="submit">{updateMood ? 'Update' : 'Create'}</button>
                </form>
            </div>
        </div>
    )
}

export default CareerModal
