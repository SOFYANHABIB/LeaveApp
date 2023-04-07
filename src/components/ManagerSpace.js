import React from 'react';

import {useEffect, useState} from 'react';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import Table from 'react-bootstrap/Table';

import {Button} from 'react-bootstrap';

 

const ManagerSpace = () => {

 

    const [employees, setEmployees] = useState([]);

 

    useEffect(()=>{

 

        axios.get("http://localhost:4000/users")

        .then((res)=> setEmployees(res.data))

        .catch((err)=> alert("Something went wrong"))

    }, []);

 

  return (

    <div className='row justify-content-center'>

    <div className='col-12'>

    <br />

    <br />

      <Table bordered className='m-1'>

        <thead>

            <tr style={{backgroundColor: 'grey', textAlign: 'center'}} >

                <th>Employee ID</th>

                <th>Employee Name</th>

                <th>Employee Email</th>

                <th>Leave Type</th>

                <th>Day Type</th>

                <th>Start Date</th>

                <th>End Date</th>

                <th>Raison</th>

                <th>Action</th>

            </tr>

        </thead>

        <tbody>

          {employees.map((employee)=>{

            return(<tr key={employee.id}><td>{employee.id}</td><td>{employee.empName}</td><td>{employee.empEmail}</td><td>{employee.leaveType}</td><td>{employee.typeDay}</td><td>{employee.fromDate}</td><td>{employee.toDate}</td><td>{employee.reason}</td><td><Button style={{margin: '10px'}}>Approve</Button><Button>Reject</Button></td></tr>)

          }) }

        </tbody>

      </Table>

      </div>

    </div>

  )

}

 

export default ManagerSpace