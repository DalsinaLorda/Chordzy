import moment from "moment";
import React, {useContext} from "react"
import { FiCalendar, FiCheck } from 'react-icons/fi';
import { StoreContext } from "..";
import './style.css'

const ChoosePlan= ()=>{
  const { state, dispatch } = useContext(StoreContext);
    return(
      <div>
      <header style={{display: 'flex', 'flex-direction': 'row', width: '100%', background: 'blue',
        'justify-content': 'space-between',
        position: 'relative',
        'margin-bottom': '3.7rem'}}>
           <h2 style={{color: '#1f2933', 'font-family': 'Inter-Medium', 'font-size':' 1.4rem', top: '10px',  position: 'absolute'}}>choose a plan:</h2>
           <h2 style={{color: '#1f2933', display: 'flex','align-items': 'center', position: 'absolute', top: '10px', right: 0, 'font-size': '1.4rem', cursor: 'pointer'}}>Choose the date
           <FiCalendar size={18} color='turquoise' />
           </h2>
          
      </header>
     <ul>
        <form id="former">
          
          <li>
          <label style={{display: 'flex','flex-direction': 'row', 'align-items': 'center', marginBottom: 1, cursor: 'pointer',
  transition: ['border-color 0.25s, background-color 0.25s'] }} htmlFor="opt-express">
         
          <div id="inputHolder">

            <input style={{  opacity: 1,cursor: 'pointer'}}
              type="radio"
              id="opt-express"
              name="plan"
              value='plan'
              onChange={e=>dispatch({type: 'ADD_PLAN' ,payload: 'Express'})}
              
              //defaultChecked
            />
          </div>



              <div style={{height: '4.8rem', width: '80%',}}>
                <span>
                
                </span>

                <div style={{}}>
                  <span style={{ display: 'flex', 'flex-direction': 'column', 'justify-content': 'space-between','margin-left': '1.8rem'}}>
                    <p style={{color: '#3e4c59','font-family': 'Inter-Medium','margin-bottom': 0,'font-size': '0.8rem'}}>Get {moment().format("Do MMM YY")} till 12pm</p>
                    <p style={{color:' #616e7c', 'font-size': '1.1rem'}}>Express</p>
                  </span>
                </div>
              </div>
              <span style={{'font-size': '1.2rem','white-space': 'nowrap', color: '#1f2933', fontFamily: 'Inter-Medium', float: 'right'}}>
                 $0.99
                </span>

          </label>
          </li>

          <li>
          <label style={{display: 'flex','flex-direction': 'row', 'align-items': 'center', marginBottom: 1, cursor: 'pointer',
  transition: ['border-color 0.25s, background-color 0.25s'] }} htmlFor="opt-standard">
        <div id="inputHolder">
          <input style={{  opacity: 1,cursor: 'pointer'}}
                type="radio"
                id="opt-standard"
                name="plan"
                value='plan'
                onChange={e=>dispatch({type: 'ADD_PLAN' ,payload: 'Standard'})}
              
              />
          </div>
              <div style={{height: '4.8rem', width: '80%',}}>
                <span>

                </span>

                <div style={{}}>
                  <span style={{ display: 'flex', 'flex-direction': 'column', 'justify-content': 'space-between','margin-left': '1.8rem'}}>
                    <p style={{color: '#3e4c59','font-family': 'Inter-Medium','margin-bottom': 0,'font-size': '0.8rem'}}>Get {moment().format("Do MMM YY")} till 6pm</p>
                    <p style={{color:' #616e7c', 'font-size': '1.1rem'}}>Standard</p>
                  </span>
                </div>
              </div>
              <span style={{'font-size': '1.2rem','white-space': 'nowrap', color: '#1f2933', fontFamily: 'Inter-Medium', float: 'right'}}>
                  $1
                </span>

          </label>
          </li>

          <li>
          <label style={{display: 'flex','flex-direction': 'row', 'align-items': 'center', marginBottom: 1, cursor: 'pointer',
  transition: ['border-color 0.25s, background-color 0.25s'] }} htmlFor="opt-today">
          <div id="inputHolder">
            <input style={{ opacity: 1,cursor: 'pointer'}}
                type="radio"
                id="opt-today"
                name="plan"
                value='plan'
                onChange={e=>dispatch({type: 'ADD_PLAN' ,payload: 'Today'})}
          
              />
          </div>
              <div style={{height: '4.8rem', width: '80%',}}>
                <span>

                </span>

                <div style={{}}>
                  <span style={{ display: 'flex', 'flex-direction': 'column', 'justify-content': 'space-between','margin-left': '1.8rem'}}>
                    <p style={{color: '#3e4c59','font-family': 'Inter-Medium','margin-bottom': 0,'font-size': '0.8rem'}}>Get today till 8pm</p>
                    <p style={{color:' #616e7c', 'font-size': '1.0rem'}}>Only on working days from 11am to 8pm</p>
                  </span>
                </div>
              </div>
              <span style={{'font-size': '1.2rem','white-space': 'nowrap', color: '#1f2933', fontFamily: 'Inter-Medium', float: 'right'}}>
                  $1
                </span>

          </label>
          </li>
        </form>
        </ul>
      </div>
    

    )
}
export default ChoosePlan;
