import { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(() => {
    credential.length < 4 ? setErrors({credential: 'Credential must be at least 4 characters'}) : delete errors.credential
    password.length < 6 ? setErrors({password: 'Password must be at least 6 characters'}) : delete errors.password
  }, [credential, password, errors.password, errors.credential])

  if (sessionUser) return <Navigate to="/" replace={true} />;


  const handleSubmit = (e) => {
    e.preventDefault();

    setHasSubmitted(true)

    setErrors({});
    // setHasSubmitted(false)

    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {hasSubmitted && errors.credential && <p>{errors.credential}</p>}
        <button disabled={errors.credential || errors.password} type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormPage;
