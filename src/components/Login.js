import React, {useState} from 'react'
import PasswordToggle from '../hooks/PasswordToggle';
import './Login.css';

export default function Register(props) {
  // consts for the User details
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // consts for the Password Toggle Visibility
  const [PasswordInputType, TogglePasswordIcon] = PasswordToggle();

  // Handles Form's onSubmit
  async function handleSubmit(e){
    e.preventDefault();
    try {
      await submitForm(email, password);
      props.setStatus('welcome');
      props.setEmail(email)
    } catch (err) {
      props.setStatus('login');
      setError(err);
    }
  }

  // custom email border
  const emailBorder = email !== '' ? 'emailNotEmpty' : 'textfields';

  // Form validation
  function submitForm(email, password){
    return new Promise((resolve, reject) => {
      // Retrieves the existing JSON of users
      const oldUsers = JSON.parse(localStorage.getItem('users'));
      // Checks if email is existing
      if (oldUsers === null || !(email in oldUsers)){
        reject(new Error('Invalid email.'));
      }
      else{
        // Checks if passwords is correct
        const checkUser = oldUsers[email]
        let isPasswordCorrect = password === checkUser['password'];
        if(isPasswordCorrect){
          resolve();
        }
        else {
          reject(new Error('Wrong password.'));
        }
      }
    })
  }

  // redirection function for the Registration page
  const goToRegister = () => {
    props.setStatus('register');
  };

  // Displays Login form
  return (
    <div className='reg'>
      <div className='reg-title'>Login</div>
      
      <form className='reg-form' onSubmit={handleSubmit}>
        {/*E-mail*/}
        <div className={emailBorder}>
          <input
            type="email"
            onChange={(e)=>setEmail(e.target.value)}
            required="required"
            id='email'
          />
          <span className="placeholder">E-mail</span>
        </div>
        <div className='textfields'>
        <input
            type={PasswordInputType}
            onChange={(e)=>setPassword(e.target.value)}
            required="required"
            id='password'
          />
          <span className="placeholder">Password</span>
          <span className="password-toggle-icon">{TogglePasswordIcon}</span>
        </div>
        {/*Error text*/}
        {error != null &&
        <p className="error-message">
          {error.message}
        </p>
        }
        <button className='myButton'>Sign In</button>
      </form>
      <div className='bottom-text'>
        Don't have an account?
      <button className='myButton-plain' onClick={() => goToRegister()}>Register</button>.
      </div>
    </div>
  );
}
