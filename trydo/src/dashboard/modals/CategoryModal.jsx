import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader.jsx';
import {categoriesUrl, categoriesDetailUrl} from '../../helpers/API_Routes';


const CategoryModal = ({ handleClose, categoryTitle, fetchCategories, updatecat, updateMood }) => {

    const { user } = useSelector(state => state);
    const [name, setName] = useState(updatecat.name || '');

    const [loading, setLoading] = useState(false)

    const hndleCreateCategory = e => {
        e.preventDefault();

        setLoading(true)
        axios.post(categoriesUrl, {name}, { 
            headers: { token : `Bearer ${user.token}` }
        })
        .then(res => {
            console.log(res);
            setLoading(false);
            handleClose();
            fetchCategories();
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            handleClose();
            fetchCategories();
        })
    }
    
    const hndleUpdateCactegory = e => {
        e.preventDefault();

        setLoading(true)
        axios.put(categoriesDetailUrl(updatecat._id), {name}, { 
            headers: { token : `Bearer ${user.token}` }
        })
        .then(res => {
            console.log(res);
            setLoading(false);
            handleClose();
            fetchCategories();
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            handleClose();
            fetchCategories();
        })
    }
    
    return (
        <div className="modal">
            <div className="modal-content">
                <i className="fas fa-times" onClick={handleClose}></i>
                <h3>{categoryTitle}</h3>
                <form onSubmit={updateMood ? hndleUpdateCactegory : hndleCreateCategory} encType="multipart/form-data">
                    {loading && <Loader />}
                    <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Category Name" />
                    <button type="submit">{updateMood ? 'Update' : 'Create'}</button>
                </form>
            </div>
        </div>
    )
}

export default CategoryModal
