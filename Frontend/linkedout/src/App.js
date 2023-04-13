import LoginPage from './main/pages/LoginPage/LoginPage.tsx';
import RegistrationPage from './main/pages/RegistrationPage/RegistrationPage.tsx';
import NotFoundPage from './main/pages/404-Page/404Page.tsx';
import HomePage from './main/pages/HomePage/HomePage.tsx';
import ProfilePage from './main/pages/ProfilePage/ProfilePage.tsx';
import AddJobListingPage from './main/pages/AddJobListing/AddJobListing.tsx';
import JobDetailsPage from './main/pages/JobDetailsPage/JobDetailsPage.tsx';
import ProfilePageJob from './main/pages/ProfilePage/ProfilePageJob/ProfilePageJob.tsx';
import ProfilePageEducation from './main/pages/ProfilePage/ProfilePageEducation/ProfilePageEducation.tsx';
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
    path: "/profile",
    element: <ProfilePage />
  },

  {
    path:"/addJob",
    element: <AddJobListingPage />
    //errorElement: <NotFoundPage />
  },

  {
    path: "/job/:id",
    element: <JobDetailsPage />
  },

  {
    path: "/profile/:id",
    element: <ProfilePage />
  },

  {
    path: "/404",
    element: <NotFoundPage/>
  },
  {
    path:"/profile-edit-experience",
    element: <ProfilePageJob />
  },

  {
    path:"/profile-edit-education",
    element: <ProfilePageEducation />
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
