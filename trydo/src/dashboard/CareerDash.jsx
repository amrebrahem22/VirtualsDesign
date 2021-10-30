import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import {useSelector} from 'react-redux'
import CareerModal from './modals/CareerModal'
import {careerUrl, careerDetailUrl} from '../helpers/API_Routes';
import Loader from './Loader/Loader.jsx';


const CareerDash = () => {
    const [show, setShow] = useState(false)
    const [updateMood, setUpdateMood] = useState(false)
    const [updateCareer, setUpdateCareer] = useState({})
    const [loading, setLoading] = useState(false)
    const [career, setCareer] = useState([])

    const {user} = useSelector(state => state)

    const fetchCareer = useCallback(() => {
        setLoading(true)
        axios.get(careerUrl, { headers: { token: `Bearer ${user.token}` } })
        .then(res => {
            setCareer(res.data.jobs)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }, [user.token])
    
    const deleteSingleCareer = (id) => {
        setLoading(true)
        axios.delete(careerDetailUrl(id), { headers: { token: `Bearer ${user.token}` } })
        .then(res => {
            fetchCareer()
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchCareer()
    }, [fetchCareer])

    const toggleUpdateMood = (job) => {
        setUpdateMood(true);
        setUpdateCareer(job)
        setShow(true);
    }

    return (
        <div className="team">
            { show && <CareerModal careerTitle='Add a New Job' handleClose={() => setShow(false)} fetchCareer={fetchCareer} updateCareer={updateCareer} updateMood={updateMood} /> }
            <div className="recent-grid">
                <div className="projects">
                    <div className="card">
                        <div className="card-header">
                            <h2>Career List</h2>
                            <button onClick={() => {setShow(true); setUpdateCareer({}); setUpdateMood(false)}}>
                                Create <span className="fas fa-arrow-right" />{" "}
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table width="100%">
                                    <thead>
                                        <tr>
                                            <td>Title</td>
                                            <td>Location</td>
                                            <td>Description</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading && <Loader />}
                                        {career && career.map(job => (

                                            <tr key={job._id}>
                                                <td>{job.title.length >= 25 ? job.title.slice(0, 25) + '...' : job.title}</td>
                                                <td>{job.location.length >= 25 ? job.location.slice(0, 25) + '...' : job.location}</td>
                                                <td>{job.desc.length >= 25 ? job.desc.slice(0, 25) + '...' : job.desc}</td>
                                                <td>
                                                    <i className="fas fa-edit" onClick={() => toggleUpdateMood(job)}></i>
                                                    <i className="fas fa-times" onClick={() => deleteSingleCareer(job._id)}></i>
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

export default CareerDash;
