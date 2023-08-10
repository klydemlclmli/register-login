import React from 'react'

export default function Welcome(props) {
  // Retrieves the existing JSON of users
  const oldUsers = JSON.parse(localStorage.getItem('users'));
  // Retrieves the user from the existing JSON
  const user = oldUsers[props.email]

  // logout function
  const logout = () => {
    props.setStatus('logout');
  };

  return (
    <div className='reg'>
      <div className='reg-title'>Welcome {user['fName']} {user['lName']}</div>
      <button className='myButton' onClick={logout}>Logout</button>
    </div>
  )
}
