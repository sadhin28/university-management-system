import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Students from './Pages/Students.jsx';
import Courses from './Pages/Courses.jsx';
import Faculty from './Pages/Faculty.jsx';
import Schedule from './Pages/Schedule.jsx';
import Settings from './Pages/Settings.jsx';
import Errorpage from './Pages/Errorpage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement:<Errorpage/>,
    children:[
      {
        path:'/',
        element:<Dashboard/>,
        loader:()=>fetch('/DashboardData.json')
      },
     {
       path: "/students",
       element:<Students/>
     },
     {
      path: "/courses",
      element:<Courses/>
     },
     {
        path: "/faculty",
        element:<Faculty/>
     },
     {
       path: "/schedule",
       element:<Schedule/>
     },
     {
      path: "/settings",
      element:<Settings/>
     }
      
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
