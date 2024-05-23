import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import AdminService from "../../services/AdminService";
import DoctorService from "../../services/DoctorService";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/UserSlice";

// const roleServices = {
//     admin: AdminService.loginAdmin,
//     doctor: DoctorService.loginDoctor,
//     patient: UserService.loginUser
// };

const roleServices = [
    { role: 'admin', service: AdminService.loginAdmin },
    { role: 'doctor', service: DoctorService.loginDoctor },
    { role: 'patient', service: UserService.loginUser }
];


const roleDashboardRoutes = {
    admin: '/adminDashboard',
    doctor: '/doctorDashboard',
    patient: '/dashboard'
};

const Login = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [afterSubmit, setAfterSubmit] = useState('');
    const [selectedRole, setSelectedRole] = useState(null); // State to manage selected role
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (evt) => {
        setLoginData({
            ...loginData,
            [evt.target.name]: evt.target.value
        });
    };

    const handleLoginSubmit = async (evt) => {
        console.log('handleLoginSubmit');
        evt.preventDefault();
        if (!selectedRole) {
            setAfterSubmit('Please select a role');
            return;
        }
    
        try {
            const { service } = roleServices.find(({ role }) => role === selectedRole);
            const response = await service(loginData);
    
            setAfterSubmit(`Hi ${loginData.email}! You've logged in successfully!`);
            setTimeout(() => {
                setLoginData({ email: '', password: '' });
                dispatch(userLogin(response));
                const dashboardRoute = roleDashboardRoutes[selectedRole];
                navigate(dashboardRoute);
            }, 2000);
        } catch (error) {
            console.error(error);
            setAfterSubmit('Invalid credentials!');
        }
    };
    

    // const handleLoginSubmit = async (evt) => {
    //     console.log('handleLoginSubmit');
    //     evt.preventDefault();
    //     if (!selectedRole) {
    //         setAfterSubmit('Please select a role');
    //         return;
    //     }

    //     try {
    //         const loginService = roleServices[selectedRole]; // 0
    //         const response = await loginService(loginData);

    //         setAfterSubmit(`Hi ${loginData.email}! You've logged in successfully!`);
    //         setTimeout(() => {
    //             setLoginData({ email: '', password: '' });
    //             dispatch(userLogin(response));
    //             const dashboardRoute = roleDashboardRoutes[selectedRole];
    //             navigate(dashboardRoute);
    //         }, 2000);
    //     } catch (error) {
    //         console.error(error);
    //         setAfterSubmit('Invalid credentials!');
    //     }
    // };

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
    };

    const handleBackClick = () => {
        setSelectedRole(null);
    };

    const renderLoginForm = () => {
        return (
            <div className="border rounded-4 shadow m-4 p-4">
                <h2 className="text-center mb-4">{selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Login</h2>
                <form className="row g-3 px-4" onSubmit={handleLoginSubmit}>
                    <input
                        type="text"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        className="input-group-sm px-4 py-2 rounded"
                        placeholder="Enter email"
                        autoFocus
                        required
                    />
                    <br />
                    <input
                        type="password"
                        name="password"
                        value={loginData.password}
                        className="input-group-sm px-4 py-2 rounded"
                        placeholder="Enter Password"
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <input className="bg-btn p-2 rounded fw-bold" type="submit" value="Login" />
                </form>
                {afterSubmit && <p className="text-center text-success">{afterSubmit}</p>}
                {selectedRole === 'patient' && (
                    <p className="text-center">Not yet registered? <Link to={'/register'}>Register</Link></p>
                )}
                <button onClick={handleBackClick} className="btn btn-secondary mt-2 mx-2">Back</button>
            </div>
        );
    };

    return (
        <div className="m-4 p-4 d-flex flex-column justify-content-center align-items-center">
            {!selectedRole ? (
                <div className="d-flex flex-row justify-content-center align-items-center mt-4">
                    <div className="text-center m-4 px-4" onClick={() => handleRoleSelect('admin')}>
                        <img src="images/admin.png" width={160} className="rounded-circle mt-4" alt="Admin" />
                        <p className="fw-bold fs-4">Admin</p>
                    </div>
                    <div className="text-center m-4 px-4" onClick={() => handleRoleSelect('doctor')}>
                        <img src="images/doctor.png" width={160} className="rounded-circle mt-4" alt="Doctor" />
                        <p className="fw-bold fs-4">Doctor</p>
                    </div>
                    <div className="text-center m-4 px-4" onClick={() => handleRoleSelect('patient')}>
                        <img src="images/user.png" width={160} className="rounded-circle mt-4" alt="Patient" />
                        <p className="fw-bold fs-4">Patient</p>
                    </div>
                </div>
            ) : (
                renderLoginForm()
            )}
        </div>
    );
};

