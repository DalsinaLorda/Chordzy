import React, { useCallback, useContext, useState, useEffect } from 'react';
import './cashOut/styles.css'
import {
  FiGrid,FiDelete,
  FiEdit,
  FiEdit2,
  FiEdit3,
  FiDatabase
} from 'react-icons/fi';
import { StoreContext } from '../components';
import { client } from '../reducers';

const Tables=(props)=>{
  const { state } = useContext(StoreContext);
    const {id,total,code,status, r_name, s_name, to,tell ,Amount, charge} = props;

    const cashOut = async(tcode) => {
      try {
      const userInfo = state.user.access_token;
       const response = await fetch(client.client+'/api/checked/'+tcode, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'access-token': userInfo,
            'Authorization': 'Bearer ' + userInfo,
          }})
        const data= await response.json()
       .then(datas=> { 
          try {
            if (datas.message){
              alert(datas.message);  
          }   
          } catch (e) { console.log(e)
          }})
        .catch(error=> {return console.log(error);});
        }catch (e) {
       console.log(e);}}
       
    return(
        <tr id="tree">
          
          
      
          <td >{code}</td>
          <td>{s_name}</td>
          <td>{to}</td>
          <td >{r_name}</td>
          <td>{tell}</td>
          <td>{charge}</td>
          <td>{Amount}</td>
              <td>
         
            {status}
            <span style={{ marginRight: 10 }} />
            </td>
            <td>
            <span id="delete"> <FiDelete size={15} color="white"/></span>
            {total===1 ?(<button onClick={e=>cashOut(code)} id="edit"><FiEdit size={15}  /></button> ):
            <div></div>}
            
         </td>
              <td
              style={{ width: 75, paddingLeft: 5 }}
            >
          
          </td>
        </tr>

        
       
    )
}
export default Tables;