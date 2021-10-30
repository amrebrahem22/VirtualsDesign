import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import {useSelector} from 'react-redux'
import PortfolioModal from './modals/PortfolioModal'
import {portfolioUrl, endpoint, portfolioDetailUrl} from '../helpers/API_Routes';
import avatrPng from '../images/avatar.png';
import Loader from './Loader/Loader.jsx';


const PortfolioDash = () => {
    const [show, setShow] = useState(false)
    const [updateMood, setUpdateMood] = useState(false)
    const [updatePortfolio, setUpdatePortfolio] = useState({})
    const [loading, setLoading] = useState(false)
    const [portfolio, setPortfolio] = useState([])

    const {user} = useSelector(state => state)

    const fetchPortfolio = useCallback(() => {
        setLoading(true)
        axios.get(portfolioUrl, { headers: { token: `Bearer ${user.token}` } })
        .then(res => {
            setPortfolio(res.data.portfolio)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }, [user.token])
    
    const deleteSinglePortfolio = (id) => {
        setLoading(true)
        axios.delete(portfolioDetailUrl(id), { headers: { token: `Bearer ${user.token}` } })
        .then(res => {
            fetchPortfolio()
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchPortfolio()
    }, [fetchPortfolio])

    const toggleUpdateMood = (member) => {
        setUpdateMood(true);
        setUpdatePortfolio(member)
        setShow(true);
    }

    return (
        <div className="team">
            { show && <PortfolioModal portfolioTitle='Create a new Portfolio Item' handleClose={() => setShow(false)} fetchPortfolio={fetchPortfolio} updatePortfolio={updatePortfolio} updateMood={updateMood} /> }
            <div className="recent-grid">
                <div className="projects">
                    <div className="card">
                        <div className="card-header">
                            <h2>Portfolio List</h2>
                            <button onClick={() => setShow(true)}>
                                Create <span className="fas fa-arrow-right" />{" "}
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table width="100%">
                                    <thead>
                                        <tr>
                                            <td>Thumbnail</td>
                                            <td>Title</td>
                                            <td>Subtitle</td>
                                            <td>Durartion</td>
                                            <td>Deliverables</td>
                                            <td>Technologies</td>
                                            <td>Category</td>
                                            <td>Description</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading && <Loader />}
                                        {portfolio && portfolio.map(singlePort => (

                                            <tr key={singlePort._id}>
                                                <td>
                                                    <img src={endpoint + singlePort.thumb || avatrPng} alt="singlePort" width='40px' height='40px' />
                                                </td>
                                                <td>{singlePort.title.length >= 8 ? singlePort.title.slice(0, 8) + '...' : singlePort.title}</td>
                                                <td>{singlePort.subtitle.length >= 8 ? singlePort.subtitle.slice(0, 8) + '...' : singlePort.subtitle}</td>
                                                <td>{singlePort.duration}</td>
                                                <td>{singlePort.deliverables.length >= 8 ? singlePort.deliverables.slice(0, 8) + '...' : singlePort.deliverables}</td>
                                                <td>{singlePort.technologies.length >= 8 ? singlePort.technologies.slice(0, 8) + '...' : singlePort.technologies}</td>
                                                <td>{singlePort.category}</td>
                                                <td>{singlePort.desc.length >= 8 ? singlePort.desc.slice(0, 8) + '...' : singlePort.desc}</td>
                                                <td>
                                                    <i className="fas fa-edit" onClick={() => toggleUpdateMood(singlePort)}></i>
                                                    <i className="fas fa-times" onClick={() => deleteSinglePortfolio(singlePort._id)}></i>
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

export default PortfolioDash;
