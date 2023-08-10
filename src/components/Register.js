import React, {useState} from 'react'
import PasswordToggle from '../hooks/PasswordToggle';
import './Register.css';

export default function Register(props) {
  // consts for the User details
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  // consts for the Password Toggle Visibility
  const [PasswordInputType, TogglePasswordIcon] = PasswordToggle();
  const [ConfirmPasswordInputType, ToggleConfirmPasswordIcon] = PasswordToggle();

  // Handles Form's onSubmit
  async function handleSubmit(e){
    e.preventDefault();
    try {
      await submitForm(fName, lName, email, gender, password, confirmPassword);
      props.setStatus('login');
      alert('Registration Success! You may now login your account.');
    } catch (err) {
      props.setStatus('register');
      setError(err);
    }
  }

  // Form validation
  function submitForm(fName, lName, email, gender, password, confirmPassword){
    return new Promise((resolve, reject) => {
      // Checks if there is an already existing JSON
      const oldUsers = JSON.parse(localStorage.getItem('users'));
    
      const newUser = {[email]: {
        'fName': fName,
        'lName': lName,
        'email': email,
        'gender': gender,
        'password': password
      }};
    
      // if empty
      if (oldUsers === null){
        // Checks if passwords match
        let didPasswordMatch = password !== confirmPassword;
        if(didPasswordMatch){
          reject(new Error('Passwords did not match.'));
        }
        // Creates a new JSON of users
        else {
          localStorage.setItem('users', JSON.stringify(newUser));
          resolve();
        }
      }
      // if existing
      else{
        // Checks if email is existing
        if (!(email in oldUsers)){
          // Checks if passwords match
          let didPasswordMatch = password !== confirmPassword;
          if(didPasswordMatch){
            reject(new Error('Passwords did not match.'));
          }
          // updates the existing JSON of users
          else {
            const updatedUsers = Object.assign(oldUsers, newUser);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            resolve();
          }
        }
        else{
          reject(new Error('Email already registered.'));
        }
      }
    })
  }

  // redirection function for the Login page
  const goToLogin = () => {
    props.setStatus('login');
  };

  // custom select border
  const selectBorder = gender === 'male' || gender === 'female' ? 'option-selected' : 'default-selected';

  // custom email border
  const emailBorder = email !== '' ? 'emailNotEmpty' : 'textfields';

  // Display Registration Form
  return(
    <div className='reg'>
      <div className='reg-title'>Register</div>
      
      <form className='reg-form' onSubmit={handleSubmit}>
        {/*First Name*/}
        <div className='textfields'>
          <input
            type="text"
            onChange={(e)=>setFName(e.target.value)}
            required="required"
            id='fname'
          />
          <span className="placeholder">First Name</span>
        </div>
        {/*Last Name*/}
        <div className='textfields'>
          <input
            type="text"
            onChange={(e)=>setLName(e.target.value)}
            required="required"
            id='lname'
          />
          <span className="placeholder">Last Name</span>
        </div>
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
        {/*Gender*/}
        <div className='textfields'>
          <select className={selectBorder} id="gender" onChange={(e)=>setGender(e.target.value)}>
            <option value="gender-label"></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <span className="placeholder">Gender</span>
        </div>
        {/*Password*/}
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
        {/*Confirm Password*/}
        <div className='textfields'>
          <input
            type={ConfirmPasswordInputType}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            required="required"
            id='confirmPassword'
          />
          <span className="placeholder">Confirm Password</span>
          <span className="password-toggle-icon">{ToggleConfirmPasswordIcon}</span>
        </div>
        {/*Error text*/}
        {error != null &&
        <p className="error-message">
          {error.message}
        </p>
        }
        {/*Submit Button*/}
        <button className='myButton'>Submit</button>
      </form>
      {/*Login link*/}
      <div className='bottom-text'>
        Already have an account?
        <button className='myButton-plain' onClick={() => goToLogin()}>Login</button>.
      </div>
    </div>
  );
}
