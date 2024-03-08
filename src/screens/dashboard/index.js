import React, { useCallback, useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../components';
import Windowns from '../../components/dashboards';
import { client } from '../../reducers';
import "./styles.css";

const Dashboard = () => {
    const { state, dispatch } = useContext(StoreContext);
    const [data, setData]=useState([]);

    useEffect(()=>{
        sendPayment();
    }, [])

    const sendPayment = async() => {
        const user = {
            plan: '',
        } 
       
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'access-token': state.user.access_token, 
            'Authorization': state.user.access_token}
        }
            const response = await fetch(client.client+'/api/dashboard', requestOptions)
            const data= await response.json()
            .then(e=>{
                if(e){
                    setData(e);
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
                <p style={{color: 'black'}}>Dashboard</p>
                <p style={{color: 'black', 'font-size': 15, 'margin-right': 20, 'font-weight': 'lighter'}}>{state.user.type==='adminstrator'? 'Admin': 'Staff'} User: {state.user.name}</p>
            </div>

           {data &&  <Windowns
                data={data}
            
            
            />}
        </div>
    )
};

export default Dashboard;