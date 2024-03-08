import React, { useCallback, useContext, useState, useEffect } from 'react';
import {
  FiGrid,FiDelete,FiLoader
} from 'react-icons/fi';
import './styles.css';
import logo from '../../img/appLogo3.png';


const Splash=()=>{
    return(
    <div className="content" >
         <img src={logo}/>
         <FiLoader size={20}  className={'rotating'} />
        
    </div>   
    )
}
export default Splash;