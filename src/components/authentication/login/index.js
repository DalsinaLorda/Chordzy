import styled from "@emotion/styled-base";
import React, {useState, useContext} from "react";
import { Alert } from "react-bootstrap";
import { StoreContext } from "../..";
import Notify from "../../../screens/modals";
import Toast from "../../Toast";
import { client } from "../../../reducers";
import './style.css'; 

const Login= ()=>{
    const {dispatch } = useContext(StoreContext);
    const [name, setName]=useState('');
    const [last_name, setLname]=useState('');
    const [email, setEmail]=useState('');
    const [tell, setTell]=useState('');
    const [password, setPassword]=useState('');
    const [sidebarState, setState] = useState({
        modal: false,
        toast: ''
      })

    const handleModal = () =>
    setState({ ...sidebarState, modal: !sidebarState.modal })

    const closeModal = (toast) =>
    setState({
        ...sidebarState,
        modal: false,
        toast: toast
      })
   
  

   
    const apiData=async ()=>{
        console.log('name', email)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({f_name: name,l_name: last_name, email:email,tell: tell, password: password})
        };
        const response = await fetch(client+'/homer', requestOptions)
            const data= await response.json()
            .then(e=>{
                console.warn('something',e)
                //dispatch({type: 'ADD_USER', user: user});
            })
            .catch(er=>{console.warn(er)})
    }
    const postData = async() => {
        handleModal();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({email:email,tell: tell, password: password})
        };
        if(tell && password){
            const response = await fetch(client.client+'/api/login', requestOptions)
            const data= await response.json()
            .then(e=>{
                if(e.access_token){
                    const user = {
                        name: e.name,
                        contact: tell,
                        email: email,
                        type: e.type,
                        access_token: e.access_token,
                    } 
                  localStorage.setItem('user', JSON.stringify(user));
                  alert("Welcome back " +e.name)
                  dispatch({type: 'ADD_USER', user: user});
                }
                else{closeModal(e);}
            })
            .catch(error=>{console.log(error)});
            
        }
        else{
            closeModal("Please fill in the form to continue.");

             }}

        

    return(
       <div style={{position: 'absolute',display: 'flex', flexDirection: 'column', 'align-items': 'center', width: '100%', height: '100vh'}}>
        <div className="cover" style={styling.cover}>
            <h1 style={{color: 'gray'}}>Welcome to your Workstation</h1>
            <div style={styling.inputs}>
               <div><input style={styling.btn} type='text' placeholder='Email' onChange={(email) => setEmail(email.target.value)}></input></div>
               <div><input style={styling.btn} type='text' placeholder='Tell' onChange={(tel) => setTell(tel.target.value)}></input></div>
               <div><input style={styling.btn} type='password' placeholder='Password' onChange={(password) => setPassword(password.target.value)}></input></div>
            </div>
            <button style={styling.submitt}  onClick={e=>postData()}>Login</button>
        </div>

        <Notify show={sidebarState.modal} close={handleModal}/>
        <Toast
            toast={sidebarState.toast}
            close={() => setState({ ...sidebarState, toast: '' })}
            end={() => setState({ ...sidebarState, toast: '' })}
        />

        </div>
    )
}

const styling={
    cover: {
        background: 'white',
        top: '5em',
        width: '30em',
        height: '22em',
        position: 'relative', 
        borderRadius: '1em',
        boxShadow: '0 0.188em 1.550em rgb(150, 155, 156)',
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        'justin-Content': 'space-around'
    },
    inputs:{
       
        position: 'relative', 
        display: 'flex',
        'flex-direction': 'column',
       
    },
    btn: {
        border: 'none',
        background: 'rgb(229, 226, 226)',
        height: '4em',
        width: '100%',
        borderRadius: '0.29em',
        textAlign: 'center',
        padding: '2em',
        marginBottom: '0.8em'
    },
    submitt: {
        width: '30%',
        height: '3em',
        background: 'rgb(32, 177, 255)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: '0.25s',
        borderRadius: '0.25em',
        cursor: 'pointer'
    }

}
export default Login;


