/** @jsx jsx */
import React, { useState, useRef, useContext, useEffect } from 'react';
import {
  FiGrid,
  FiRepeat,
  FiShuffle,
  FiCreditCard,
  FiDatabase,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';
import './sidebar.css';
import {Link} from "react-router-dom";
import { css, jsx } from '@emotion/core'
import { StoreContext } from './index'
import Modal from './Modal'
import Toast from './Toast'
import logo from '../img/profile.png'
import newlogo from '../img/appLogo3.png'
import { client } from '../reducers';


  

const Sidebar = () => {
  const { state, dispatch } = useContext(StoreContext)
  const [name, setName]=useState('');
  const [last_name, setLname]=useState('');
  const [email, setEmail]=useState('');
  const [tell, setTell]=useState('');
  const [branch, setBranch]=useState('');
  const [password, setPassword]=useState('');

  const [bName, setBname]=useState('');
  const [bAddress, setBAddress]=useState('');

  const [sidebarState, setState] = useState({
    modal: false,
    toast: ''
  })
  const [agentState, setAgentState] = useState({
    modal: false,
    toast: ''
  })

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
              })
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
    
  //accepts a context object (the value returned from React.createContext) and returns the current context value
  

  const playlistRef = useRef(null)
  const playlists = Object.keys(state.playlists)

  const LogOut=()=>{
    dispatch({type: 'LOG_OUT'});
  }

  const addAgent = e => {
    e.preventDefault()
    //const list = playlistRef.current.value
    createAgent();
   // dispatch({ type: 'ADD_PLAYLIST', playlist: list })

  }

  const addBranch = e => {
    e.preventDefault()
    creatBranch();
  }

  const handleAgentModal = () =>
    setAgentState({ ...agentState, modal: !agentState.modal })

  const handleModal = () =>
    setState({ ...sidebarState, modal: !sidebarState.modal })

    useEffect(()=>{

    }, [])

  return (
    <ul className="Sidebar" css={CSS}>
      {/* <div className="container"> */}
      <div className="logo">
        <div className="imageContain">
          <img className="img" src={logo} style={{ borderRadius:80}}/>
        </div>
        <div id="textContain"
         >
            <h3  className="textss">{state.user.name} </h3>
        </div>
      </div>
      {/* </div> */}

      
      
        <li>
          <FiShuffle size={15} style={{marginRight: 10}} />
          <Link to="/" style={{color: 'white'}}>Send</Link>
        </li>
        <li>
        <FiRepeat size={15} style={{marginRight: 10}}  /><Link to="/CashOut"  style={{color: 'white'}} >Transactions</Link>
      </li>
      <li>
      <FiGrid size={15} style={{marginRight: 10}} /><Link to="/Dashboard"  style={{color: 'white'}}>Dashboard</Link>
      </li>
      <li>
      <FiCreditCard size={15} style={{marginRight: 10}} /> 
      <Link to="History"  style={{color: 'white'}}>
         History
      </Link>
      </li>
       
       

    {state?.user?.type == 'staff' ?(
      <li className="new-playlist" onClick={handleModal}>
        <i className="fa fa-plus-circle" />
        <span>New record</span>
      </li>

    ):
    <>
      <li className="new-playlist" onClick={handleModal}>
        <i className="fa fa-plus-circle" />
        <span>Add New Branch</span>
      </li>
      <li className="new-agent" onClick={handleAgentModal}>
        <i className="fa fa-plus-circle" />
        <span>Add New Agent</span>
      </li>
    </>
    }
     
      <li className="new-playlist" onClick={LogOut} style={{top: 200, color: '#1f2933'}} >
        <FiLogOut  size={15} style={{marginRight: 10}}/>
        <span style={{color: '#1f2933'}} >Log Out</span>
      </li>


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

      <Modal show={agentState.modal} close={handleModal}>
        <form onSubmit={addAgent}>
          <div className="title">Add new agent</div>

          <div className="content-wrap">
            
              <input type='text' placeholder='First_Name' onChange={(n) => setLname(n.target.value)}></input>
              <input type='text' placeholder='Last_Name' onChange={(n) => setName(n.target.value)}></input>
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

      <Toast
        toast={sidebarState.toast}
        close={() => setState({ ...sidebarState, toast: '' })}
      />

      <Toast
        toast={agentState.toast}
        close={() => setAgentState({ ...agentState, toast: '' })}
      />
    </ul>
  )
}

const CSS = css`
  width: 200px;
  height: 100%;
  background: rgb(52, 53, 53);
  padding-top: 20px;

  img {
    height: 80px;
    margin-left:20px;
    margin-bottom: 5px;
  }

  li {
    padding-left: 20px;
    text-transform: capitalize;
    margin-bottom: 10px;
    cursor: pointer;
    font-weight: bold;
    font-size:20px;
    color: white;
  }


  .container {
    display: flex;
    align-items: right;
    justify-content: right;
  }

  li.active {
    border-left: 2px solid white;
    padding-left: 18px;
  }

  li.library {
    margin-top:30px;
    cursor: unset;
    color: #999;
    text-transform: uppercase;
    font-weight: normal;
    margin-bottom:30px;
  }



  li.new-agent {
    position: relative;
    top: 40px;
    font-size: 15px;


    i {
      margin-right: 5px;
      transform: translateY(1px);
      
      &:before {
        font-size: 10px;
      }
    }
  }
    li.new-playlist {
      position: relative;
      top: 40px;
  
      i {
        margin-right: 5px;
        transform: translateY(1px);
  
        &:before {
          font-size: 20px;
        }
      }}
  
    span {
      color: #999;
      font-weight: 300;
    }
  }

  form {
    button {
      background-color: #5d093b;
      color: red;
      padding: 12.5px 30px;
      border-radius: 25px;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 13px;
      border: none;
      cursor: pointer;
    }

    .title {
      margin: 0;
      margin-bottom: 35px;
    }

    input {
      margin-bottom: 20px;
      height: 35px;
      padding-left: 8px;
      font-size: 16px;
      width: 100%;
      color: black;
    }

    select {
      margin-bottom: 10px;
      height: 30px;
      padding-left: 8px;
      font-size: 16px;
      width: 100%;
      color: black;
    }


    .content-wrap {
      margin: 0px auto;
      max-width: 250px;
      text-align: center;
    }
  }
`



export default Sidebar;

