import React, { useState, useContext } from "react";
import { FiArrowDownCircle, FiRefreshCcw } from 'react-icons/fi';
import { StoreContext } from "..";
import "./style.css";

const Conversions = () => {
    const { state, dispatch } = useContext(StoreContext);
    const [deg, setDeg] = useState(state.payload?.sent ? 90 : 0);
    const [origin, setOrigin] = useState('Juba')
    const [amount, setAmount] = useState('0.000')
    const theme = 'light'
    return (
        <div style={{ width: '100%', background: 'transparent' }}>
            <div className="mainBox">
                <div id="submainBox" style={{ background: theme === 'light' ? '#f5f7fA' : '#0c0c0c', }}>
                    <h3 style={{ color: theme === 'light' ? '#000' : 'gray', fontSize: 15, marginLeft: 5 }}>From: </h3>
                    <input style={{ border: 0, color: theme === 'light' ? '#000' : 'gray', background: 'transparent', padding: '10px 0', width: '80%', fontSize: 15, fontFamily: 'Inter-Medium', marginTop: 20, marginLeft: 5 }}
                        pe="text"
                        placeholder='Juba'
                        onChange={e => dispatch({ type: 'ADD_FROM', payload: e.target.value })}
                    />
                    <FiArrowDownCircle size={15} style={{ color: theme === 'light' ? '#000' : 'gray', marginRight: 10 }} />
                </div>


                <div id="submainBox" style={{ background: theme === 'light' ? '#f5f7fA' : '#0c0c0c', }}>
                    <h3 style={{ color: theme === 'light' ? '#000' : 'gray', fontSize: 15, marginLeft: 5 }}>To: </h3>
                    <select className="select-btn" onChange={e => dispatch({ type: 'ADD_TO', payload: e.target.value })} >
                        <option value="">Select destination</option>
                        <option value="Pagarau">Pagarau</option>
                        <option value="Juba">Juba</option>
                        <option value="Wau">Wau</option>
                    </select>

                </div>
            </div>

            <div className="secmainBox">
                <div id="sendBox">
                    <div className="subBox">
                        <h3 style={{ color: 'black', fontSize: 13, }}>You Send</h3>
                        <input id="iput" style={{ border: 0, height: '20px', background: 'transparent', padding: '10px 0', width: '150%', fontSize: 15, fontFamily: 'Inter-Medium', textAlign: 'center' }}
                            type="number"
                            placeholder='0.000'
                            onInput={e => setDeg(90)}
                            onChange={e => dispatch({ type: 'ADD_SENT', payload: e.target.value })}
                        />

                    </div>
                    {/*div>
                        <h3 style={{color: 'transparent', marginLeft: 35,  fontSize: 20}}>hh</h3>
                    </div>*/}

                </div>

                <div id="arrowHead"> <FiRefreshCcw style={{ rotate: deg + 'deg' }} size={22} color='turquoise' /></div>

                <div id="sendBox" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="subBoxtwo">
                        <h3 style={{ color: 'black', fontSize: 15, }}>Recipient gets</h3>

                    </div>
                    <div id="receipient">
                        <h3>{state.payload?.sent ? state.payload?.sent * (1 - 5 / 100) : '0.000'}</h3>
                    </div>
                </div>
            </div>

            <div className="textBox">
                <textarea placeholder="Type sender name"
                    onChange={e => dispatch({ type: 'ADD_SENDER_N', payload: e.target.value })}
                />
                <input id="numberInput" type="number" placeholder="Enter sender contact"
                    onChange={e => dispatch({ type: 'ADD_SENDER_TELL', payload: e.target.value })} />
            </div>

            <div className="textBox">
                <textarea placeholder="Enter recipient name"
                    onChange={e => dispatch({ type: 'ADD_REC_Name', payload: e.target.value })}
                />
                <input id="numberInput" maxLength={10} type="number" placeholder="Enter recipient contact"
                    onChange={e => dispatch({ type: 'ADD_REC_TELL', payload: e.target.value })} />
            </div>
        </div>
    )
}
export default Conversions;
