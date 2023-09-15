
import './App.css';
import Nav from './components/Nav.js'
import Nav2 from './components/Nav2.js'
import Banner from './components/Banner.js'
import Cover from './components/Cover.js'
import Course from './components/Course.js'
import Footer from './components/Footer.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'
import Feature from './components/Feature.js'
import Search from './components/Search.js'
import InstructorDashboard from './components/InstructorDashboard.js';
import CoursesContent from './components/CoursesContent.js';
import DashboardContent from './components/DashboardContent.js';
import StudentContent from './components/StudentContent.js';
import ReportsContent from './components/ReportsContent.js';
import PerformanceContent from './components/PerformanceContent.js';
import { BrowerRoute as Router, Routes, Route, Link } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>

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
            <Nav2 login="Login" signup="Sign Up" />
            <Login />
            <Footer />
          </>
        }>
        </Route>
        <Route path="/signup" element={
          <>
            <Banner />
            <Nav2 login="Login" signup="Sign Up" />
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
    </BrowserRouter>

  );
}

export default App;
