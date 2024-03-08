import React, { useCallback, useContext, useState, useEffect } from 'react';
import { StoreContext } from '..'; 
import {FiArrowRight, FiArrowRightCircle, FiGrid } from 'react-icons/fi';
import {Link} from "react-router-dom";
import "../../screens/dashboard/styles.css";
const Windowns = ({data}) => {
    const { state, dispatch } = useContext(StoreContext);
    return (
        <div className="BigBox">
            <div className="BoxContent">
                <div id="subBox">
                    <div><h1 style={{marginLeft: 10}}>{data?.allBranches ? data?.allBranches: '0'}</h1></div>
                    <div><h3 style={{marginLeft: 10}}>Total Branches</h3></div>
                    <div id="moreInfo"><Link id="link" to="/Branches">More info<FiArrowRightCircle  size={16} style={{marginLeft: 10}}/></Link></div>
                </div>

                <div id="subBox">
                    <div><h1 style={{marginLeft: 10}}>{data?.agents? data.agents: '0'}</h1></div>
                    <div><h3 style={{marginLeft: 10}}>Total Agents</h3></div>
                    <div id="moreInfo">
                        <Link id='link' to="/Users">More info<FiArrowRightCircle  size={16} style={{marginLeft: 10}}/></Link>
                    </div>
                </div>

                

                <div id="subBox">
                    <div><h1 style={{marginLeft: 10}}>{data?.transactions ? data?.transactions: '0'}</h1></div>
                    <div><h3 style={{marginLeft: 10}}>Total Transactions</h3></div>
                    <div id="moreInfo"> <Link id='link' to="/CashOut">More info<FiArrowRightCircle  size={16} style={{marginLeft: 10}}/></Link></div>
                </div>

                <div id="subBox">
                    <div><h1 style={{marginLeft: 10}}>{data?.active ? data?.active: '0'}</h1></div>
                    <div><h3 style={{marginLeft: 10}}>Active Agents</h3></div>
                    <div id="moreInfo"><h4>More info<FiArrowRightCircle  size={16} style={{marginLeft: 10}}/></h4></div>
                </div>

                
            </div>
            <div className="bigBoxx">
           
                <div id="subBox">
                    <div><h1 style={{marginLeft: 10}}>10</h1></div>
                    <div><h3 style={{marginLeft: 10}}>Total Admins</h3></div>
                    <div id="moreInfo"><h4>More info<FiArrowRightCircle  size={16} style={{marginLeft: 10}}/></h4></div>
                </div>

                <div id="subBox">
                    <div><h1 style={{marginLeft: 10}}>{data?.unpaid ? data?.unpaid: '0'}</h1></div>
                    <div><h3 style={{marginLeft: 10}}>Total UnPaid</h3></div>
                    <div id="moreInfo"><Link id='link' to="/CashOut">More info<FiArrowRightCircle  size={16} style={{marginLeft: 10}}/></Link></div>
                </div>
 

                <div id="subBox">
                    <div><h1 style={{marginLeft: 10}}>{data?.cashedOut ? data?.cashedOut: '0'}</h1></div>
                    <div><h3 style={{marginLeft: 10}}>Total CashOut</h3></div>
                    <div id="moreInfo"><Link id='link' to="/History">More info<FiArrowRightCircle  size={16} style={{marginLeft: 10}}/></Link></div>
                </div>

                <div id="subBox">
                    <div><h1 style={{marginLeft: 10}}>Analytics</h1></div>
                    <div><h3 style={{marginLeft: 10}}>Graphics</h3></div>
                    <div id="moreInfo"><Link id="link" to="/Analytics"><h4>View info<FiArrowRightCircle  size={16} style={{marginLeft: 10}}/></h4></Link></div>
                </div>
                
            </div>

            
            
        </div>
    )
};

export default Windowns;