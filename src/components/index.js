/* eslint-disable prettier/prettier */
/** @jsx jsx */
import React, { createContext, useEffect, useReducer, useMemo, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import { css, jsx } from '@emotion/core'
import { initialState, reducer } from '../reducers'

import AppUsers from '../screens/appUsers';
import Sidebar from './Sidebar';
import Content from './Content';
import Splash from '../screens/Splash';
import CashOut from '../screens/cashOut';
import Authentications from './authentication';
import DataTableBase from '../screens/Tables';
import Branches from '../screens/branchList';
import History from '../screens/history';
import Dashboard from '../screens/dashboard';
import Analytics from '../screens/analytics';
//import Search from './Search'

export const StoreContext = createContext(null)

const Main = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const providerValue=useMemo(()=>({state, dispatch}), [state, dispatch]);
  const [isLoading, setIsLoading]=useState(true);

  useEffect(() => {
    setTimeout(async()=>{
     JSON.parse(localStorage.getItem('items'));
     const authUser=JSON.parse(localStorage.getItem('user'));
     if (authUser) {
         const user = {
             name: authUser.name,
             contact: authUser.contact,
             email: authUser.email,
             type: authUser.type,
             access_token: authUser.access_token,
         }
         dispatch({type: 'ADD_USER', user: user})
         setIsLoading(false);
       // console.warn(user.type)
     }
     else {
       dispatch({type: 'LOG_OUT'})
       setIsLoading(false)
       
      }
   }, 1000)}, [])


  return (
   
    <StoreContext.Provider value={providerValue}>
     <switch>
      <div css={CSS}>
       {/*  <Topbar /> */}
       {isLoading ? (
            <Splash/>
          ): state?.user?.access_token == null ? ( 
           
            <Authentications/>
             
          ):
        <>
          <Sidebar/>

          <Route exact path="/">
            <Content />
          </Route>
          
          <Route exact path="/CashOut">
            <CashOut />
          </Route>

          <Route exact path="/Dashboard">
            <Dashboard />
          </Route>

          <Route exact path="/History">
            <History />
          </Route>

          <Route exact path="/Users">
            <AppUsers/>
          </Route>-

          <Route exact path="/Branches">
            <Branches/>
          </Route>

          <Route exact path="/Analytics">
            <Analytics/>
          </Route>
        
        </>
      }
        
      </div>
      </switch>
    </StoreContext.Provider>  
   
  )
}

const CSS = css`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  color: white;
`

export default Main