/* eslint-disable prettier/prettier */
/** @jsx jsx */
import React, { useCallback, useContext, useState, useEffect } from 'react'
import { css, jsx } from '@emotion/core'
import { StoreContext } from '../../components'
import { jsPDF } from "jspdf";
import { height } from 'dom-helpers';
import {PinDrop, PictureAsPdf, Search} from '@material-ui/icons'
import Tables from '../neww';
import { client } from '../../reducers';

import "./styles.css"
import { FiAirplay, FiArrowDown, FiLoader } from 'react-icons/fi';



const CashOut = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [selectedType, setSelectedType] = useState(null);
  const [query, setQuery]=useState('');
  const [data, setData] = useState([{'status': 'Pending', 'sender_name': 'Dhieu', 'receiver_tell': '980098990', 'receiving_amount': 2403, 'id': 1, 'branch_id': '1', 'transaction_type': 'Express', 'receiver_name': 'ayen', 'sender_tell': 9876543, 'timestamp': '2023-03-12T14:21:07.166193', 'receiver_address': 'Kampala', 'tracking_code': '14585', 'transaction_fee': 5, 'sending_amount': 2404}, {'status': 'Paid', 'sender_name': 'lorda', 'receiver_tell': '98765432', 'receiving_amount': 2000, 'id': 2, 'branch_id': '1', 'transaction_type': 'Express', 'receiver_name': 'Baboya', 'sender_tell': 9876543, 'timestamp': '2023-03-12T14:21:07.166193', 'receiver_address': 'Kololo', 'tracking_code': '0c457', 'transaction_fee': 5, 'sending_amount': 2404}])
  const doc = new jsPDF();
  const user= [
    {   id: '1',
        key: "receiver_name",
        text: "Name",
        className: "name",
        align: "left",
        sortable: true,
    },
    {
        id: '2',
        key: "receiver_tell",
        text: "Mobile",
        className: "name",
        align: "left",
        sortable: true,
    },
    {
      id: '3',
      key: "receiver_address",
      text: "Address",
      className: "address",
      align: "left",
      sortable: true
  }];
  const sender= [
    {   id: '1',
        key: "sender_name",
        text: "Name",
        className: "name",
        align: "left",
        sortable: true,
    },
    {
        id: '2',
        key: "sender_tell",
        text: "Mobile",
        className: "name",
        align: "left",
        sortable: true,
    },
    {
      id: '3',
      key: "receiver_address",
      text: "Address",
      className: "address",
      align: "left",
      sortable: true
  }];

  const Allcolumns = [
    {
      key: "id",
      text: "Id",
      className: "name",
      align: "left",
      sortable: true,
  },
  {
      key: "branch_id",
      text: "Branch",
      className: "address",
      align: "left",
      sortable: true
  },
  {
      key: "sending_amount",
      text: "Amount",
      className: "postcode",
      sortable: true
  },
  {
    key: "transaction_fee",
    text: "Fee",
    className: "name",
    align: "left",
    sortable: true,
},
  {
      key: "status",
      text: "Status",
      className: "type_of_food",
      sortable: true,
      align: "left"
  },  {
    key: "timestamp",
    text: "Date",
    className: "rating",
    align: "left",
    sortable: true
},]

