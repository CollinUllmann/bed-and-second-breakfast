import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import SpotsIndex from './components/SpotsIndex/SpotsIndex'
import CreateNewSpotFormPage from './components/CreateNewSpotFormPage/CreateNewSpotFormPage';
import Navigation from './components/Navigation/Navigation-bonus';
import * as sessionActions from './store/session';
import SpotDetails from './components/SpotDetails';
import ManageUserSpots from './components/ManageUserSpots/ManageUserSpots';
import { Modal } from './context/Modal';
import UpdateSpotFormPage from './components/UpdateSpotFormPage/UpdateSpotFormPage';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
      <Modal />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SpotsIndex/>
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails/>
      },
      {
        path: 'login',
        element: <LoginFormPage />
      },
      {
        path: 'signup',
        element: <SignupFormPage />
      },
      {
        path: 'spots/new',
        element: <CreateNewSpotFormPage />
      },
      {
        path: 'spots/current',
        element: <ManageUserSpots />
      },
      {
        path: 'spots/:spotId/edit',
        element: <UpdateSpotFormPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
