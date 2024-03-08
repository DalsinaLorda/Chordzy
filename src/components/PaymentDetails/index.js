import { Fireplace } from '@material-ui/icons';
import React, { useCallback, useContext, useState } from 'react';
import {
    FiArrowRight,
    FiCalendar,
    FiDollarSign,
    FiShuffle,
    FiMenu, 
    FiOctagon,
    FiPercent
  } from 'react-icons/fi';
import { StoreContext } from "..";
import Notify from '../../screens/modals';
import Toast from '../Toast';
import { client } from '../../reducers';
import './styles.css';

const PaymentDetails = () => {
    const { state, dispatch } = useContext(StoreContext);
    const payload=state.payload; 
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

    const sendPayment = async() => {
        handleModal();
        const user = {
            plan: payload.plan,
            sender_tell: payload.senderId,
            sender_name: payload.senderName,
            reciever_tell: payload.receverId,
            reciever_name: payload.receverName,
            from: payload.from,
            reciever_address: payload.to,
            amount_sent: payload.sent,
            amount_received: payload.sent*(1-5/100),
            amount_charge: payload.sent*5/100,
            date_sent: payload.sentAt,
        } 
       
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'access-token': state.user.access_token, 
            'Authorization': state.user.access_token,},
            body: JSON.stringify(user)
        };
        
        if(payload.plan && payload.sent && payload.from && payload.receverName){
            const response = await fetch(client.client+'/api/sendmoney', requestOptions)
            const data= await response.json()
            .then(e=>{
                if(e.data){
                    alert(e.data);
                    dispatch({type: 'CLEAR_BASKET'});
                    closeModal(e.data);
                }
                else{
                    console.warn(e.message)
                    closeModal(e.message);
                }   
               // dispatch({type: 'ADD_USER', user: user});
            })
            .catch(e=>{console.warn(e)})  }
        else{
            
            closeModal("Please fill in the forms.");
           
             }}

  return (
    <div className="Content" style={{border: '#e4e7eb', display: 'flex','flex-direction': 'column',padding:' 4rem 0', 'max-width':' 100%', 'min-width': 181, height:' 30.4rem', 'border-radius': '0.4rem', border: '0.2rem solid #e4e7eb'}}> 
        <header>
            <h2 style={{color: '#1f2933','font-family': 'Inter-Semibold','padding-left':' 4rem','font-size':' 2.4rem', 'margin-top': '-2.3rem'}}>
                Payment Details
            </h2>
        </header>
        <div style={{ display: 'flex', 'flex-direction': 'row', 'justify-content': 'center', padding: '0 2rem'}}>
            <div style={{display: 'flex', 'flex-direction': 'column', 'align-items': 'center'}}>
                <span style={{ color: '#1f2933',' font-family': 'Inter-Semibold', ' margin-bottom':' 0.9rem', 'font-size':' 0.8rem'}}>{payload.sent}</span>
                <div style={{display: 'flex', ' flex-direction': 'row', ' align-items': 'center'}}>
                    <span>sl</span>
                    <span style={{color: '#1f2933',  display: 'inline-block', 'font-size': '0.6rem'}}>BRL</span>

                </div>
            </div>

            <div style={{display: 'flex', 'align-items': 'center',' justify-content': 'center', margin: '0 5.7rem', width: '1.6rem', height:' 1.6rem',
                    'border-radius':'50%',
                    'box-shadow':' 0 0.2rem 0.7rem rgba(123, 135, 148, 0.28)'}}>
                <FiArrowRight size={20} color={'turquoise'}/>

            </div>

            <div style={{display: 'flex', 'flex-direction': 'column', 'align-items': 'center'}}>
                <span style={{ color: '#1f2933',' font-family': 'Inter-Semibold', ' margin-bottom':' 0.9rem', 'font-size':' 0.8rem'}}>{payload?.sent ? payload?.sent*(1-5/100) : '0.000' }</span>
                <div style={{display: 'flex', ' flex-direction': 'row', ' align-items': 'center'}}>
                    <span>sl</span>
                    <span style={{color: '#1f2933',  display: 'inline-block', 'font-size': '0.6rem'}}>CAD</span>
                </div>
            </div>
        </div>
        <span className='Divider' style={{'background-color': '#e4e7eb', margin: '2.4rem 0 2.9rem', display: 'block', width: '100%', height: '0.2rem'}}> </span>

        <ul style={{display: 'flex', 'flex-direction': 'column', position: 'relative',padding:' 0 4rem',height:' 100%',}}>
           

        <li style={{display: 'flex', 'flex-direction': 'row','justify-content': 'space-between','align-items': 'center', marginBottom: 10}}>
                <span style={{color:'#3e4c59', display: 'flex','align-items': 'center','font-size': '1.2rem','white-space': 'nowrap'}}>
                <FiOctagon   color={'turquoise'} />
                   Plan
                </span>
                <strong style={{color: '#1f2933','font-family': 'Inter-Semibold','font-size': '1.3rem', 'white-space': 'nowrap'}}>{payload.plan}</strong>
            </li>
            <li style={{display: 'flex', 'flex-direction': 'row','justify-content': 'space-between','align-items': 'center',  marginBottom: 10}}>
                <span style={{color:'#3e4c59', display: 'flex','align-items': 'center','font-size': '1.2rem','white-space': 'nowrap'}}>
                <FiCalendar  color={'turquoise'}  /> Delivery
                </span>
                <strong style={{color: '#1f2933','font-family': 'Inter-Semibold','font-size': '1.3rem', 'white-space': 'nowrap'}}>32 July till 12pm</strong>
            </li>

            <li style={{display: 'flex', 'flex-direction': 'row','justify-content': 'space-between','align-items': 'center',  marginBottom: 10}}>
                <span style={{color:'#3e4c59', display: 'flex','align-items': 'center','font-size': '1.2rem','white-space': 'nowrap'}}>
                <FiPercent color={'turquoise'} /> Conversion rate
                </span>
                <strong style={{color: '#1f2933','font-family': 'Inter-Semibold','font-size': '1.3rem', 'white-space': 'nowrap'}}>%5</strong>
            </li>
            <li style={{display: 'flex', 'flex-direction': 'row','justify-content': 'space-between','align-items': 'center',  marginBottom: 10}}>
                <span style={{color:'#3e4c59', display: 'flex','align-items': 'center','font-size': '1.2rem','white-space': 'nowrap'}}>
                <FiDollarSign color={'turquoise'} /> Transfer fee
                </span>
                <strong style={{color: '#1f2933','font-family': 'Inter-Semibold','font-size': '1.3rem', 'white-space': 'nowrap'}}>{payload?.sent ? payload?.sent*(5/100) : '0.000' }</strong>
            </li>
            
            <li style={{display: 'flex', 'flex-direction': 'row','justify-content': 'space-between','align-items': 'center',  marginBottom: 10}}>
                <span style={{color:'#3e4c59', display: 'flex','align-items': 'center','font-size': '1.2rem','white-space': 'nowrap'}}>
                <FiShuffle  color={'turquoise'}  /> Recipient gets
                </span>
                <strong style={{color: '#1f2933','font-family': 'Inter-Semibold','font-size': '1.3rem', 'white-space': 'nowrap'}}>{payload?.sent ? payload?.sent : '0.000' }</strong>
            </li>
        </ul>
        <button id="submit" onClick={e=>sendPayment()} type='submit' style={{width: '60%',  margin: '0 auto',
    border: '0.2rem solid turquoise',
    padding: '0.1rem 1rem',
    'font-size':'1.8rem',
    'border-radius': '0.4rem',
    transition: 'color 0.25s, background-color 0.25s'}}>Submit</button>

    <Notify show={sidebarState.modal} close={handleModal}/>
    <Toast
        toast={sidebarState.toast}
        close={() => setState({ ...sidebarState, toast: '' })}
        end={() => setState({ ...sidebarState, toast: '' })}
      />


    </div>

    
  )
}

export default PaymentDetails;