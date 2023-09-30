import apiCourse from './components/api/axiosCourseConfig.js'
import { useEffect, useState } from 'react';
import './App.css';
import Nav from './components/userpage/Nav.js'
import Nav2 from './components/userpage/Nav2.js'
import Banner from './components/userpage/Banner.js'
import Cover from './components/userpage/Cover.js'
import Course from './components/userpage/Course.js'
import Footer from './components/userpage/Footer.js'
import Login from './components/userpage/Login.js'
import Signup from './components/userpage/Signup.js'
import Feature from './components/userpage/Feature.js'
import Search from './components/userpage/Search.js'
import InstructorDashboard from './components/dashboard/InstructorDashboard.js';
import CoursesContent from './components/dashboard/CoursesContent.js';
import DashboardContent from './components/dashboard/DashboardContent.js';
import StudentContent from './components/dashboard/StudentContent.js';
import ReportsContent from './components/dashboard/ReportsContent.js';
import PerformanceContent from './components/dashboard/PerformanceContent.js';
import Account from './components/account/Account.js'
import AccountAssignment from './components/account/AccountAssignment.js'
import AccountLearning from './components/account/AccountLearning.js'
import AccountNotification from './components/account/AccountNotification.js'
import AccountPurchase from './components/account/AccountPurchase.js'
import AccountSetting from './components/account/AccountSetting.js'
import CoursePreview from './components/coursepage/CoursePreview'
import ScrollToTop from './components/extension/ScrollToTop';
import Cart from './components/userpage/Cart.js';
import WelcomeInstructor from './components/dashboard/WelcomeInstructor';
import ProtectedRouteINS from './components/protect/ProtectedRouteINS.js'
import ProtectedRouteSTU from './components/protect/ProtectedRouteSTU.js'
import CreateCourse from './components/dashboard/CreateCourse.js';
import { BrowerRoute as Router, Routes, Route, Link, Navigate, useNavigate, redirect } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
function App() {
  const [courses, setCourses] = useState();

  const getCourses = async () => {
    try {
      const response = await apiCourse.get("/getCourses");
      console.log(response.data)
      setCourses(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCourses();
  }, []
  )

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>


        <Route path="/login" element={
          <>
            <Banner />
            <Nav2 login="" signup="Sign Up" />
            <Login />
            <Footer />
          </>
        }>
        </Route>
        <Route path="/signup" element={
          <>
            <Banner />
            <Nav2 login="Login" signup="" />
            <Signup />
            <Footer />
          </>
        }>
        </Route>

        <Route path="/" element={
          <>
            {/* <ProtectedRouteSTU> */}
            <Banner />
            <Nav2 login="Login" signup="Sign Up" />
            <Cover />
            <Course courses={courses} />
            <Feature />
            <Footer />
            {/* </ProtectedRouteSTU> */}
          </>}>
        </Route>
        <Route path="/search" element={
          <>
            {/* <ProtectedRouteSTU> */}
            <Banner />
            <Nav2 login="Login" signup="Sign Up" />
            <Search courses={courses} />
            <Footer />
            {/* </ProtectedRouteSTU> */}
          </>
        }>
        </Route>
        <Route path="/cart" element={
          <>
            {/* <ProtectedRouteSTU> */}
            <Banner />
            <Nav2 login="Login" signup="Sign Up" />
            <Cart />
            <Footer />
            {/* </ProtectedRouteSTU> */}
          </>
        }>
        </Route>
        <Route exact path="/:id"
          element={
            <> 
            {/* <ProtectedRouteSTU> */}
              <Banner />
              <Nav2 login="Login" signup="Sign Up" />
              <CoursePreview courses={courses} />
              <Footer />
            {/* </ProtectedRouteSTU> */}
            </>
          }
        >
        </Route>

        <Route path='/instructordashboard'
          element={<>
            <ProtectedRouteINS>
              <InstructorDashboard />
              <Feature create="true" />
            </ProtectedRouteINS>
          </>}
        />
        <Route path='/instructordashboard/dashboard' element={<><ProtectedRouteINS><DashboardContent /> </ProtectedRouteINS></>} />
        <Route path='/instructordashboard/courses' element={<><ProtectedRouteINS><CoursesContent /> </ProtectedRouteINS></>} />
        <Route path='/instructordashboard/student' element={<><ProtectedRouteINS><StudentContent /> </ProtectedRouteINS></>} />
        <Route path='/instructordashboard/reports' element={<><ProtectedRouteINS><ReportsContent /> </ProtectedRouteINS></>} />
        <Route path='/instructordashboard/performance' element={<><ProtectedRouteINS><PerformanceContent /> </ProtectedRouteINS></>} />
        <Route path='/instructordashboard/courses/createcourse' element={<><ProtectedRouteINS><CoursesContent /> <CreateCourse /> </ProtectedRouteINS></>} />
        <Route path='/account' element={<Account />} />
        <Route path='/account/setting' element={<> <ProtectedRouteSTU><Account setting="true" /><AccountSetting /> </ProtectedRouteSTU></>} />
        <Route path='/account/learning' element={<> <ProtectedRouteSTU><Account learning="true" /><AccountLearning /> </ProtectedRouteSTU></>} />
        <Route path='/account/notification' element={<> <ProtectedRouteSTU><Account noti="true" /><AccountNotification /> </ProtectedRouteSTU></>} />
        <Route path='/account/purchase' element={<> <ProtectedRouteSTU><Account history="true" /><AccountPurchase /> </ProtectedRouteSTU></>} />
        <Route path='/account/assignment' element={<> <ProtectedRouteSTU><Account assignment="true" /><AccountAssignment /> </ProtectedRouteSTU></>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
