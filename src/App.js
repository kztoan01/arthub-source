
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
        <Route path="/cart" element={
          <>
            <Banner />
            <Nav2 login="Login" signup="Sign Up" />
            <Cart />
            <Footer />
          </>
        }>
        </Route>
      </Routes>
      <Routes>
        <Route path='/instructordashboard' element={<><InstructorDashboard /><Feature /></>} />
        <Route path='/instructordashboard/dashboard' element={<><InstructorDashboard dashboard="true"/><DashboardContent /></>} />
        <Route path='/instructordashboard/courses' element={<><InstructorDashboard course="true"/><CoursesContent /></>} />
        <Route path='/instructordashboard/student' element={<><InstructorDashboard student="true"/><StudentContent /></>} />
        <Route path='/instructordashboard/reports' element={<><InstructorDashboard report="true"/><ReportsContent /></>} />
        <Route path='/instructordashboard/performance' element={<><InstructorDashboard perform="true"/><PerformanceContent /></>} />
      </Routes>
      <Routes>
        <Route path='/account' element={<Account />} />
        <Route path='/account/setting' element={<><Account setting="true" /><AccountSetting /></>} />
        <Route path='/account/learning' element={<><Account learning="true"/><AccountLearning /></>} />
        <Route path='/account/notification' element={<><Account noti="true" /><AccountNotification /></>} />
        <Route path='/account/purchase' element={<><Account history="true" /><AccountPurchase /></>} />
        <Route path='/account/assignment' element={<><Account assignment="true" /><AccountAssignment /></>} />
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
