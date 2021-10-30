import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import {useSelector} from 'react-redux'
import MemberModal from './modals/MemberModal'
import {teamUrl, endpoint, teamDetailUrl} from '../helpers/API_Routes';
import avatrPng from '../images/avatar.png';
import { Link } from "react-router-dom";
import Loader from './Loader/Loader.jsx';


const TeamMember = () => {
    const [show, setShow] = useState(false)
    const [updateMood, setUpdateMood] = useState(false)
    const [memberUpdate, setMemberUpdate] = useState({})
    const [loading, setLoading] = useState(false)
    const [team, setTeam] = useState([])

    const {user} = useSelector(state => state)

    const fetchTeam = useCallback(() => {
        setLoading(true)
        axios.get(teamUrl, { headers: { token: `Bearer ${user.token}` } })
        .then(res => {
            setTeam(res.data.team)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }, [user.token])
    
    const deleteMember = (id) => {
        setLoading(true)
        axios.delete(teamDetailUrl(id), { headers: { token: `Bearer ${user.token}` } })
        .then(res => {
            fetchTeam()
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchTeam()
    }, [fetchTeam])

    const toggleUpdateMood = (member) => {
        setUpdateMood(true);
        setMemberUpdate(member)
        setShow(true);
    }

    return (
        <div className="team">
            { show && <MemberModal title='Create a new Member' handleClose={() => setShow(false)} fetchTeam={fetchTeam} memberUpdate={memberUpdate} updateMood={updateMood} /> }
            <div className="recent-grid">
                <div className="projects">
                    <div className="card">
                        <div className="card-header">
                            <h2>Team List</h2>
                            <button onClick={() => setShow(true)}>
                                Create <span className="fas fa-arrow-right" />{" "}
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table width="100%">
                                    <thead>
                                        <tr>
                                            <td>Avatar</td>
                                            <td>Name</td>
                                            <td>Links</td>
                                            <td>actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading && <Loader />}
                                        {team && team.map(member => (

                                            <tr key={member._id}>
                                                <td>
                                                    <img src={endpoint + member.picture || avatrPng} alt="member" width='40px' height='40px' />
                                                </td>
                                                <td>{member.name}</td>
                                                <td>
                                                    <Link target="_blank" to={{ pathname: member.facebook.toString() }}>
                                                        <i className="fab fa-facebook"></i>
                                                    </Link>
                                                    <Link target="_blank" to={{ pathname: member.linkedin.toString() }}>
                                                        <i className="fab fa-linkedin"></i>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <i className="fas fa-edit" onClick={() => toggleUpdateMood(member)}></i>
                                                    <i className="fas fa-times" onClick={() => deleteMember(member._id)}></i>
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

export default TeamMember;
