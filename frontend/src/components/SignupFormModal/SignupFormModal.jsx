import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupFormModal.css';

function SignupFormModal() {
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

  useEffect(() => {
    username.length < 4 ? setErrors({username: 'Username must be at least 4 characters'}) : delete errors.username
    password.length < 6 ? setErrors({password: 'Password must be at least 6 characters'}) : delete errors.password
  }, [username, password, errors.password, errors.username])

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
        .then(closeModal)
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
        <label className='SignUpFormInput'>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
          />
        </label>
        {errors.email && <p className='SignUpErrorMessage'>{errors.email}</p>}
        <label className='SignUpFormInput'>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            required
          />
        </label>
        {hasSubmitted && errors.username && <p className='SignUpErrorMessage'>{errors.username}</p>}
        <label className='SignUpFormInput'>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
            required
          />
        </label>
        {errors.firstName && <p className='SignUpErrorMessage'>{errors.firstName}</p>}
        <label className='SignUpFormInput'>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
            required
          />
        </label>
        {errors.lastName && <p className='SignUpErrorMessage'>{errors.lastName}</p>}
        <label className='SignUpFormInput'>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
        </label>
        {hasSubmitted && errors.password && <p className='SignUpErrorMessage'>{errors.password}</p>}
        <label className='SignUpFormInput'>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            required
          />
        </label>
        {errors.confirmPassword && <p className='SignUpErrorMessage'>{errors.confirmPassword}</p>}
        <div className='SubmitButtonDiv'>
          <button disabled={errors.username || errors.password || email.length < 1 || firstName.length < 1 || lastName.length < 1 || confirmPassword.length < 1} type="submit" className='SignUpSubmitButton'>Sign Up</button>
        </div>
      </form>
    </>
  );
}

export default SignupFormModal;