export default Login;



// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import UserService from "../../services/UserService";
// import { useDispatch } from "react-redux";
// import { userLogin } from "../../redux/UserSlice";

// const Login = () => {
//     const [loginData, setLoginData] = useState({ name:'',email: '', password: '' });
//     const [afterSubmit, setAfterSubmit] = useState('');
//     const [selectedRole, setSelectedRole] = useState(null); // State to manage selected role
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleChange = (evt) => {
//         setLoginData({
//             ...loginData,
//             [evt.target.name]: evt.target.value
//         });
//     };

//     const handleLoginSubmit = (evt) => {
//         evt.preventDefault();
//         UserService.loginUser(loginData)
//             .then((response) => {
//                 setAfterSubmit(`Hi ${loginData.name}! You've logged in successfully!`);
//                 setTimeout(() => {
//                     setLoginData({email: '', password: '' });
//                     dispatch(userLogin(response));
//                     navigate('/dashboard');
//                 }, 2000);
//             })
//             .catch((error) => {
//                 setLoginData({ email: '', password: '' });
//                 setAfterSubmit(`Invalid credentials!`);
//             });
//     };

    

//     const handleRoleSelect = (role) => {
//         setSelectedRole(role);
//     };

//     const handleBackClick = () => {
//         setSelectedRole(null);
//     };

//     const renderLoginForm = () => {
//         return (
//             <>
//             <div className="border rounded-4 shadow m-4 p-4">
//                 <h2 className="text-center mb-4">{selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Login</h2>
//                 <form className="row g-3 px-4" onSubmit={handleLoginSubmit}>
//                     <input
//                         type="text"
//                         name="email"
//                         value={loginData.email}
//                         onChange={handleChange}
//                         className="input-group-sm px-4 py-2 rounded"
//                         placeholder="Enter email"
//                         autoFocus
//                         required
//                     />
//                     <br />
//                     <input
//                         type="password"
//                         name="password"
//                         value={loginData.password}
//                         className="input-group-sm px-4 py-2 rounded"
//                         placeholder="Enter Password"
//                         onChange={handleChange}
//                         required
//                     />
//                     <br />
//                     <input className="bg-btn p-2 rounded fw-bold" type="submit" value="Login" />
//                 </form>
//                 <>
//                     <p>{afterSubmit && <p className="text-center text-success">{afterSubmit}</p>}</p>
//                 </>
//                 <p className="text-center">Not yet registered? <Link to={'/register'}>Register</Link> </p>
//                 {/* <button onClick={handleBackClick} className="btn btn-secondary mt-2 mx-2">Back</button> */}
//                 </div>
//             </>
//         );
//     };

//     return (
//         <>
//             <div className="m-4 p-4 d-flex flex-column justify-content-center align-items-center">
//                 {!selectedRole ? (
//                     <div className="d-flex flex-row justify-content-center align-items-center mt-4">
//                         <div className="text-center m-4 px-4" onClick={() => handleRoleSelect('admin')}>
//                             <img src="images/admin.png" width={160} className="rounded-circle mt-4" alt="Admin" />
//                             <p className="fw-bold fs-4">Admin</p>
//                         </div>
//                         <div className="text-center m-4 px-4" onClick={() => handleRoleSelect('doctor')}>
//                             <img src="images/doctor.png" width={160} className="rounded-circle mt-4" alt="Doctor" />
//                             <p className="fw-bold fs-4">Doctor</p>
//                         </div>
//                         <div className="text-center m-4 px-4" onClick={() => handleRoleSelect('patient')}>
//                             <img src="images/user.png" width={160} className="rounded-circle mt-4" alt="Patient" />
//                             <p className="fw-bold fs-4">Patient</p>
//                         </div>
//                     </div>
//                 ) : (
//                     renderLoginForm()
//                 )}
//             </div>
//         </>
//     );
// };

// export default Login;
