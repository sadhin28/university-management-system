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
import Settings from './Pages/Settings.jsx';
import Errorpage from './Pages/Errorpage.jsx';
import AddStudent from './Pages/AddStudent.jsx';
import Addcourse from './Pages/Addcourse.jsx';
import Manage from './Pages/Manage.jsx';
import Addfaculty from './Pages/Addfaculty.jsx';
import Contact from './Pages/Contact.jsx';
import ViewProfile from './Pages/ViewProfile.jsx';
import Authprovider from './Provider/Authprovider.jsx';
import Privateroute from './Rout/Privateroute.jsx';
import { ToastContainer } from 'react-toastify';
import Profile from './Pages/Profile.jsx';
import UpdateProfile from './Pages/Updateprofile.jsx';
import ForgetPassword from './Pages/ForgetPassword.jsx';
import Enrollment from './Pages/Enrollment.jsx';
import MyEnrolled from './Pages/MyEnrolled.jsx';
import ViewCourse from './Pages/ViewCourse.jsx';
import AuthForm from './Pages/AuthForm.jsx';
import Admin from './Pages/Admin.jsx';
import Privateadmin from './Rout/Privateadmin.jsx';
import StudentResult from './student/StudentResult.jsx';
import StudentFees from './student/StudentFees.jsx';
import Notices from './Pages/Notices.jsx';
import Payment from './Admin/Payment.jsx';
import SchedulePage from './student/StudentSchedule.jsx';
import UsersPage from './Admin/Alluser.jsx';
import ViewNotice from './Pages/ViewNotice.jsx';
import AssignmentPanel from './Pages/Assignment.jsx';
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
       path:'/alluser',
       element:<Privateadmin><UsersPage/></Privateadmin>,
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
      path: "/settings",
      element:<Privateroute><Settings/></Privateroute>
     },
     {
      path:'/addStudent/:uid',
      element:<Privateadmin><AddStudent/></Privateadmin>
     },
     {
      path:'/addCourse',
      element:<Privateadmin><Addcourse/></Privateadmin>
     },
     {
      path:'/EnrolleCourse/:id',
      element:<Privateroute><Enrollment/></Privateroute>,
       loader:({params})=>fetch(`${import.meta.env.VITE_API}/course/${params.id}`) 
      
     },
     {
      path:'/manage',
      element:<Privateroute><Manage/></Privateroute>
     },
     {
      path:'/addfaculty',
      element:<Privateadmin><Addfaculty/></Privateadmin>
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
      path:"/my-enrolled",
      element:<Privateroute><MyEnrolled/></Privateroute>,
  
    },
    {
      path:"/viewCourse/:id",
      element:<Privateroute><ViewCourse/></Privateroute>
    },
    {
      path:"/admin",
      element:<Privateadmin><Admin/></Privateadmin>
    },
    
    {
      path:"/forgotPassword",
      element:<ForgetPassword/>
    },
     {
      path:'/login',
      element:<AuthForm/>,
       loader:()=>fetch(`${import.meta.env.VITE_API}/student`)
     },  
     {
      path:'/results',
      element:<Privateroute><StudentResult/></Privateroute>
     },
     {
      path:'/fees',
      element:<Privateroute><StudentFees/></Privateroute>
     },
     {
      path:'/notices',
      element:<Privateroute><Notices/></Privateroute>
     },
     {
      path:'/admin-notices',
      element:<Privateadmin><Notices/></Privateadmin>
     },
     {
      path:'/admin-payments',
      element:<Privateadmin><Payment/></Privateadmin>
     },
     {
      path:"/studentChedule",
      element:<Privateroute><SchedulePage/></Privateroute>
     },
     {
      path:"/ViewNotice/:id",
      element:<Privateroute><ViewNotice/></Privateroute>
     },
     {
      path:"/assignments",
      element:<Privateroute><AssignmentPanel/></Privateroute>
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