const columns = [
  {   id: '1',
      key: "tracking_code",
      text: "Tracking Id",
      className: "name",
      align: "left",
      sortable: true,
  },
  {
      id: '1',
      key: "branch_id",
      text: "Branch",
      className: "name",
      align: "left",
      sortable: true,
  },
  {
    id: '2',
    key: "transaction_type",
    text: "Type",
    className: "address",
    align: "left",
    sortable: true
},
  {
    id: '3',
    key: "receiving_amount",
    text: "Amount",
    className: "postcode",
    sortable: true
},

{
  id: '5',
  key: "status",
  text: "Status",
  className: "type_of_food",
  sortable: true,
  align: "left"
},
{
  id: '7',
  key: "receiving_amount",
  text: "Amount",
  className: "postcode",
  sortable: true
},]

    useEffect(()=>{
      if(query.length===0 || query.length>2){
       // myTrans()
      }
       // myTrans();
       }, [])

       useEffect(()=>{
         myTrans();
         }, [])

       const search=(e)=>{
         if(query.length > 4){
         return e.filter(user=>user.receiver_tell.toLowerCase().includes(query) || user.tracking_code.toLowerCase().includes(query))
       }
       return e;
      }
       console.warn();

    const myTrans = async() => {
        try {
        const userInfo = state.user.access_token;
         const response = await fetch(client.client+'/api/branchtransactions', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'access-token': userInfo,
              'Authorization': 'Bearer ' + userInfo,
            }})
          const data= await response.json()
         .then(datas=> { 
            try {
              if (datas.message){
                alert(datas.message+ 'Please login.');
                dispatch({type: 'LOG_OUT'});
               // setData(datas);
            }
            else setData(datas);
             
            } catch (e) { console.log(e)
            }})
          .catch(error=> {return console.log(error);});
          }catch (e) {
         console.log(e);}}

        
  

         const getTransactionHtml=()=>{
          let tableHtml = "<table>";
          tableHtml += "<thead>";
          tableHtml += "<tr>";
          for (let column of Allcolumns) {
            tableHtml += "<th>" + column.text + "</th>";
          }
          tableHtml += "</tr>";
          tableHtml += "</thead>";
          tableHtml += "<tbody>";
      
          // Filter records before export
          //let filterRecords = this.props.records;
          for (let i in data) {
            let record = data[i];
            tableHtml += "<tr>";
            for (let column of Allcolumns) {
              console.warn(record['id']);
             tableHtml += "<td>" + record[column.key] + "</td>";
            }
            tableHtml += "</tr>";
           }
          tableHtml += "</tbody>";
          tableHtml += "</table>";
          return tableHtml;
        }

         const getExportHtml=()=>{
           let tableHtml = "<table>";
           tableHtml += "<thead>";
           tableHtml += "<tr>";
           for (let column of columns) {
             tableHtml += "<th>" + column.text + "</th>";
           }
           tableHtml += "</tr>";
           tableHtml += "</thead>";
           tableHtml += "<tbody>";
           for (let i in search(data)) {
             let record = search(data)[i];
             tableHtml += "<tr>";
             for (let column of columns) {
              tableHtml += "<td>" + record[column.key] + "</td>";
             }
             tableHtml += "</tr>";
            }
           tableHtml += "</tbody>";
           tableHtml += "</table>";
           return tableHtml;
         }

         const getReciever=()=>{
          let tableHtml = "<table>";
          tableHtml += "<thead>";
          tableHtml += "<tr>";
          for (let column of user) {
            tableHtml += "<th>" + column.text + "</th>";
          }
          tableHtml += "</tr>";
          tableHtml += "</thead>";
          tableHtml += "<tbody>";

          for (let i in search(data)) {
            let record = search(data)[i];
            tableHtml += "<tr>";
            for (let column of user) {
             tableHtml += "<td>" + record[column.key] + "</td>";
            }
            tableHtml += "</tr>";
           }
          tableHtml += "</tbody>";
          tableHtml += "</table>";
          return tableHtml;
        }
        
        const getSender=()=>{
          let tableHtml = "<table>";
          tableHtml += "<thead>";
          tableHtml += "<tr>";
          for (let column of sender) {
            tableHtml += "<th>" + column.text + "</th>";
          }
          tableHtml += "</tr>";
          tableHtml += "</thead>";
          tableHtml += "<tbody>";
    
          for (let i in search(data)){
            let record = search(data)[i];
            tableHtml += "<tr>";
            for (let column of sender) {
             tableHtml += "<td>" + record[column.key] + "</td>";
            }
            tableHtml += "</tr>";
           }
          tableHtml += "</tbody>";
          tableHtml += "</table>";
          return tableHtml;
        }

         const expPDF=()=>{
          let win = window.open('', '_blank');
          let tableHtml = getExportHtml();
          let Reciever=getReciever();
          let senderInfo=getSender();
          let style = "<style>";
          style = style + "table {width: 100%;font: 17px Calibri;}";
          style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
          style = style + "padding: 2px 3px;text-align:left;}";
          style = style + "</style>";
          //const body=document.getElementById('Content');
          //doc.fromHTML("<div>JOmin</div>", 1, 1);
          //doc.save("download.pdf");
          win.document.write('<html><head>');
          win.document.write('<title>' +'Lorda Money Transfer' + '</title>');
          win.document.write(style);
          win.document.write('</head>');
          win.document.write('<body>');
          win.document.write('<h1>'+ 'The transaction' +'</h1>');
          win.document.write(tableHtml);
          win.document.write('<h1>'+ 'The Sender Details' +'</h1>');
          win.document.write(senderInfo);
          win.document.write('<h1>'+ 'The Reciever Details' +'</h1>');
          win.document.write(Reciever);
          win.document.write('<h2>'+ 'Signature:..........................' +'</h2>');
          win.document.write('<h1>'+ 'Date:' +'</h1>');
          win.document.write('</body></html>');
          win.print();
          win.close();
         }

         const expTransactionPDF=()=>{
          let win = window.open('', '_blank');
          let tableHtml = getTransactionHtml();
          let style = "<style>";
          style = style + "table {width: 100%;font: 17px Calibri;}";
          style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
          style = style + "padding: 2px 3px;text-align:left;}";
          style = style + "</style>";
          win.document.write('<html><head>');
          win.document.write('<title>' +'Lorda Money Transfer' + '</title>');
          win.document.write(style);
          win.document.write('</head>');
          win.document.write('<body>');
          win.document.write('<h1>'+ 'The transactions' +'</h1>');
          win.document.write(tableHtml);
          win.document.write('</body></html>');
          win.print();
          win.close();
         }
  return (
    <div id="Content"   css={CSS}> 

    <div id="Box">
      <p style={{color: 'black'}}>Recent Transactions</p>
      <div id="BranchBox">
        <p style={{color: 'black', 'font-size': 15, 'margin-right': 20, 'font-weight': 'lighter'}}>{state.user.type==='adminstrator'? 'Admin': 'Staff'} User: {state.user.name}</p>
        
      </div>
    </div>
    <div id="searchBox">

      <div id="Search">
          <input id="nwinput" onChange={e=>setQuery(e.target.value)} type="text" placeholder ="Enter number/code.." />
      </div>

      <div style={{width: 35}} id="Search">
      
        <button  style={{width: 50}} className="btn-btnw"><FiArrowDown size={30}/></button>
      </div>

      <div id="Search">
        {query.length >4 && search(data).length ===1 ?(<button onClick={e=>expPDF()} className="btn-btnw"><PictureAsPdf size={30}/></button>)
        :
        <button onClick={e=>expTransactionPDF()} className="btn-btnw"><PictureAsPdf size={30}/></button>}
      </div>

      
      
    </div>
      <table id="t01">
        <thead className="thead">
        <tr>
      
         
          <td>Code</td>
          <td>Sender</td>
          <td>To</td>
          <td>Recipient</td>
          <td>Tell</td>
          <td>Charge</td>
          <td>Amount</td>
          <td>Status</td>
          <td style={{color: 'black'}}>Action</td>
          <td />
          <td/>
        </tr>
        </thead>

  <tbody>
    
  {search(data)?.map((type) => (
        <Tables
          total={search(data).length}
          id={type.id}
          code={type.tracking_code}
          r_name={type.receiver_name}
          s_name={type.sender_name}
          to={type.receiver_address}
          tell={type.receiver_tell}
          Amount={type.sending_amount}
          charge={type.transaction_fee}
          status={type.status}
          isSelected={type.id === selectedType}
          onPress={() => setSelectedType(type.id)}
        />
      ))}
        
    
  </tbody>
  <thead id="bttomthead">
        <tr>
          <td className="sl" >Total</td>
          <td />
          <td></td>
          <td></td>
          <td></td>
          
          <td>189</td>
          <td>50000</td>
          <td></td>
          <td></td>
          <td></td>
          <td />
          <td/>
        </tr>
        </thead>
</table>
    </div>
  )
}

//onChange={e=>dispatch({type: 'ADD_USER' ,Pay_Load: e.target.value})}

const styles={
    
    button: {
        background: 'turquoise',
        width: 60,
        height: 40,
        borderRadius: 50,
        marginLeft: -60
    }
}

const CSS = css`
  padding-top: 1px;
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

 

    
    .playlist-title {
    font-size: 30px;
    font-weight: bold;
    text-transform: capitalize;
    font-family:Arial;

    }


    /*table tr {
    border-bottom: 1px solid #00203FFF;
    }*/            
               
  

`

export default CashOut