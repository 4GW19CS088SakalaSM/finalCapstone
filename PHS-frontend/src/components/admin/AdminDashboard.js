// import React, { useState } from "react";
// import AdminService from "../../services/AdminService";
// import { Button, Col, Container, Row } from "react-bootstrap";

// const AdminDashboard = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [token, setToken] = useState("");
//   const [activeSection, setActiveSection] = useState(null);

//   // Function to handle click and fetch data
//   const handleClick = async (type) => {
//     setActiveSection(type);
//     switch (type) {
//       case "doctors":
//         await fetchDoctors();
//         break;
//       case "patients":
//         await fetchPatients();
//         break;
//       case "appointments":
//         await fetchAppointments();
//         break;
//       default:
//         break;
//     }
//   };

//   // Function to fetch doctors
//   const fetchDoctors = async () => {
//     try {
//       const doctorList = await AdminService.getDoctors(token);
//       setDoctors(doctorList);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     }
//   };

//   // Function to fetch patients
//   const fetchPatients = async () => {
//     try {
//       const patientList = await AdminService.getPatients(token);
//       setPatients(patientList);
//     } catch (error) {
//       console.error("Error fetching patients:", error);
//     }
//   };

//   // Function to fetch appointments
//   const fetchAppointments = async () => {
//     try {
//       const appointmentList = await AdminService.getAppointments(token);
//       setAppointments(appointmentList);
//     } catch (error) {
//       console.error("Error fetching appointments:", error);
//     }
//   };

//   return (
//     <Container>
//       <h1 className="mt-4">Admin Dashboard</h1>
//       <Row className="mt-4">
//         <Col>
//           <Button variant="primary" onClick={() => handleClick("doctors")}>
//             Load Doctors
//           </Button>
//           <h2 className="mt-4">Doctors</h2>
//           {activeSection === "doctors" && (
//             <ul>
//               {doctors.map((doctor) => (
//                 <li key={doctor._id}>{doctor.name}</li>
//               ))}
//             </ul>
//           )}
//         </Col>
//         <Col>
//           <Button variant="success" onClick={() => handleClick("patients")}>
//             Load Patients
//           </Button>
//           <h2 className="mt-4">Patients</h2>
//           {activeSection === "patients" && (
//             <ul>
//               {console.log(patients)}
//               {patients.map((patient) => (
//                 <li key={patient._id}>
//                   {patient.name} : {patient.email}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </Col>
//         <Col>
//           <Button variant="info" onClick={() => handleClick("appointments")}>
//             Load Appointments
//           </Button>
//           <h2 className="mt-4">Appointments</h2>
//           {activeSection === "appointments" && (
//             <ul>
//               {appointments.map((appointment) => (
//                 <li key={appointment._id}>
//                   {appointment.date} - {appointment.doctorName} with{" "}
//                   {appointment.patientId}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default AdminDashboard;

// import React, { useState } from "react";
// import AdminService from "../../services/AdminService";
// import { Button, Card, Col, Container, Row } from "react-bootstrap";

// const AdminDashboard = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [token, setToken] = useState("");
//   const [activeSection, setActiveSection] = useState(null);

//   // Function to handle click and fetch data
//   const handleClick = async (type) => {
//     setActiveSection(type);
//     switch (type) {
//       case "doctors":
//         await fetchDoctors();
//         break;
//       case "patients":
//         await fetchPatients();
//         break;
//       case "appointments":
//         await fetchAppointments();
//         break;
//       default:
//         break;
//     }
//   };

//   // Function to fetch doctors
//   const fetchDoctors = async () => {
//     try {
//       const doctorList = await AdminService.getDoctors(token);
//       setDoctors(doctorList);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     }
//   };

//   // Function to fetch patients
//   const fetchPatients = async () => {
//     try {
//       const patientList = await AdminService.getPatients(token);
//       setPatients(patientList);
//     } catch (error) {
//       console.error("Error fetching patients:", error);
//     }
//   };

//   // Function to fetch appointments
//   const fetchAppointments = async () => {
//     try {
//       const appointmentList = await AdminService.getAppointments(token);
//       setAppointments(appointmentList);
//     } catch (error) {
//       console.error("Error fetching appointments:", error);
//     }
//   };

//   // Function to render doctors list
//   const renderDoctors = () => {
//     return (
//       <ul>
//         {doctors.map((doctor) => (
//           <li key={doctor._id}>{doctor.name}</li>
//         ))}
//       </ul>
//     );
//   };

