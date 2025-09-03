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
import AddStudent from './Pages/AddStudent.jsx';
import Addcourse from './Pages/Addcourse.jsx';
import Manage from './Pages/Manage.jsx';
import Addfaculty from './Pages/Addfaculty.jsx';
import Contact from './Pages/Contact.jsx';
import ViewProfile from './Pages/ViewProfile.jsx';
import Authprovider from './Provider/Authprovider.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Privateroute from './Rout/Privateroute.jsx';
import { ToastContainer } from 'react-toastify';
import Profile from './Pages/Profile.jsx';
import UpdateProfile from './Pages/Updateprofile.jsx';
import ForgetPassword from './Pages/ForgetPassword.jsx';
import Enrollment from './Pages/Enrollment.jsx';


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
       element:<Privateroute><Students/></Privateroute>,
       loader:()=>fetch(`${import.meta.env.VITE_API}/student`)
     },
     {
      path: "/courses",
      element:<Privateroute><Courses/></Privateroute>,
      loader:()=>fetch(`${import.meta.env.VITE_API}/course`)
     },
     {
        path: "/faculty",
        element:<Privateroute><Faculty/></Privateroute>,
        loader:()=>fetch(`${import.meta.env.VITE_API}/faculty`)
     },
     {
       path: "/schedule",
       element:<Privateroute><Schedule/></Privateroute>
     },
     {
      path: "/settings",
      element:<Privateroute><Settings/></Privateroute>
     },
     {
      path:'/addStudent',
      element:<Privateroute><AddStudent/></Privateroute>
     },
     {
      path:'/addCourse',
      element:<Privateroute><Addcourse/></Privateroute>
     },
     {
      path:'/EnrolleCourse/:id',
      element:<Privateroute><Enrollment/></Privateroute>,
      
     },
     {
      path:'/manage',
      element:<Privateroute><Manage/></Privateroute>
     },
     {
      path:'/addfaculty',
      element:<Privateroute><Addfaculty/></Privateroute>
     },
     {
      path:'/contact/:id',
      element:<Privateroute><Contact/></Privateroute>,
      loader:()=>fetch('/public/Facultydata.json')
     },
     {
      path:'/ViewProfile/:id',
      element:<Privateroute><ViewProfile/></Privateroute>,
      loader:({params})=>fetch(`${import.meta.env.VITE_API}/faculty/${params.id}`) 
    },
    {
      path:"/profile",
      element:<Privateroute><Profile/></Privateroute>
    },
    {
      path:"/update-profile",
      element:<Privateroute><UpdateProfile/></Privateroute>
    },
    {
      path:"/forgotPassword",
      element:<ForgetPassword/>
    },
     {
      path:'/login',
      element:<Login/>
     },
     {
      path:'register',
      element:<Register/>
     }
      
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
        <RouterProvider router={router}/>
    </Authprovider>
    <ToastContainer/>
  </StrictMode>,
)
