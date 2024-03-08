import React, { useCallback, useContext, useState, useEffect } from 'react';
import './styles.css';
import {
  FiGrid,FiDelete,
  FiEdit,
  FiEdit2,
  FiEdit3,
  FiDatabase
} from 'react-icons/fi';
import { StoreContext } from '../../components'; 
import { client } from '../../reducers';


const NewTables=(props)=>{
  const {subdata, newdata, total} = props;
  const { state } = useContext(StoreContext);
  let obj=JSON.parse(newdata);

    const checkout = async(id) => {
      try {
      const userInfo = state.user.access_token;
       const response = await fetch(client.client+'/api/checked/'+id, {
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

          <td >{subdata?.transactions_key}</td>
          <td>{subdata?.date_created}</td>
          <td >{obj?.receiver_name}</td>
          <td>{obj?.receiver_tell}</td>
          <td>{obj?.transaction_fee}</td>
          <td>{obj?.receiving_amount}</td>
          <td>{subdata?.status}
            <span style={{ marginRight: 10 }} />
          </td>
            <td>
            <span id="delete"> <FiDelete size={15} color="white"/></span>
            {total===1 ?(<button onClick={e=>checkout(subdata?.transactions_key)} id="edit"><FiEdit size={15}  /></button> ):
            <div></div>}
            
         </td>
              <td
              style={{ width: 75, paddingLeft: 5 }}
            >
          
          </td>
        </tr>

        
       
    )
}
export default NewTables;