//   // Function to render patients list
//   const renderPatients = () => {
//     return (
//       <ul>
//         {patients.map((patient) => (
//           <li key={patient._id}>
//             {patient.name} : {patient.email}
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   // Function to render appointments list
//   const renderAppointments = () => {
//     return (
//       <ul>
//         {appointments.map((appointment) => (
//           <li key={appointment._id}>
//             {appointment.date} - {appointment.doctorName} with{" "}
//             {appointment.patientId}
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   // Function to render total count card
//   const renderTotalCountCard = (type, count) => {
//     return (
//       <Card
//         className="mt-2"
//         style={{ cursor: "pointer" }}
//         onClick={() => handleClick(type)}
//       >
//         <Card.Body>
//           <Card.Title>
//             {type.charAt(0).toUpperCase() + type.slice(1)}
//           </Card.Title>
//           <Card.Text>Total: {count}</Card.Text>
//         </Card.Body>
//       </Card>
//     );
//   };

//   return (
//     <Container>
//       <h1 className="mt-4">Admin Dashboard</h1>
//       <Row className="mt-4">
//         <Col>
//           {renderTotalCountCard("doctors", doctors.length)}
//           {activeSection === "doctors" && renderDoctors()}
//         </Col>
//         <Col>
//           {renderTotalCountCard("patients", patients.length)}
//           {activeSection === "patients" && renderPatients()}
//         </Col>
//         <Col>
//           {renderTotalCountCard("appointments", appointments.length)}
//           {activeSection === "appointments" && renderAppointments()}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default AdminDashboard;
import React, { useState, useEffect } from "react";
import AdminService from "../../services/AdminService";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [token, setToken] = useState("");
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    // Fetch initial data on component mount
    try {
      const [doctorList, patientList, appointmentList] = await Promise.all([
        AdminService.getDoctors(token),
        AdminService.getPatients(token),
        AdminService.getAppointments(token),
      ]);
      setDoctors(doctorList);
      setPatients(patientList);
      setAppointments(appointmentList);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  const handleSectionClick = async (type) => {
    // Handle click on section
    setActiveSection(type);
    switch (type) {
      case "doctors":
        await fetchDoctors();
        break;
      case "patients":
        await fetchPatients();
        break;
      case "appointments":
        await fetchAppointments();
        break;
      default:
        break;
    }
  };

  const fetchDoctors = async () => {
    // Fetch doctors data
    try {
      const doctorList = await AdminService.getDoctors(token);
      setDoctors(doctorList);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchPatients = async () => {
    // Fetch patients data
    try {
      const patientList = await AdminService.getPatients(token);
      setPatients(patientList);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const fetchAppointments = async () => {
    // Fetch appointments data
    try {
      const appointmentList = await AdminService.getAppointments(token);
      setAppointments(appointmentList);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const renderSectionCard = (title, count, type) => {
    // Render section card
    return (
      <Card
        className={`mt-4 ${activeSection === type ? "bg-light" : ""}`}
        style={{ cursor: "pointer" }}
        onClick={() => handleSectionClick(type)}
      >
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>Total: {count}</Card.Text>
        </Card.Body>
      </Card>
    );
  };

  const renderDoctorsList = () => {
    return (
      <>
        {doctors.map((doctor) => (
          <div key={doctor._id}>
            <Card className="mt-2">
              <Card.Body>
                <Card.Title>{doctor.specialization}</Card.Title>
                <Card.Text>
                  Name : {doctor.name}
                  <br />
                  Email: {doctor.email}
                  <br />
                  Contact: {doctor.contact}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </>
    );
  };

  const renderPatientsList = () => {
    // Render patients list
    return (
      <>
        {patients.map((patient) => (
          <div key={patient._id}>
            <Card className="mt-2">
              <Card.Body>
                <Card.Title>{patient.name}</Card.Title>
                <Card.Text>
                  Email : {patient.email}
                  <br />
                  Contact: {patient.contact}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </>
    );
  };

  const renderAppointmentsList = () => {
    // Render appointments list
    return (
      <>
        {appointments.map((appointment) => (
          <div key={appointment._id}>
            <Card className="mt-2">
              <Card.Body>
                <Card.Title>{appointment.date}</Card.Title>
                <Card.Text>
                  Slot: {appointment.slot}
                  <br />
                  Doctor ID: {appointment.doctorId}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </>
    );
  };

  return (
    <Container>
      <h1 className="mt-4">Admin Dashboard</h1>
      <Row className="mt-4">
        <Col>
          {renderSectionCard("Doctors", doctors.length, "doctors")}
          {activeSection === "doctors" && renderDoctorsList()}
        </Col>
        <Col>
          {renderSectionCard("Patients", patients.length, "patients")}
          {activeSection === "patients" && renderPatientsList()}
        </Col>
        <Col>
          {renderSectionCard(
            "Appointments",
            appointments.length,
            "appointments"
          )}
          {activeSection === "appointments" && renderAppointmentsList()}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
