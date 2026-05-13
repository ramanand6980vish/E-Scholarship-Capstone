import './App.css';
import Navbar from './Components/Navbar';
import Carousel from './Components/Carousel';
import Footer from './Components/Footer';
import HomePage from './Components/HomePage';
import OTR from './Components/OTR';
import Login from './Components/Login';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrackApplication from './Components/TrackApplication';
import HelpDesk from './Components/HelpDesk';
import StudentDashboard from './Components/StudentDashboard';
import ScholarshipApply from './Components/ScholarshipApply';
// import ScholarshipForm from './Components/ScholarshipForm';
import FaceKYC from './Components/FaceKYC';
import Officer from './Components/OfficerDashboard';
import ScrollToTop from './Components/ScrollToTop';
import ProtectedRoute from './Components/ProtectedRoute';
import ProfileMenu from './Components/ProfileMenu';
import Profile from './Components/StudentProfile';
import Settings from './Components/Settings';
import LoggedInHomePage from './Components/LoggedInHomepage';
import OfficerLogin from './Components/OfficerLogin';
import OfficerDashboard from './Components/OfficerDashboard';
import StudentProfile from './Components/StudentProfile';
import StudentNotification from './Components/StudentNotification';
import AppliedStudentsDashboard from './Components/AppliedStudentDashboard';
import StudentView4Officer from './Components/StudentView4Officer';
import SchemeCards from './Components/SchemesCards';
import ReuploadNotifications from './Components/ReuploadNotifications';
import DummyAdhar from './Components/DummyAdhar';
   
function App() {

    return (

        <Router>

            <Navbar />
            <ScrollToTop />


            {/* <div className="auth-bg">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/otr" element={<OTR />} />

                    <Route path="/officer-login" element={<OfficerLogin />} />


                    <Route path='/faceKYC' element={<FaceKYC />} />

                    <Route path="/track" element={<TrackApplication />} />
                <Route path="/help" element={<HelpDesk />} />
                </Routes>
            </div> */}



            <Routes>

        
                {/* AUTH PAGES */}
                <Route
                    path="/login"
                    element={
                        <div className="auth-bg">
                            <Login />
                        </div>
                    }
                />

                <Route
                    path="/officer_login"
                    element={
                        <div className="auth-bg">
                            <OfficerLogin />
                        </div>
                    }
                />

                <Route
                    path="/otr"
                    element={
                        <div className="auth-bg">
                            <OTR />
                        </div>
                    }
                />

                 <Route
                    path="/help"
                    element={
                        <div className="auth-bg">
                            <HelpDesk />
                        </div>
                    }
                />

                 <Route
                    path="/track"
                    element={
                        <div className="auth-bg">
                            <TrackApplication />
                        </div>
                    }
                />

            </Routes>



            <Routes>

                <Route path="/" element={
                    <>
                        <Carousel />
                        <HomePage />
                    </>
                } />




                <Route path="/studentDashboard" element={
                    <ProtectedRoute>
                        <StudentDashboard />
                    </ProtectedRoute>
                } />

                <Route path="/logged-in-homepage" element={
                    <LoggedInHomePage />
                } />

                <Route path="/schemes" element={
                    <SchemeCards />
                } />

                {/* <Route path="/studentDashboard" element={
                         <StudentDashboard />
                 } /> */}

                <Route path="/profileMenu" element={<ProfileMenu />} />

                <Route path="/loggedInHomepage" element={
                    <ProtectedRoute>
                        <LoggedInHomePage />
                    </ProtectedRoute>
                }
                />

                {/* <Route path='/loginDropdown' element={
                    <LoginDropdown />
                }
                /> */}

                { <Route path="/studentNotification" element={
                    // <ProtectedRoute>
                        <StudentNotification />
                    // </ProtectedRoute>       
                }

                /> }

            

                <Route path="/studentProfile" element={
                    <ProtectedRoute>
                        <StudentProfile />
                    </ProtectedRoute>
                } />

                <Route path="/scholarshipApply" element={
                    <ProtectedRoute>
                        <ScholarshipApply />
                    </ProtectedRoute>
                } />

                <Route path='/settings' element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>}
                />

                <Route path="/appliedStudentDashboard" element={
                    <>
                        <h3>Applied Students Dashboard</h3>
                        <AppliedStudentsDashboard />

                    </>
                }
                />

                <Route path="/dummyAdhar" element={
                    <DummyAdhar />
                }
                />


                {/* <Route path="/officer" element={<Officer />} /> */}

                <Route path='/officer-dashboard' element={
                    // <ProtectedRoute>
                    <OfficerDashboard />
                    // </ProtectedRoute>
                }
                />

                <Route path='/studentView4Officer' element={
                    <StudentView4Officer />
                }
                />

                {/* <Route path='/faceKYC' element={<FaceKYC />} /> */}



            </Routes>
            

            <Footer />

        </Router>

    );

}

export default App;