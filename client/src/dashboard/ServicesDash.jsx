import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import {useSelector} from 'react-redux'
import ServicesModal from './modals/ServicesModal'
import ServiceItemModal from './modals/ServiceItemModal'
import {servicesUrl, servicesDetailUrl, serviceItemUrlAll, serviceItemDetailUrl} from '../helpers/API_Routes';
import Loader from './Loader/Loader.jsx';

const ServicesDash = () => {
    const [show, setShow] = useState(false)
    const [showSingle, setShowSingle] = useState(false)
    const [updateMood, setUpdateMood] = useState(false)
    const [updateMoodItem, setUpdateMoodItem] = useState(false)
    const [updateServices, setUpdateservices] = useState({})
    const [updateServicesItem, setUpdateservicesItem] = useState({})
    const [loading, setLoading] = useState(false)
    const [services, setServices] = useState([])
    const [serviceItems, setServiceItems] = useState([])

    const {user} = useSelector(state => state)

    const fetchServices = useCallback(() => {
        setLoading(true)
        axios.get(servicesUrl, { headers: { token: `Bearer ${user.token}` } })
        .then(res => {
            setServices(res.data.service)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }, [user.token])
    
    const fetchServiceItems = useCallback(() => {
        setLoading(true)
        axios.get(serviceItemUrlAll, { headers: { token: `Bearer ${user.token}` } })
        .then(res => {
            setServiceItems(res.data.service)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }, [user.token])
    
    const deleteSingleServices = (id) => {
        setLoading(true)
        axios.delete(servicesDetailUrl(id), { headers: { token: `Bearer ${user.token}` } })
        .then(res => {
            fetchServices()
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }
    
    const deleteSingleServiceItem = (id) => {
        setLoading(true)
        axios.delete(serviceItemDetailUrl(id), { headers: { token: `Bearer ${user.token}` } })
        .then(res => {
            fetchServiceItems()
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchServices()
        fetchServiceItems()
    }, [fetchServices, fetchServiceItems])

    const toggleUpdateMood = (service) => {
        setUpdateMood(true);
        setUpdateservices(service)
        setShow(true);
    }
    
    const toggleUpdateMoodItem = (service) => {
        setUpdateMoodItem(true);
        setUpdateservicesItem(service)
        setShowSingle(true);
    }

    return (
        <div className="team services-container">
            { show && <ServicesModal servicesTitle='Add a New Service' handleClose={() => setShow(false)} fetchServices={fetchServices} updateServices={updateServices} updateMood={updateMood} /> }
            { showSingle && <ServiceItemModal servicesTitle='Add a New Service Item' handleClose={() => setShowSingle(false)} fetchServices={fetchServiceItems} updateServices={updateServicesItem} updateMood={updateMoodItem} items={services} /> }
            <div className="recent-grid">
                <div className="projects">
                    <div className="card">
                        <div className="card-header">
                            <h2>Services List</h2>
                            <button onClick={() => {setShow(true); setUpdateservices({}); setUpdateMood(false)}}>
                                Create <span className="fas fa-arrow-right" />{" "}
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table width="100%">
                                    <thead>
                                        <tr>
                                            <td>Title</td>
                                            <td>Description</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading && <Loader />}
                                        {services && services.map(service => (

                                            <tr key={service._id}>
                                                <td>{service.title.length >= 25 ? service.title.slice(0, 25) + '...' : service.title}</td>
                                                <td>{service.desc.length >= 25 ? service.desc.slice(0, 25) + '...' : service.desc}</td>
                                                <td>
                                                    <i className="fas fa-edit" onClick={() => toggleUpdateMood(service)}></i>
                                                    <i className="fas fa-times" onClick={() => deleteSingleServices(service._id)}></i>
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
                            <h2>Service Items</h2>
                            <button onClick={() => {setShowSingle(true); setUpdateservicesItem({}); setUpdateMoodItem(false)}}>
                                Create <span className="fas fa-arrow-right" />{" "}
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table width="100%">
                                    <thead>
                                        <tr>
                                            <td>Title</td>
                                            <td>Description</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading && <Loader />}
                                        {serviceItems && serviceItems.map(singleService => (

                                            <tr>
                                                <td>{singleService.title.length >= 25 ? singleService.title.slice(0, 25) + '...' : singleService.title}</td>
                                                <td>{singleService.desc.length >= 25 ? singleService.desc.slice(0, 25) + '...' : singleService.desc}</td>
                                                <td>
                                                    <i className="fas fa-edit" onClick={() => toggleUpdateMoodItem(singleService)}></i>
                                                    <i className="fas fa-times" onClick={() => deleteSingleServiceItem(singleService._id)}></i>
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

export default ServicesDash;
