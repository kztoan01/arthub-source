
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
import { BrowerRoute as Router, Routes, Route, Link } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <>
            <Banner />
            <Nav2 login="Login" signup="Sign Up" />
            <Cover />
            <Course />
            <Feature />
            <Footer />
          </>}>
        </Route>
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
        <Route path="/search" element={
          <>
            <Banner />
            <Nav2 login="Login" signup="Sign Up" />
            <Search />
            <Footer />
          </>
        }>
        </Route>
      </Routes>
      <Routes>
        <Route path='/instructordashboard' element={<InstructorDashboard />} />
        <Route path='/instructordashboard/dashboard' element={<><InstructorDashboard /><DashboardContent /></>} />
        <Route path='/instructordashboard/courses' element={<><InstructorDashboard /><CoursesContent /></>} />
        <Route path='/instructordashboard/student' element={<><InstructorDashboard /><StudentContent /></>} />
        <Route path='/instructordashboard/reports' element={<><InstructorDashboard /><ReportsContent /></>} />
        <Route path='/instructordashboard/performance' element={<><InstructorDashboard /><PerformanceContent /></>} />
      </Routes>
      <Routes>
        <Route path='/account' element={<Account />} />
        <Route path='/account/setting' element={<><Account /><AccountSetting /></>} />
        <Route path='/account/learning' element={<><Account /><AccountLearning /></>} />
        <Route path='/account/notification' element={<><Account /><AccountNotification /></>} />
        <Route path='/account/purchase' element={<><Account /><AccountPurchase /></>} />
        <Route path='/account/assignment' element={<><Account /><AccountAssignment /></>} />
      </Routes>
      <Routes>
        <Route path="/coursedetail" element={
          <>
            <Banner />
            <Nav2 login="Login" signup="Sign Up" />
            <CoursePreview />
            <Footer />
          </>
        }>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
