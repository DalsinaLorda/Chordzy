import React, { useCallback, useContext, useState, useEffect } from 'react';
import Modal from "../../components/Modal";
import { FiDelete, FiEdit } from 'react-icons/fi';
import { StoreContext } from '../../components';
import { client } from '../../reducers';

import "./styles.css";

const Branches = () => {
    const { state, dispatch } = useContext(StoreContext);
    const [bName, setBname]=useState('');
    const [bAddress, setBAddress]=useState('');
    const [sidebarState, setState] = useState({
        modal: false,
        toast: ''
      })

    const handleModal = () =>
    setState({ ...sidebarState, modal: !sidebarState.modal })

    const addBranch = e => {
        e.preventDefault()
        creatBranch();
      }

      
  const creatBranch = async() => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'access-token': state.user.access_token, 
        'Authorization': state.user.access_token, },
        body: JSON.stringify({branch_name: bName, branch_address: bAddress})
    };
    if(bName && bAddress){
        const response = await fetch(client.client+'/api/createbranch', requestOptions)
        const data= await response.json()
        .then(e=>{
           console.warn(e)
            if(e.name){
              setState({
                ...sidebarState,
                modal: false,
                toast: e.name+' Branch was created successfully!'})}
            else{
              setState({
                ...sidebarState,
                modal: false,
                toast: ' '+e.data+' !'+bName})}})
        .catch(e=>{return e}) }
    else{  setState({
      ...sidebarState,
      modal: false,
      toast: 'Please fill in the spaces'}) }
    }
    useEffect(()=>{
        users();
    }, [])
    
    const users = async() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'access-token': state.user.access_token, 
            'Authorization': state.user.access_token}
        }
            const response = await fetch(client.client+'/api/users', requestOptions)
            const data= await response.json()
            .then(e=>{
                if(e){
                    
                    console.warn(e.agents)
                }
                else{
                    console.warn(e);
                }   
             
            })
            .catch(e=>{console.warn(e)})  }


    return (
        <div className="container">
            <div className="Box">
                <p style={{color: 'black'}}>Branches</p>
                <div id="BranchBox">
                    <p style={{color: 'black', 'font-size': 15, 'margin-right': 20, 'font-weight': 'lighter'}}>{state.user.type==='adminstrator'? 'Admin': 'Staff'} User: {state.user.name}</p>
                    <button onClick={handleModal} className="Btn-btn">Add branch</button>
                </div>
            </div>

            <div className="bigDiv">
            <table id="table">
                <thead id="tablehead">
                    <tr>
                    <td className="first" >#</td>
                    <td />
                    <td>Branch Name</td>
                    <td>Address</td>
                    <td>Total Staff</td>
                    <td>Processed Transactions</td>
                    <td>Opens</td>
                    <td>Closes</td>
                    <td>Action</td>
                    <td />
                    <td/>
                    </tr>
                </thead>

                <tbody>
                <tr id="tree">
                
                <td
                    style={{ width: 75, paddingLeft: 0 }}
                >1
                    </td>
                <td></td>
                <td >B144</td>
                <td>Thongping</td>
                <td>7</td>
                <td style={{width: 10, size: 10}}>100</td>
                <td >8am</td>
                <td>8Pm</td>
                
                    <td>
                    <span id="delete"> <FiDelete size={15} color="white"/></span>
                    <span  id="edit"><FiEdit size={15}  /></span>
                    <div></div>
                    
         </td>
              <td
              style={{ width: 75, paddingLeft: 5 }}
            >
          
          </td>
        </tr>
      
    
        </tbody>
        
        </table>
            </div>


            <Modal show={sidebarState.modal} close={handleModal}>
        <form onSubmit={addBranch}>
          <div className="title">New Branch</div>

          <div className="content-wrap">
              <input type='text' placeholder='Branch Name' onChange={(n) => setBname(n.target.value)}></input>
              <input type='text' placeholder='Branch Address' onChange={(n) => setBAddress(n.target.value)}></input>
            <br />

            <button type="submit">Create</button>
            <button onClick={(e)=>{setState({
              ...sidebarState,
              modal: false,
              toast: 'Cancelled!'
            })}}>Cancel</button>
          </div>
        </form>
      </Modal>

        </div>
    )
}


export default Branches;