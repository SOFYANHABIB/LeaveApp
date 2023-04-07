import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from './components/Login';

import CreateLeave from './components/CreateLeave';

import ManagerSpace from './components/ManagerSpace';

 

function App() {

  return (

    <div className="App">

<BrowserRouter>

 

<Routes>

 

<Route path="/" element={<Login />} />

<Route path="/createleave/:id" element={<CreateLeave />} />

<Route path="/managerspace" element={<ManagerSpace />} />

 

</Routes>

 

</BrowserRouter>

    </div>

  );

}

 

export default App;
