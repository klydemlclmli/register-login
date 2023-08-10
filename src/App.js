import React, {useState} from 'react'
import './App.css';
import Register from './components/Register';
import Login from './components/Login'
import Welcome from './components/Welcome';

function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('login');

  // Register
  if (status === 'register'){
    return(
      <div className='App'>
        <Register status={status} setStatus={setStatus}/>
      </div>
    )
  }
  // Welcome
  else if (status === 'welcome'){
    return(
      <div className='App'>
        <Welcome status={status} setStatus={setStatus} email={email}/>
      </div>
    )
  }
  // Login
  else{
    return(
      <div className='App'>
        <Login status={status} setStatus={setStatus} setEmail={setEmail}/>
      </div>
    )
  }
}

export default App;
