import apiCourse from './components/api/axiosCourseConfig.js'
import api from './components/api/axiosAccountConfig'
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
import ProtectedRouteINS from './components/protect/ProtectedRouteINS.js'
import ProtectedRouteSTU from './components/protect/ProtectedRouteSTU.js'
import CreateCourse from './components/dashboard/CreateCourse.js';
import Gallery from './components/learning/Gallery.js'
import AdminDashboard from './components/admin/AdminDashboard.js'
import CourseDetails from './components/learning/CourseDetails.js';
import ProtectedCourseData from './components/protect/ProtectedCourseData.js';
import ProtectedAdmin from './components/protect/ProtectedAdmin.js';
import ManageAccount from './components/admin/ManageAccount.js';
import ManageCourse from './components/admin/MagageCourse.js'
import ManageNotify from './components/admin/ManageNotify.js'
import Company from './components/introduction/Company.js';
import Blog from './components/introduction/Blog.js';
import Testimonials from './components/introduction/Testimonials.js';
import Team from './components/introduction/Team.js';
import apiLearner from './components/api/axiosLearnerConfig.js'
import Tictactoe from './components/userpage/Tictactoe.js';
import PreviewCourse from './components/dashboard/PreviewCourse.js';
import ProtectedStudentInfo from './components/protect/ProtectedStudentInfo.js';
import PreviewPendingCourse from './components/admin/PreviewPendingCourse.js';
import ArthubPerformance from './components/admin/ArthubPerformance.js';
import { BrowerRoute as Router, Routes, Route, Link, Navigate, useNavigate, redirect } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
function App() {

  const [users, setUsers] = useState();
  const [courses, setCourses] = useState();
  const [learner, setLearner] = useState();
  // get 
  const thisAccount = JSON.parse(localStorage.getItem("logined"))
  const thisStudent = learner?.filter((learner) => learner.accountId === thisAccount?.id);
  //get course leaner
  const getLearner = async () => {
    try {
      const response = await apiLearner.get("/getLearners");
      setLearner(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getLearner();
  }, []
  )
  //get all users
  const getUsers = async () => {
    try {
      const response = await api.get("/accounts");
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUsers();
  }, []
  )
  //get all courses
  const getCourses = async () => {
    try {
      const response = await apiCourse.get("/getCourses");
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

        <Route path="/game" element={
          <>
            <Banner />
            <Nav2 login="" signup="Sign Up" />
            <div
              style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white'
              }}>
              <Tictactoe /></div>
            <Footer />
          </>
        }>
        </Route>
        <Route path="/login" element={
          <>
            <Banner />
            <Nav2 login="" signup="Sign Up" />
            <Login users={users} />
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
            <ProtectedRouteSTU>
              <Banner />
              <Nav2 login="Login" signup="Sign Up" />
              <Cover />
              <Course courses={courses} />
              <Feature />
              <Footer />
            </ProtectedRouteSTU>
          </>}>
        </Route>
        <Route path="/search" element={
          <>
            <ProtectedRouteSTU>
              <Banner />
              <Nav2 login="Login" signup="Sign Up" />
              <Search courses={courses} />
              <Footer />
            </ProtectedRouteSTU>
          </>
        }>
        </Route>
        <Route path="/aboutus" element={
          <>
            <Banner />
            <Nav2 login="" signup="Sign Up" />
            <Company />
            <Testimonials />
            <Blog />
            <Team />
            <Footer />
          </>
        }></Route>
        <Route exact path="/:id"
          element={
            <>
              <ProtectedRouteSTU>
                <Banner />
                <Nav2 login="Login" signup="Sign Up" />
                <CoursePreview courses={courses} learner={learner} />
                <Footer />
              </ProtectedRouteSTU>
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
        <Route path='/instructordashboard/dashboard' element={<>
          <ProtectedRouteINS>
            <InstructorDashboard dashboard="true" />
            <DashboardContent />
          </ProtectedRouteINS></>} />
        <Route path='/instructordashboard/courses' element={<>
          <ProtectedRouteINS>
            <InstructorDashboard course="true" />
            <CoursesContent courses = {courses}/>
            <CreateCourse />
          </ProtectedRouteINS></>} />
        <Route path='/instructordashboard/student' element={<>
          <ProtectedRouteINS>
            <InstructorDashboard student="true" />
            <StudentContent />
          </ProtectedRouteINS></>} />
        <Route path='/instructordashboard/reports' element={<>
          <ProtectedRouteINS>
            <InstructorDashboard report="true" />
            <ReportsContent />
          </ProtectedRouteINS></>} />
        <Route path='/instructordashboard/performance' element={<>
          <ProtectedRouteINS>
            <InstructorDashboard perform="true" />
            <PerformanceContent />
          </ProtectedRouteINS></>} />
        {/* <Route path='/instructordashboard/courses/createcourse' element={<>
          <ProtectedRouteINS>
            <InstructorDashboard course="true" />
            <CoursesContent courses = {courses}/>
            <CreateCourse />
          </ProtectedRouteINS></>} /> */}
        <Route path='/instructordashboard/account'
          element={<>
            <ProtectedRouteINS>
              <InstructorDashboard account="true" />
              <AccountSetting />
            </ProtectedRouteINS>
          </>}
        />
        <Route path='/instructordashboard/preview/:id' element={<>
          <ProtectedRouteINS>
            <InstructorDashboard course="true" />
            <PreviewCourse courses={courses}/>
            <Footer />
          </ProtectedRouteINS></>} />
        <Route path='/account' element={<><ProtectedStudentInfo><Account /></ProtectedStudentInfo></>} />
        <Route path='/account/setting' element={<> <ProtectedRouteSTU><ProtectedStudentInfo><Account setting="true" /><AccountSetting /></ProtectedStudentInfo> </ProtectedRouteSTU></>} />
        <Route path='/account/learning' element={<> <ProtectedRouteSTU><ProtectedStudentInfo><Account learning="true" /><AccountLearning learner={learner} courses={courses} /></ProtectedStudentInfo> </ProtectedRouteSTU></>} />
        <Route path='/account/notification' element={<> <ProtectedRouteSTU><ProtectedStudentInfo><Account noti="true" /><AccountNotification /> </ProtectedStudentInfo></ProtectedRouteSTU></>} />
        <Route path='/account/purchase' element={<> <ProtectedRouteSTU><ProtectedStudentInfo><Account history="true" /><AccountPurchase /> </ProtectedStudentInfo></ProtectedRouteSTU></>} />
        <Route path='/account/assignment' element={<> <ProtectedRouteSTU><ProtectedStudentInfo><Account assignment="true" /><AccountAssignment /></ProtectedStudentInfo> </ProtectedRouteSTU></>} />

        <Route path='/learning/:id' element={<>
          <ProtectedCourseData>
            <Nav2 login="Login" signup="Sign Up" />
            <Gallery learner={learner} courses={courses} />
            <CourseDetails courses={courses} />
            <Footer />
          </ProtectedCourseData>
        </>} />

        {/* admin dashboard */}
        <Route path='/admindashboard' element={<>
          <ProtectedAdmin>
            <AdminDashboard dashboard="true" />
          </ProtectedAdmin></>} />
        <Route path='/admindashboard/courses' element={<>
          <ProtectedAdmin>
            <AdminDashboard course="true" />
            <ManageCourse courses={courses} />
          </ProtectedAdmin></>} />
          <Route path='/pendingcourse/:id' element={<>
            <ProtectedAdmin>
            <AdminDashboard course="true" />
            <PreviewPendingCourse courses={courses}/>
            <Footer />
            </ProtectedAdmin></>} />
        <Route path='/admindashboard/account' element={<>
          <ProtectedAdmin>
            <AdminDashboard account="true" />
            <ManageAccount users={users} />
          </ProtectedAdmin>
        </>} />
        <Route path='/admindashboard/reports' element={<>
          <ProtectedAdmin>
            <AdminDashboard report="true" />
            <ManageNotify />
          </ProtectedAdmin>
        </>} />
        <Route path='/admindashboard/performance' element={<>
          <ProtectedAdmin>
            <AdminDashboard perform="true" />
            <ArthubPerformance />
          </ProtectedAdmin>
        </>} />
        <Route path='/admindashboard/setting' element={<>
          <ProtectedAdmin>
            <AdminDashboard setting="true" />
            <AccountSetting />
          </ProtectedAdmin>
        </>} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
