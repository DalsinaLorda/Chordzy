import React, {style} from "react";

const MoneyAvailable= ()=>{
    return(
        <div style={{marginTop: -30}}>
            <h2 style={{color: '#1f2933', 'margin-bottom': '-0.5rem','font-family':'Inter-Medium',
    'font-size': '2rem'}}>Send Money</h2>
            <div style={{display: 'flex',
    'align-items': 'baseline',
    'flex-direction': 'row' , marginBottom: 10}}>
                <span style={{color: 'turquoise',
      'font-family': 'Inter-Bold',
      'margin-right': '0.4rem',
      'font-size':'1.5rem'}}>$120000</span>
                <p style={{color: '#616e7c', 'font-size':'1.3rem'}}> available</p>
            </div>
        </div>
    )
}
export default MoneyAvailable;