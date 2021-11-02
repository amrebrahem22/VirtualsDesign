import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import avatrPng from '../../images/avatar.png';
import Loader from '../Loader/Loader.jsx';
import {teamUrl, teamDetailUrl, endpoint} from '../../helpers/API_Routes';


const MemberModal = ({ handleClose, title, fetchTeam, memberUpdate, updateMood }) => {

    const { user } = useSelector(state => state);
    const [name, setName] = useState(memberUpdate.name || '');
    const [major, setMajor] = useState(memberUpdate.major || '');
    const [facebook, setFacebook] = useState(memberUpdate.facebook || '');
    const [linkedin, setLinkedin] = useState(memberUpdate.linkedin || '');
    const [picture, setPicture] = useState(memberUpdate.picture || '');

    const [loading, setLoading] = useState(false)

    const formData = new FormData();
    formData.append('name', name)
    formData.append('major', major)
    formData.append('facebook', facebook)
    formData.append('linkedin', linkedin)
    formData.append('picture', picture)


    const hndleCreateMember = e => {
        e.preventDefault();

        setLoading(true)
        axios.post(teamUrl, formData, { 
            headers: { "Content-Type": "multipart/form-data", token : `Bearer ${user.token}` }
        })
        .then(res => {
            console.log(res);
            setLoading(false);
            handleClose();
            fetchTeam();
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            handleClose();
            fetchTeam();
        })
    }
    
    const hndleUpdateMember = e => {
        e.preventDefault();

        setLoading(true)
        axios.put(teamDetailUrl(memberUpdate._id), formData, { 
            headers: { "Content-Type": "multipart/form-data", token : `Bearer ${user.token}` }
        })
        .then(res => {
            console.log(res);
            setLoading(false);
            handleClose();
            fetchTeam();
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            handleClose();
            fetchTeam();
        })
    }
    
    return (
        <div className="modal">
            <div className="modal-content">
                <i className="fas fa-times" onClick={handleClose}></i>
                <h3>{title}</h3>
                <form onSubmit={updateMood ? hndleUpdateMember : hndleCreateMember} encType="multipart/form-data">
                    {loading && <Loader />}
                    <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Member Name" />
                    <input type="text" name="major" value={major} onChange={e => setMajor(e.target.value)} placeholder="Major" />
                    <input type="text" name="facebook" value={facebook} onChange={e => setFacebook(e.target.value)} placeholder="Facebook link" />
                    <input type="text" name="linkedin" value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="Linkedin link" />
                    <div className="profile">
                        <label htmlFor="picture">
                            <input type="file" name="picture" id="picture" onChange={e => setPicture(e.target.files[0])} /> Upload
                        </label>
                        {!updateMood && <img src={picture && !updateMood ? URL.createObjectURL(picture) : avatrPng} alt="profile" />}
                        {updateMood && <img src={picture === memberUpdate.picture ? endpoint + memberUpdate.picture : URL.createObjectURL(picture)}  alt="profile" />}
                        
                    </div>
                    <button type="submit">{updateMood ? 'Update' : 'Create'}</button>
                </form>
            </div>
        </div>
    )
}

export default MemberModal
