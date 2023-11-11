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
import CourseOverview from './components/learning/CourseOverview.js';
import { ShopContextProvider } from './components/coursepage/shop-context.js'
import { BrowerRoute as Router, Routes, Route, Link, Navigate, useNavigate, redirect } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Transactions from './components/admin/Transactions.js';
import ProtectedLearning from './components/protect/ProtectedLearning.js';
import Checkout from './components/payment/Checkout.js';
import ProtectedCheckout from './components/protect/ProtectedCheckout.js';
import Instructor from './components/userpage/Instructor.js';
import ErrorPage from './components/error/ErrorPage.js';
import { AuthContextProvider } from './components/authConfig/AuthContext.js';
import Student from './components/userpage/Student.js';
import PremiumInstructor from './components/dashboard/PremiumInstructor.js'; 
import { createContext } from 'react';
export const LearnerContext = createContext(null);
function App() {
  const [learner, setLearner] = useState()
  const getLearners = async () => {
    try {
      const response = await apiLearner.get("/getLearners");
      setLearner(response.data);
    } catch (err) {
      alert(err);
    }
  }
  useEffect(() => {
    getLearners();
  }, []
  )
  const contextValue = {
    getLearners
  };
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <ShopContextProvider>
          <ScrollToTop />

          <Routes>
            {/* <Route path="*" element={<PageNotFound />} /> */}
            <Route path="*" element={
              <>
                <Nav2 login="" signup="Sign Up" />
                <ErrorPage />
                <Footer />
              </>
            }>
            </Route>
            <Route path="/game" element={
              <>
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
            <Route path="/instructor/:id" element={
              <>
                <Nav2 login="" signup="Sign Up" />
                <Instructor />
                <Footer />
              </>
            }>
            </Route>
            <Route path="/student/:id" element={
              <>
                <Nav2 login="" signup="Sign Up" />
                <Student />
                <Footer />
              </>
            }>
            </Route>
            <Route path="/login" element={
              <>
                <Nav2 login="" signup="Sign Up" />
                <Login />
                <Footer />
              </>
            }>
            </Route>
            <Route path="/signup" element={
              <>
                <Nav2 login="Login" signup="" />
                <Signup />
                <Footer />
              </>
            }>
            </Route>

            <Route path="/" element={
              <>
                <ProtectedRouteSTU>
                  <Nav2 login="Login" signup="Sign Up" />
                  <Cover />
                  <Course />
                  <Feature />
                  <Footer />
                </ProtectedRouteSTU>
              </>}>
            </Route>
            <Route path="/search" element={
              <>
                <ProtectedRouteSTU>
                  <Nav2 login="Login" signup="Sign Up" />
                  <Search />
                  <Footer />
                </ProtectedRouteSTU>
              </>
            }>
            </Route>
            <Route path="/checkout" element={
              <>
                <ProtectedCheckout>
                  <Nav2 login="Login" signup="Sign Up" />
                  <Checkout />
                  <Footer />
                </ProtectedCheckout>
              </>
            }>
            </Route>
            <Route path="/aboutus" element={
              <>
                <Nav2 login="" signup="Sign Up" />
                <Company />
                <Testimonials />
                <Blog />
                <Team />
                <Footer />
              </>
            }></Route>
            <Route exact path="/course/:id"
              element={
                <>
                <LearnerContext.Provider value={contextValue}>
                  <ProtectedRouteSTU>
                    <Nav2 login="Login" signup="Sign Up" />
                    <CoursePreview />
                    <Footer />
                  </ProtectedRouteSTU>
                  </LearnerContext.Provider>
                </>
              }
            >
            </Route>

            <Route path='/instructordashboard'
              element={<>
                <ProtectedRouteINS>
                  <InstructorDashboard />
                  <Feature create="true" />
                  <Footer />
                </ProtectedRouteINS>
              </>}
            />
            <Route path='/instructordashboard/dashboard' element={<>
              <ProtectedRouteINS>
                <InstructorDashboard dashboard="true" />
                <DashboardContent />
                <Footer />
              </ProtectedRouteINS></>} />
            <Route path='/instructordashboard/courses' element={<>
              <ProtectedRouteINS>
                <InstructorDashboard course="true" />
                <CoursesContent />
                <CreateCourse />
                <Footer />
              </ProtectedRouteINS></>} />
            <Route path='/instructordashboard/student' element={<>
              <ProtectedRouteINS>
                <InstructorDashboard student="true" />
                <StudentContent />
                <Footer />
              </ProtectedRouteINS></>} />
            <Route path='/instructordashboard/reports' element={<>
              <ProtectedRouteINS>
                <InstructorDashboard report="true" />
                <ReportsContent />
                <Footer />
              </ProtectedRouteINS></>} />
            <Route path='/instructordashboard/performance' element={<>
              <ProtectedRouteINS>
                <InstructorDashboard perform="true" />
                <PerformanceContent />
                <Footer />
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
                  <Footer />
                </ProtectedRouteINS>
              </>}
            />
            <Route path='/instructordashboard/premium'
              element={<>
                <ProtectedRouteINS>
                  <InstructorDashboard premium="true" />
                  <PremiumInstructor />
                  <Footer />
                </ProtectedRouteINS>
              </>}
            />
            <Route path='/instructordashboard/preview/:id' element={<>
              <ProtectedRouteINS>
                <InstructorDashboard course="true" />
                <PreviewCourse />
                <Footer />
              </ProtectedRouteINS></>} />
            <Route path='/account' element={<><ProtectedStudentInfo><Account /><Footer /></ProtectedStudentInfo></>} />
            <Route path='/account/setting' element={<> <ProtectedRouteSTU><ProtectedStudentInfo><Account setting="true" /><AccountSetting /><Footer /></ProtectedStudentInfo> </ProtectedRouteSTU></>} />
            <Route path='/account/learning' element={<> <ProtectedRouteSTU><ProtectedStudentInfo><Account learning="true" /><AccountLearning /><Footer /></ProtectedStudentInfo> </ProtectedRouteSTU></>} />
            <Route path='/account/notification' element={<> <ProtectedRouteSTU><ProtectedStudentInfo><Account noti="true" /><AccountNotification /><Footer /> </ProtectedStudentInfo></ProtectedRouteSTU></>} />
            <Route path='/account/purchase' element={<> <ProtectedRouteSTU><ProtectedStudentInfo><Account history="true" /><AccountPurchase /><Footer /> </ProtectedStudentInfo></ProtectedRouteSTU></>} />
            <Route path='/account/assignment' element={<> <ProtectedRouteSTU><ProtectedStudentInfo><Account assignment="true" /><AccountAssignment /><Footer /></ProtectedStudentInfo> </ProtectedRouteSTU></>} />

            <Route path='/learning/:id' element={<>
              <ProtectedCourseData>
                {/* <ProtectedLearning> */}
                <Nav2 login="Login" signup="Sign Up" />
                <Gallery learner={learner} />
                <CourseOverview />
                <Footer />
                {/* </ProtectedLearning> */}
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
                <ManageCourse />
              </ProtectedAdmin></>} />
            <Route path='/pendingcourse/:id' element={<>
              <ProtectedAdmin>
                <AdminDashboard course="true" />
                <PreviewPendingCourse />
                <Footer />
              </ProtectedAdmin></>} />
            <Route path='/admindashboard/account' element={<>
              <ProtectedAdmin>
                <AdminDashboard account="true" />
                <ManageAccount />
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
        </ShopContextProvider>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
