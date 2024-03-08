import React, {useContext, useState } from 'react';
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


const Users=(props)=>{
  const {subdata} = props;
  const { state } = useContext(StoreContext);
 

  useEffect(()=>{
    console.warn(subdata);
  }, [])

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
            <td
                style={{ width: 75, paddingLeft: 0 }}
            >1
                </td>
            <td></td>
            <td >code</td>
            <td>Lorda</td>
            <td>098765988</td>
            <td style={{width: 10, size: 10}}>tking@gmail.com</td>
            <td >010</td>
            <td>Staff</td>
            
                <td>
                <span id="delete"> <FiDelete size={15} color="white"/></span>
                <span  id="edit"><FiEdit size={15} onClick={e=>editAgentModal('1','lorda', 'Dhieu', 'lorda@gmail.com', "0987654462")} /></span>
                <div></div>
                
            </td>
                <td
                style={{ width: 75, paddingLeft: 5 }}
                > 
            </td>
        </tr>

        
       
    )
}
export default Users;