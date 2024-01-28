import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginFormModal.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          setErrors(data);
        }
      });
  };
  
  const demoLogin = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({credential: 'aragorn_crownedking', password: '5tr1d3r' }))
      .then(closeModal);
  };


  return (
    <>
      <div className='LogInHeaderDiv'>
        <h1>Log In</h1>        
      </div>
      {errors.message && <p className='LoginErrorMessage'>{errors.message}</p>}
      <form className='LoginForm' onSubmit={handleSubmit}>
        <label className='LogInFormInput'>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder='Username or Email'
            
          />
        </label>
        <label className='LogInFormInput'>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            
          />
        </label>
        
        <div className='SubmitButtonDiv'>
          <button className='LogInSubmitButton' type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
        </div>
        <div className='SubmitButtonDiv'>
          <button className='DemoLoginButton' onClick={demoLogin}>Demo User</button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
