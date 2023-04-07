import React, {useState, useEffect} from 'react';

import axios from 'axios';

import {useNavigate} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

 

const Login = () => {

 

    const navigate = useNavigate();

 

    

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

 

    const [employees, setEmployees] = useState([]);

    console.log("employees", employees);

 

    useEffect(()=>{

 

        axios.get("http://localhost:4000/users")

        .then((res)=> {setEmployees(res.data);

        console.log(res);})

        .catch((err)=> alert("Something went wrong"))

    },[]);

 

    const login = (e) =>{

 

        e.preventDefault();

 

        let emp = employees.find((el)=> el.empEmail === email);

 

        if(emp.empEmail === email && emp.password === password && emp.role === "employee"){

 

            navigate("/createleave/"+ emp.id);

        }

        else if (emp.empEmail === email && emp.password === password && emp.role === "manager"){

 

            navigate("/managerspace");

 

        }

        else{

 

            alert("Wrong credentials");

        }

 

       

    }

 

  return (

   

   

   

      <div>

      <br />

      <br />

      <div className="container">

      <form>

      <div className="form-group">

      <label><h4>Email :</h4></label>

      <input style={{ width: "40%" }} className="form-control"  type="email"  value={email} onChange={(event)=>setEmail(event.target.value)} placeholder="Enter email ..."/>

      </div>

      <br />

      <div className="form-group">

      <label><h4>Password :</h4></label>

      <input  style={{ width: "40%" }} className="form-control"   type="password"  value={password} onChange={(event)=>setPassword(event.target.value)} placeholder="Enter password ..."/>

      </div>

      <br />

      <button type="submit" className="btn btn-primary" onClick={(event)=>login(event)}>Login</button>

      </form>

    </div>

    </div>

  )

}

 

export default Login