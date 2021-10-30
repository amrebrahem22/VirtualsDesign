import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom';
import { portfolioUrl, endpoint } from '../../helpers/API_Routes.js'
import axios from 'axios';

const PortfolioList = props => {
    const {column , styevariation } = props;
    const [portfolio, setPortfolio] = useState([])

    const fetchPortfolio = useCallback(() => {
        axios.get(portfolioUrl)
        .then(res => {
            console.log(res.data.portfolio)
            console.log(endpoint + '/' + res.data.portfolio[0].thumb)
            setPortfolio(res.data.portfolio.slice(0 , props.item))
        }).catch(err => {
            console.log(err)
        })
    }, [props.item])

    useEffect(() => {
        fetchPortfolio()
    }, [fetchPortfolio])

    return(
        <React.Fragment> 
            {portfolio.map((value , index) => (
                <div className={`${column}`} key={index}>
                    <div className={`portfolio ${styevariation}`}>
                        <div className="thumbnail-inner">
                            <div className='thumbnail' style={{backgroundImage: `url(${endpoint}${value.thumb.replace('\\', '/')})`}}></div>
                            <div className='bg-blr-image' style={{backgroundImage: `url(${endpoint}${value.thumb.replace('\\', '/')})`}}></div>
                        </div>
                        <div className="content">
                            <div className="inner">
                                <p>{value.category}</p>
                                <h4><a href="/portfolio-details">{value.title}</a></h4>
                                <div className="portfolio-button">
                                    <Link to={`/portfolio/${value._id}`} className="rn-btn">View Details</Link>
                                </div>
                            </div>
                        </div>
                        <Link className="link-overlay" to={`/portfolio/${value._id}`}></Link>
                    </div>
                </div>
            ))}
            
        </React.Fragment>
    )
}
export default PortfolioList;