import LoginPage from './main/pages/LoginPage/LoginPage.tsx';
import RegistrationPage from './main/pages/RegistrationPage/RegistrationPage.tsx';
import NotFoundPage from './main/pages/404-Page/404Page.tsx';
import HomePage from './main/pages/HomePage/HomePage.tsx';
import ProfilePage from './main/pages/ProfilePage/ProfilePage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

const router = createBrowserRouter([
  {
    path:"/",
    element: <HomePage />,
    errorElement:<NotFoundPage />
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/register',
    element: <RegistrationPage />,
    errorElement: <NotFoundPage />
  },

  {
    path:"/profile",
    element: <ProfilePage />
  },
  /*
    To add a new route/url
    in here: Add another object like this
    {
      path:"/link",
      element: <ElementToRender />
    }
  */
]);

export default function App() {
  return (
    <RouterProvider router={router}/>
  )
};
