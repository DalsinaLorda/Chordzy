import React, { useCallback, useContext, useState, useEffect } from 'react';
import { FiDelete, FiEdit } from 'react-icons/fi';
import Modal from "../../components/Modal";
import { StoreContext } from '../../components';
import Users from './users';
import { client } from '../../reducers';

import "./styles.css";

const AppUsers = () => {
    const { state, dispatch } = useContext(StoreContext);
    const [data, setData]=useState('');
    const [id, setId]=useState('');
    const [name, setName]=useState('');
    const [last_name, setLname]=useState('');
    const [email, setEmail]=useState('');
    const [tell, setTell]=useState('');
    const [branch, setBranch]=useState('');
    const [password, setPassword]=useState('');
    const [sidebarState, setState] = useState({
        modal: false,
        toast: ''
      })
    const [agentState, setAgentState] = useState({
        modal: false,
        toast: ''
      })

      const [editState, setEditAgentState] = useState({
        modal: false,
        toast: ''
      })

    const handleModal = () =>
        setState({ ...sidebarState, modal: !sidebarState.modal })

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
                    setData(e.agents);
                    console.warn(data)
                }
                else{
                    console.warn(e);
                }   
             
            })
            .catch(e=>{console.warn(e)})  }

            const createAgent = async() => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({f_name: name,l_name: last_name, email:email,tell: tell, branch_id: branch, password: password, type: 'staff'})
                };
                if(name && password){
                    const response = await fetch(client.client+'/api/signup', requestOptions)
                    const data= await response.json()
                    .then(e=>{
                        console.warn('new',e)
                        const user = {
                            name: e.name,
                            contact: tell,
                            email: email,
                            type: e.type,
                            access_token: e.access_token,
                        } 
                        setAgentState({
                          ...sidebarState,
                          modal: false,
                          toast: 'Agent was created successfully!'
                        });
                    })
                    .catch(e=>{  setAgentState({
                      ...sidebarState,
                      modal: false,
                      toast: 'User already exists. Please Log in'
                    })})
                    
                }
                else{
                    alert('Please fill in the form to continue')
                     }}

            const addAgent = e => {
                e.preventDefault()
                //const list = playlistRef.current.value
                createAgent();
               // dispatch({ type: 'ADD_PLAYLIST', playlist: list })
            
              }
            const handleAgentModal = () =>
                setAgentState({ ...agentState, modal: !agentState.modal })

            const editAgentModal = (id, n, Ln, e, t) =>{
                    setId(id)
                    setName(n);
                    setLname(Ln);
                    setEmail(e);
                    setTell(t);
                setEditAgentState({ ...editState, modal: !editState.modal })}

                const edit = async(id) => {
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

    return (
        <div className="container">
            <div className="Box">
                <p style={{color: 'black'}}>Users</p>
                <div id="BranchBox">
                    <p style={{color: 'black', 'font-size': 15, 'margin-right': 20, 'font-weight': 'lighter'}}>{state.user.type==='adminstrator'? 'Admin': 'Staff'} User: {state.user.name}</p>
                   
                    {state.user.type==='adminstrator'?  <button onClick={handleAgentModal} className="Btn-btn">Add User</button>: ''}
                </div>
            </div>

            <div className="bigDiv">
            <table id="table">
                <thead id="tablehead">
                    <tr>
                    <td className="first" >#</td>
                    <td />
                    <td>Profile</td>
                    <td>Name</td>
                    <td>Tell</td>
                    <td>Email</td>
                    <td>Branch</td>
                    <td>Type</td>
                    <td>Action</td>
                    <td />
                    <td/>
                    </tr>
                </thead>

                <tbody>
                
          
            </tbody>
        
           </table>
            </div>


        <Modal show={agentState.modal} close={handleModal}>
            <form onSubmit={addAgent}>
            <div className="title">Add new agent</div>

            <div className="content-wrap">
            
              <input type='text' placeholder='First Name' onChange={(n) => setLname(n.target.value)}></input>
              <input type='text' placeholder='Last Name' onChange={(n) => setName(n.target.value)}></input>
              <input type='text' placeholder='Email' onChange={(email) => setEmail(email.target.value)}></input>
              <input type='text' placeholder='Tell' onChange={(tel) => setTell(tel.target.value)}></input>
              <select  name="Select Branch"
                defaultValue="pic"
              onChange={(b_id)=>setBranch(b_id.target.value)}>
                <option value="apple">Select Branch</option>
                <option value="Thongping">Thongping</option>
                <option value="Kololo">Kololo</option>
                <option value="Juba">Juba</option>
                <option value="Yirol">Yirol</option>
              </select>
              <input type='password' placeholder='Password' onChange={(password) => setPassword(password.target.value)}></input>

            <br />

            <button type="submit">Create</button>
            <button onClick={e=>{  setAgentState({
            ...sidebarState,
            modal: false,
            toast: 'cancelled'
            })}}>Cancel</button>
            </div>
            </form>
        </Modal>


        <Modal show={editState.modal} close={handleModal}>
            <form onSubmit={addAgent}>
            <div className="title">Edit Agent Account</div>

            <div className="content-wrap">
            
              <input type='text' defaultValue={name} placeholder='First Name' onChange={(n) => setLname(n.target.value)}></input>
              <input type='text' defaultValue={last_name} placeholder='Last Name' onChange={(n) => setName(n.target.value)}></input>
              <input type='text' defaultValue={email} placeholder='Email' onChange={(email) => setEmail(email.target.value)}></input>
              <input type='text' defaultValue={tell} placeholder='Tell' onChange={(tel) => setTell(tel.target.value)}></input>
              <select  name="Select Branch"
                defaultValue="pic"
              onChange={(b_id)=>setBranch(b_id.target.value)}>
                <option value="apple">Select Branch</option>
                <option value="Thongping">Thongping</option>
                <option value="Kololo">Kololo</option>
                <option value="Juba">Juba</option>
                <option value="Yirol">Yirol</option>
              </select>
             
            <br />

            <button type="submit">Submit</button>
            <button onClick={e=>{  setEditAgentState({
            ...sidebarState,
            modal: false,
            toast: 'cancelled'
            })}}>Cancel</button>
            </div>
            </form>
        </Modal>
        </div>
    )
}


export default AppUsers;