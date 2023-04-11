import React, { useEffect, useRef } from 'react';

import {useState} from 'react'

import axios from 'axios';

import {useParams} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Table from 'react-bootstrap/Table';

import {Button} from 'react-bootstrap';

import emailjs from '@emailjs/browser';

 

const CreateLeave = () => {

 

    const params = useParams();

 

    const [employee, setEmployee] = useState({

 

        id: "",

        empName: "",

        empEmail: "",

        password: "",

        role: "",

        leaveType: "",

        typeDay: "",

        fromDate: "",

        toDate: "",

        reason: "",

        mngrEmail: "",

        annLeave: {

            credits: "",

            debits: "",

            balance: "",

            unit: ""

 

        },

 

        sickLeave: {

            credits: "",

            debits: "",

            balance: "",

            unit: ""

        }

    });

 

    const [state, setState] = useState({

        id: "",

        empName: "",

        empEmail: "",

        leaveType:"",

        typeDay:"",

        fromDate:"",

        toDate:"",

        reason:"",

        mngrEmail:""

   

    })

    const form = useRef();

  const sendEmail = () => {

    emailjs.sendForm('service_g0lbnfk', 'template_qe18nzf', form.current, '7k8CyFUZgUr0Jk1bF')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

   

 

    useEffect(()=>{

 

        axios.get("http://localhost:4000/users/" + params.id )

        .then((res)=> {setEmployee(res.data);

                        console.log(res);})

        .catch((err)=> alert("Something went wrong"))

    }, []);




    const handleSubmit = (e) =>{

        e.preventDefault();

 

        let request = {

            id: employee.id,

        empName: employee.empName,

        empEmail: employee.empEmail,

        password: employee.password,

        role: employee.role,

        leaveType: state.leaveType,

        typeDay: state.typeDay,

        fromDate: state.fromDate,

        toDate: state.toDate,

        reason: state.reason,

        mngrEmail: state.mngrEmail,

        annLeave: {

            credits: employee.annLeave.credits,

            debits: employee.annLeave.debits,

            balance: employee.annLeave.balance,

            unit: employee.annLeave.unit

 

        },

 

        sickLeave: {

            credits: employee.sickLeave.credits,

            debits: employee.sickLeave.debits,

            balance: employee.sickLeave.balance,

            unit: employee.sickLeave.unit

        }

 

        }

 

        axios.put("http://localhost:4000/users/"+ params.id, request)

        .then((res)=> {alert("Leave Request sent");


                        sendEmail();

                        setState({...state, id: "",

                        empName: "",

                        empEmail: "",

                        leaveType:"",

                        typeDay:"",

                        fromDate:"",

                        toDate:"",

                        reason:"",

                        mngrEmail:"" });

                    })

        .catch((err)=> alert("Something went wrong"))

 

   

    };

 

   

    const handleChange = (event) =>{

        let {name, value} = event.target;

        setState({...state, [name]:value});

        console.log(state);

       

    }

  return (

    <div>

    <br/>

        <br/>

      <h4>Leave Account Balance</h4>

      <br/>

 

      <h4>Employee Name:<span style={{marginLeft: '5px', color: 'blue'}}>{employee.empName}</span></h4>

 

      <div className='row'>

      <div className='col-6'>

        <Table bordered className='m-1'>

        <thead>

            <tr style={{backgroundColor: 'grey', textAlign: 'center'}}>

               

                <th>Leave Type</th>

                <th>Credits</th>

                <th>Debits</th>

                <th>Balance</th>

                <th>Unit</th>

            </tr>

        </thead>

 

        <tbody>

            <tr>

                <td>Annual Leave</td><td>{employee.annLeave.credits}</td><td>{employee.annLeave.debits}</td><td>{employee.annLeave.balance}</td><td>{employee.annLeave.unit}</td>

               

            </tr>

            <tr>

                <td>Sick Leave</td><td>{employee.sickLeave.credits}</td><td>{employee.sickLeave.debits}</td><td>{employee.sickLeave.balance}</td><td>{employee.sickLeave.unit}</td>

               

            </tr>

        </tbody>

        </Table>

        </div>

        </div>

        <br/>

 

       

        <h4>Leave Request</h4>

        <form  ref={form} className="form" onSubmit={(event)=> handleSubmit(event)}>

        <table>

            <tbody>

 

            <tr>

                <td><label >Employee ID</label></td>

                <td><input type="number" name="id" className="form-control" value={employee.id} onChange={handleChange}></input></td>

            </tr>

            <tr>

                <td><label >Employee Name</label></td>

                <td><input type="text" name="empName" className="form-control" value={employee.empName} onChange={handleChange}></input></td>

            </tr>

           

           

            <tr>

                <td><label >Employee Email</label></td>

                <td><input type="email" name="empEmail" className="form-control" placeholder='employee@infosys.com' value={employee.empEmail} onChange={handleChange}></input></td>

            </tr>

            <tr>

                <td>

                    <label >Leave Type <span id="asterik">*</span></label>

                </td>

                <td>

                    <select name="leaveType" className="form-control" value={state.leaveType} onChange={handleChange}>

                        <option value="annualLeave" >

                            Annual Leave

                        </option>

                        <option value="sickLeave">

                            Sick Leave

                        </option>

                    </select>

                </td>

                <td>

                    <select name="typeDay" className="form-control" value={state.typeDay} onChange={handleChange}>

                        <option value="fullDay">

                            Full Day

                        </option>

                        <option value="halfDay">

                            Half Day

                        </option>

                    </select>

                </td>

            </tr>

            <tr>

                <td><label >From Date dd-mm-yyyy <span id="asterik">*</span></label></td>

                <td><input type="date" name="fromDate" className="form-control" value={state.fromDate} onChange={handleChange}></input></td>

                <td><label >To Date dd-mm-yyyy <span id="asterik">*</span></label></td>

                <td><input type="date" name="toDate" className="form-control" value={state.toDate} onChange={handleChange}></input></td>

               

            </tr>

            <tr>

                <td><label >Reason for Leave/Adress and phone no. during leave period</label></td>

                <td><input type="text" name="reason" className="form-control" value={state.reason} onChange={handleChange}></input></td>

            </tr>

            <tr>

            <td><label>Approval Manager Email <span id="asterik">*</span> </label></td>

            <td><input type="text" name="mngrEmail" className="form-control" placeholder='manager@infosys.com' value={state.mngrEmail} onChange={handleChange}/>

            </td>

            </tr>

            </tbody>

        </table>

        {/* Validation

        disable={!valid} */}

        <Button  type="submit">Apply</Button>

       

        </form>

        <br/>

    </div>

  )

}

 

export default CreateLeave