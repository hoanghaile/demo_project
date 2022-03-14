import React from 'react';
import { Link } from 'react-router-dom';
import imgPage404 from '../../../assets/images/404-Page.png';
import './Page404.css';

const Page404 = () => {
    return (
        <>  
            <img className='imgPage404' src={imgPage404} alt="img"/>
            <Link className='aPage404' to="/">
               <p className='button-404'>Home</p>
            </Link> 
           
        </>
    )
}

export default Page404;