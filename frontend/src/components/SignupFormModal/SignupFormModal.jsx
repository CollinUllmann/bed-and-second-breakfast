import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupFormModal.css';

function SignupFormModal({onSignUpSucceed}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true)
    if (password === confirmPassword) {
      setErrors({});
      // setHasSubmitted(false)
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(() => {
          onSignUpSucceed();
          closeModal();

        })
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      <div className='SignUpHeaderDiv'>
        <h1>Sign Up</h1>
      </div>
      <form className='SignupForm' onSubmit={handleSubmit}>
        {errors.firstName && <div className='SignUpErrorMessage error'>{errors.firstName}</div>}
        {errors.lastName && <div className='SignUpErrorMessage error'>{errors.lastName}</div>}
        {errors.email && <div className='SignUpErrorMessage error'>{errors.email}</div>}
        {hasSubmitted && errors.username && <div className='SignUpErrorMessage error'>{errors.username}</div>}
        {hasSubmitted && errors.password && <div className='SignUpErrorMessage error'>{errors.password}</div>}
        {errors.confirmPassword && <div className='SignUpErrorMessage error'>{errors.confirmPassword}</div>}
        <label className='SignUpFormInput'>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
            required
          />
        </label>
        <label className='SignUpFormInput'>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
            required
          />
        </label>
        <label className='SignUpFormInput'>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
          />
        </label>
        <label className='SignUpFormInput'>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            required
          />
        </label>
        <label className='SignUpFormInput'>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
        </label>
        <label className='SignUpFormInput'>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            required
          />
        </label>
        <div className='SubmitButtonDiv'>
          <button disabled={email.length < 1 || firstName.length < 1 || lastName.length < 1 || username.length < 1 || password.length < 1 || confirmPassword.length < 1} type="submit" className='SignUpSubmitButton'>Sign Up</button>
        </div>
      </form>
    </>
  );
}

export default SignupFormModal;
