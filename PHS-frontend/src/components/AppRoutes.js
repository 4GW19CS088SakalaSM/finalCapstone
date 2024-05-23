import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./user/Login";
import Home from "./Home";
import Menubar from "./Menubar";
import Register from './user/Register';
import Profile from "./user/Profile";
import Logout from './user/Logout';
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import DoctorList from "./DoctorList";
import Appointment from "./Appointment";
import MedicalRecords from "./MedicalRecords";
import AdminDashboard from "./admin/AdminDashboard";
import DoctorDashboard from "./doctor/DoctorDashboard";

const AppRoutes = () => {
    const loginStatus = useSelector(store => store.user.loginStatus);

    return (
        <BrowserRouter>
            <Menubar />
            <Routes>
                {/* Public Routes */}
                <Route path="home" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="/" element={<Home />} />

                {/* Protected Routes */}
                {loginStatus ? (
                    <>
                        <Route path="logout" element={<Logout />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="doctors" element={<DoctorList />} />
                        <Route path="appointment" element={<Appointment />} />
                        <Route path="med-records" element={<MedicalRecords />} />
                        <Route path="adminDashboard" element={<AdminDashboard />} />
                        <Route path="doctorDashboard" element={<DoctorDashboard />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;






// import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
// import Login from "./user/Login";
// import Home from "./Home";
// import Menubar from "./Menubar";
// import Register from './user/Register';
// import Profile from "./user/Profile";
// import Logout from './user/Logout';
// import { useSelector } from "react-redux";
// import Dashboard from "./Dashboard";
// import DoctorList from "./DoctorList";
// import Appointment from "./Appointment";
// import MedicalRecords from "./MedicalRecords";
// import AdminDashboard from "./admin/AdminDashboard";
// import DoctorDashboard from "./doctor/DoctorDashboard";

// const AppRoutes = () => {

//     const loginStatus = useSelector(store => store.user.loginStatus);

//     if (loginStatus) {
//         return (
//             <>
//                 <BrowserRouter>
//                     <Menubar />
//                     <Routes>
//                         <Route path="home" element={<Home />} />
//                         <Route path="logout" element={<Logout />} />
//                         <Route path="profile" element={<Profile />} />
//                         <Route path="dashboard" element={<Dashboard />} />
//                         <Route path="doctors" element={<DoctorList />} />
//                         <Route path="appointment" element={<Appointment />} />
//                         <Route path="med-records" element={<MedicalRecords />} />
//                         <Route path="adminDashboard" element={<AdminDashboard/>}/>
//                         <Route path="doctorDashboard" element={<DoctorDashboard/>}/>
                        
//                         <Route exact path="/" element={<Home />} />
//                     </Routes>
//                 </BrowserRouter>
//             </>
//         );
//     }
//     else {
//         return (
//             <>
//                 <BrowserRouter>
//                     <Menubar />
//                     <Routes>
//                         <Route path="home" element={<Home />} />
//                         <Route path="login" element={<Login />} />
//                         <Route path="register" element={<Register />} />
//                         <Route exact path="/" element={<Home />} />
//                     </Routes>
//                 </BrowserRouter>
//             </>
//         );
//     }
// };

// export default AppRoutes;


