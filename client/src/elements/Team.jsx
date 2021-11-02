import React, { useState, useEffect, useCallback } from "react";
import { FaFacebookF , FaLinkedinIn } from "react-icons/fa";
import { endpoint, teamUrl } from '../helpers/API_Routes'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Team = (props) =>  {
    const {column, limit} = props;
    const [team, setTeam] = useState([]);

    const fetchTeam = useCallback(()=> {
        axios.get(teamUrl).then(res => {
            setTeam(res.data.team);
        }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        fetchTeam();
    }, [fetchTeam])

    return(
        <React.Fragment>
            {team.slice(0, limit).map((value , i ) => (
                <div className={`${column}`} key={i}>
                    <div className="team">
                        <div className="thumbnail">
                            <img src={`${endpoint}${value.picture}`} alt="Team Member"/>
                        </div>
                        <div className="content">
                            <h4 className="title">{value.name}</h4>
                            <p className="designation">{value.major}</p>
                        </div>
                        <ul className="social-icon" >
                            <li><Link target="_blank" to={{pathname: `${value.facebook}`}}><FaFacebookF /></Link></li>
                            <li><Link target="_blank" to={{pathname: `${value.linkedin}`}}><FaLinkedinIn /></Link></li>
                        </ul>
                    </div>
                </div>
            ))}
        </React.Fragment>   
    )
}
export default Team;