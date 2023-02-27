import LoginPage from './main/pages/LoginPage/LoginPage.tsx';
import NotFoundPage from './main/pages/404-Page/404Page.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

const router = createBrowserRouter([
  {
    path:"/",
    element: <LoginPage />,
    errorElement:<NotFoundPage />
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
