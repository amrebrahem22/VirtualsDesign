import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader.jsx';
import {serviceItemUrl, serviceItemDetailUrl} from '../../helpers/API_Routes';


const ServiceItemModal = ({ handleClose, servicesTitle, fetchServices, updateServices, updateMood, items }) => {

    const { user } = useSelector(state => state);
 
    const [title, seTitle] = useState(updateServices.title || '');
    const [desc, setDesc] = useState(updateServices.desc || '');
    const [icon, setIcon] = useState(updateServices.icon || '01');
    const [service, setService] = useState(updateServices.service || items[0]._id);


    const [loading, setLoading] = useState(false)

    const hndleCreateServices = e => {
        e.preventDefault();

        setLoading(true)
        axios.post(serviceItemUrl, {title, desc, icon, service}, { 
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
        axios.put(serviceItemDetailUrl(updateServices._id), {title, desc, icon, service}, { 
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
        <div className="modal service-item">
            <div className="modal-content">
                <i className="fas fa-times" onClick={handleClose}></i>
                <h3>{servicesTitle}</h3>
                <form onSubmit={updateMood ? hndleUpdateServices : hndleCreateServices}>
                    {loading && <Loader />}
                    <input type="text" name="title" value={title} onChange={e => seTitle(e.target.value)} placeholder="Service Title" />
                    <input type="text" name="desc" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" />
                    <div className="select-service">
                        <label htmlFor="icon">Icon</label>
                        <select name="icon" id="icon" onChange={e => setIcon(e.target.value)} defaultValue={icon || "01"}>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                        </select>
                    </div>
                    <div className="select-service">
                        <label htmlFor="service">Service</label>
                        <select name="service" id="service" onChange={e => setService(e.target.value)} defaultValue={updateServices.service || items[0]._id}>
                            {items.map(singleService => (
                                <option value={singleService._id}>
                                    {singleService.title.length > 25 ? singleService.title.slice(0, 25) + '...' : singleService.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">{updateMood ? 'Update' : 'Create'}</button>
                </form>
            </div>
        </div>
    )
}

export default ServiceItemModal
