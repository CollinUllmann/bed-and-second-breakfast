import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
    <span className='Header'>
      <div className='LogoImageDiv'>
        <NavLink><img className='Logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1200px-Airbnb_Logo_B%C3%A9lo.svg.png' /></NavLink>
      </div>
      <div className='CreateSpotAndProfileButtonContainer'>
        {sessionUser && (
          <NavLink className={'CreateNewSpotLink'} to='spots/new'>Create New Spot</NavLink>
        )}
        {isLoaded && (
          <ProfileButton user={sessionUser} />
        )}
      </div>
    </span>
    </>
  );
}

export default Navigation;
