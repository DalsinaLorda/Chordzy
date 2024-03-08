/* eslint-disable prettier/prettier */
/** @jsx jsx */
import React, { useCallback, useContext, useState } from 'react'
import { css, jsx } from '@emotion/core'
import { StoreContext } from './index'
import MoneyAvailable from './MoneyAvailable'
import Conversions from './conversions'
import ChoosePlan from './ChoosePlan'
import PaymentDetails from './PaymentDetails'
import "./content.css"


const Content = () => {
  const { state, dispatch } = useContext(StoreContext)

  let str= {'date_created': '2023', 'id': '1', 'status': 'Paid','trans': "{'branch_id': '1', 'timestamp': '2023-04', 'name': 'lorda'}"};
  let obj=str.trans.replace(/'/g, '"');
  //obj=JSON.parse(obj);
  //console.log(obj.name);
  

  return (
    <div className="Content"   css={CSS}> 
    <MoneyAvailable/>
      <div className="mainContainer">
        <div style={{'margin-right': '4.9rem'}}>
          <Conversions/>
          <ChoosePlan/>
        </div>
        <div>
          <PaymentDetails/>
        </div>
      </div>
    </div>
  )
}

//onChange={e=>dispatch({type: 'ADD_USER' ,Pay_Load: e.target.value})}



const CSS = css`
  width: calc(100% - 200px);
  height: 100%;
  padding: 50px;

  background: white;    // **


  padding-top: 10px;
  overflow-y: scroll;
  overflow-x:hidden;
  color: white;// #00203FFF;/white; */  /#00203FFF; /  /*white;/

  ::-webkit-scrollbar {
    width: 15px;
  }

  ::-webkit-scrollbar-thumb {
    //background: #00203FFF;    // background: #00103f;
    background-image:linear-gradient(#000000,#2C041C,#000000);
  }

  

  
  

  
  




  tr:hover td { background:  #46072d !important;
               

                .Search{
                  /*  position:absolute;
                   left: 50%;
                   top: 5%;
                   transform: translate(-50%, -50%);
                   padding: 20px;  */

                   position:relative;

                   height: 100px;
                   left:87px;
                   padding: 20px;
                   
                   }
                   
                 
               
  

`

export default Content