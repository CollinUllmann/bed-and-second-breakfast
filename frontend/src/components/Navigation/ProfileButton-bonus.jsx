import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useNavigate } from 'react-router-dom';
import { MdOutlineSegment } from "react-icons/md";


function ProfileButton({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const ulIdName = "profile-dropdown" + (user ? "-logged-in" : "-logged-out")

  return (
    <>
      <div className='ProfileButton' onClick={toggleMenu}>
        <MdOutlineSegment />
        <i className="fas fa-user-circle" />
      </div>
      <div className={ulClassName} ref={ulRef} id={ulIdName}>
        {user ? (
          <>
            <div className='DropdownUsernameDiv'>Hello, {user.firstName}</div>
            <div className='DropdownEmailDiv'>{user.email}</div>
            <div className='ManageSpotsButtonContainer'>
              <hr className='DropdownDivider' />
              <div className='ManageSpotsButton' onClick={() => navigate('/spots/current')}>Manage Spots</div>
            </div>
            <div className='LogoutButtonContainer'>
              <hr className='DropdownDivider' />
              <div className='DropdownLogOutButton' onClick={logout}>Log Out</div>
            </div>
          </>
        ) : (
          <div className='LoggedOutDropdownDiv'>
            <div className='DropdownLogInButton'>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div className='DropdownSignUpButton'>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal onSignUpSucceed={()=>setShowMenu(true)}/>}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
