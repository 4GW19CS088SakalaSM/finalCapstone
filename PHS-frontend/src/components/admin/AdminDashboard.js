import React, { useState } from 'react';
import AdminService from '../../services/AdminService';
import { Button, Col, Container, Row } from 'react-bootstrap';

const AdminDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [token, setToken] = useState(''); // You should get this token after admin login
    const [activeSection, setActiveSection] = useState(null);

    // Function to handle click and fetch data
    const handleClick = async (type) => {
        setActiveSection(type);
        switch (type) {
            case 'doctors':
                await fetchDoctors();
                break;
            case 'patients':
                await fetchPatients();
                break;
            case 'appointments':
                await fetchAppointments();
                break;
            default:
                break;
        }
    };

    // Function to fetch doctors
    const fetchDoctors = async () => {
        try {
            const doctorList = await AdminService.getDoctors(token);
            setDoctors(doctorList);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    // Function to fetch patients
    const fetchPatients = async () => {
        try {
            const patientList = await AdminService.getPatients(token);
            setPatients(patientList);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    // Function to fetch appointments
    const fetchAppointments = async () => {
        try {
            const appointmentList = await AdminService.getAppointments(token);
            setAppointments(appointmentList);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    return (
        <Container>
            <h1 className="mt-4">Admin Dashboard</h1>
            <Row className="mt-4">
                <Col>
                    <Button variant="primary" onClick={() => handleClick('doctors')}>Load Doctors</Button>
                    <h2 className="mt-4">Doctors</h2>
                    {activeSection === 'doctors' && (
                        <ul>
                            {doctors.map(doctor => (
                                <li key={doctor._id}>{doctor.name}</li>
                            ))}
                        </ul>
                    )}
                </Col>
                <Col>
                    <Button variant="success" onClick={() => handleClick('patients')}>Load Patients</Button>
                    <h2 className="mt-4">Patients</h2>
                    {activeSection === 'patients' && (
                        <ul>
                            {patients.map(patient => (
                                <li key={patient._id}>{patient.name}</li>
                            ))}
                        </ul>
                    )}
                </Col>
                <Col>
                    <Button variant="info" onClick={() => handleClick('appointments')}>Load Appointments</Button>
                    <h2 className="mt-4">Appointments</h2>
                    {activeSection === 'appointments' && (
                        <ul>
                            {appointments.map(appointment => (
                                <li key={appointment._id}>
                                    {appointment.date} - {appointment.doctorName} with {appointment.patientId}
                                </li>
                            ))}
                        </ul>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;





// import React, { useEffect, useState } from 'react';
// import AdminService from '../../services/AdminService';

// const AdminDashboard = () => {
//     const [doctors, setDoctors] = useState([]);
//     const [patients, setPatients] = useState([]);
//     const [appointments, setAppointments] = useState([]);
//     const [token, setToken] = useState(''); // You should get this token after admin login

//     // Function to handle click and fetch data
//     const handleClick = async (type) => {
//         switch (type) {
//             case 'doctors':
//                 await fetchDoctors();
//                 break;
//             case 'patients':
//                 await fetchPatients();
//                 break;
//             case 'appointments':
//                 await fetchAppointments();
//                 break;
//             default:
//                 break;
//         }
//     };

//     // Function to fetch doctors
//     const fetchDoctors = async () => {
//         try {
//             const doctorList = await AdminService.getDoctors(token);
//             setDoctors(doctorList);
//         } catch (error) {
//             console.error('Error fetching doctors:', error);
//         }
//     };

//     // Function to fetch patients
//     const fetchPatients = async () => {
//         try {
//             const patientList = await AdminService.getPatients(token);
//             setPatients(patientList);
//         } catch (error) {
//             console.error('Error fetching patients:', error);
//         }
//     };

//     // Function to fetch appointments
//     const fetchAppointments = async () => {
//         try {
//             const appointmentList = await AdminService.getAppointments(token);
//             setAppointments(appointmentList);
//         } catch (error) {
//             console.error('Error fetching appointments:', error);
//         }
//     };

//     useEffect(() => {
//         // Initial fetch when component mounts
//         handleClick('doctors');
//     }, [token]); // useEffect dependencies

//     return (
//         <div>
//             <h1>Admin Dashboard</h1>
//             <div>
//                 <button onClick={() => handleClick('doctors')}>Load Doctors</button>
//                 <h2>Doctors</h2>
//                 <ul>
//                     {doctors.map(doctor => (
//                         <li key={doctor._id}>{doctor.name}</li>
//                     ))}
//                 </ul>
//             </div>
//             <div>
//                 <button onClick={() => handleClick('patients')}>Load Patients</button>
//                 <h2>Patients</h2>
//                 <ul>
//                     {patients.map(patient => (
//                         <li key={patient._id}>{patient.name}</li>
//                     ))}
//                 </ul>
//             </div>
//             <div>
//                 <button onClick={() => handleClick('appointments')}>Load Appointments</button>
//                 <h2>Appointments</h2>
//                 <ul>
//                     {appointments.map(appointment => (
//                         <li key={appointment._id}>
//                             {appointment.date} - {appointment.doctorName} with {appointment.patientId}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;