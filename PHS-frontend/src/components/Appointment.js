import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Payment from './payment/Payment';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for user details

const Appointment = () => {
    const [reason, setReason] = useState(''); // State for appointment reason
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name,setName]=useState('');
  const [patientId,setPatientId]= useState('');
  const [patientEmail,setPatientEmail]=useState('');


  const navigate = useNavigate();

  const user = useSelector(state => state.user.loggedInUser); // Assuming user details are stored in Redux

  const timeSlots = [
    { label: "Morning 10AM-11AM", value: "morning_10_11" },
    { label: "Afternoon 2PM-3PM", value: "afternoon_2_3" },
    { label: "Evening 6PM-7PM", value: "evening_6_7" },
  ];

  const handleBookAppointment = () => {
    setIsPaymentModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsPaymentModalOpen(false);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:9003/ibm-doctor/doctors');
        const data = await response.json();
        setDoctors(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleAppointmentSubmit = async () => {
    const selectedDoctorObject = doctors.find(doctor => doctor.doctorId === selectedDoctor);
    const appointmentData = {
      doctorId: selectedDoctor,
      doctorName: selectedDoctorObject.name,
      patientId: patientId,
      patientName: name,
      patientEmail: patientEmail,
      date: selectedDate,
      slot: selectedSlot,
      reason: reason
    };

    try {
      console.log('appointment ', appointmentData);
      const response = await fetch('http://localhost:9002/ibm-appointment/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
      alert('booked');
      const data = await response.json();

      setMessage('Successfully booked!');
      setReason('');
      setSelectedDoctor('');
      setSelectedDate('');
      setSelectedSlot('');
      setPatientEmail('');
      setPatientId('');
      setName('');

      setTimeout(() => {
        alert('Appointment successful');
        setMessage('');
      }, 1000);

    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  const handlePaymentSuccess = () => {
    handleCloseModal();
    handleAppointmentSubmit();
  };

  return (
    <div className="container">
      <h2 className="my-4">Book Appointment</h2>
      <form className="form form-group mx-2 py-2 my-2 py-2" onSubmit={(e) => { e.preventDefault(); handleBookAppointment(); }}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Appointment Reason in detail"
          />
        </div>

        <div className="form-group">
          <select
            className="form-control"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="" disabled>Select Doctor</option>
            {isLoading ? (
              <option disabled>Loading...</option>
            ) : (
              doctors.map(doctor => (
                <option key={doctor.doctorId} value={doctor.doctorId}>
                  {doctor.name} - Appointment fee: {doctor.doctorFee}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="form-group">
          <input className="form-control" type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} placeholder="Date" />
        </div>

        <div className="form-group">
          <select 
            className="form-control"
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
          >
            <option value="" disabled>Select a time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
        </div>


        <div className="form-group">
          <input className="form-control" type="text" value={name} placeholder='Name' onChange={(e) => setName(e.target.value)}/>
        </div>

        <div className="form-group">
          <input className="form-control" type="email" value={patientEmail} placeholder='Patient Email' onChange={(e) => setPatientEmail(e.target.value)} />
        </div>

        <div className="w-100vh h-100vh d-flex justify-content-center align-items-center">
          <button className="btn btn-primary" type="submit">
            Book Appointment
          </button>
        </div>
      </form>

      {message && <p className="message">{message}</p>}
      <Payment 
        isOpen={isPaymentModalOpen} 
        onClose={handleCloseModal} 
        onPaymentSuccess={handlePaymentSuccess} 
      />
    </div>
  );
};

export default Appointment;

























// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from "react-router-dom";
// import Payment from './payment/Payment';
// //import UserService from '../services/UserService';
// import { useSelector } from 'react-redux'; // Assuming you're using Redux for user details

// const Appointment = () => {
//   const [reason, setReason] = useState(''); // State for appointment reason
//   const [selectedDoctor, setSelectedDoctor] = useState('');
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedSlot, setSelectedSlot] = useState('');
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
//   const [message, setMessage] = useState('');
//   const [doctors, setDoctors] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   //const [appointmentId, setAppointmentId] = useState('');

//   const navigate = useNavigate();

//  const user = useSelector(state => state.user); // Assuming user details are stored in Redux

//   const timeSlots = [
//     { label: "Morning 10AM-11AM", value: "morning_10_11" },
//     { label: "Afternoon 2PM-3PM", value: "afternoon_2_3" },
//     { label: "Evening 6PM-7PM", value: "evening_6_7" },
//   ];

//   const handleBookAppointment = () => {
//     setIsPaymentModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsPaymentModalOpen(false);
//   };

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await fetch('http://localhost:9003/ibm-doctor/doctors');
//         const data = await response.json();
//         setDoctors(data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching doctors:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   const handleAppointmentSubmit = async () => {
//     const selectedDoctorObject = doctors.find(doctor => doctor.doctorId === selectedDoctor);
//     const appointmentData = {
//       doctorId: selectedDoctor,
//       doctorName: selectedDoctorObject.name,
//       patientId: user.id,
//       patientName: user.name,
//       patientEmail: user.email,
//       date: selectedDate,
//       slot: selectedSlot,
//       reason: reason
//     };

//     try {
//         console.log('appointment ')
//       const response = await fetch('http://localhost:9002/ibm-appointment/appointments', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(appointmentData),
//       });
//       alert('made appointment');

//       const data = await response.json();

//       setMessage('Successfully booked!');
//       //setAppointmentId(data.appointmentId);
//       setReason('');
//       setSelectedDoctor('');
//       setSelectedDate('');
//       setSelectedSlot('');

//       setTimeout(() => {
//         alert('appointment successful');
//         setMessage('');
//       }, 1000);

//     //   await fetch('http://localhost:9002/ibm-appointment/email', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ email: user.email }),
// //       });

//     } catch (error) {
//       console.error('Error booking appointment:', error);
//     }
//   };

//   const handlePaymentSuccess = () => {
//     handleCloseModal();
//     handleAppointmentSubmit();
//   };

//   return (
//     <div className="container">
//       <h2 className="my-4">Book Appointment</h2>
//       <form className="form form-group mx-2 py-2 my-2 py-2" onSubmit={(e) => { e.preventDefault(); handleBookAppointment(); }}>
//         <div className="form-group">
//           <input
//             type="text"
//             className="form-control"
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             placeholder="Appointment Reason in detail"
//           />
//         </div>

//         <div className="form-group">
//           <select
//             className="form-control"
//             value={selectedDoctor}
//             onChange={(e) => setSelectedDoctor(e.target.value)}
//           >
//             <option value="" disabled>Select Doctor</option>
//             {isLoading ? (
//               <option disabled>Loading...</option>
//             ) : (
//               doctors.map(doctor => (
//                 <option key={doctor.doctorId} value={doctor.doctorId}>
//                   {doctor.name} - Appointment fee: {doctor.doctorFee}
//                 </option>
//               ))
//             )}
//           </select>
//         </div>

//         <div className="form-group">
//           <input className="form-control" type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} placeholder="Date" />
//         </div>

//         <div className="form-group">
//           <select 
//             className="form-control"
//             value={selectedSlot}
//             onChange={(e) => setSelectedSlot(e.target.value)}
//           >
//             <option value="" disabled>Select a time slot</option>
//             {timeSlots.map((slot) => (
//               <option key={slot.value} value={slot.value}>
//                 {slot.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group">
//           <input className="form-control" type="text" value={user.name} placeholder='patient Name' />
//         </div>

//         <div className="form-group">
//           <input className="form-control" type="email" value={user.email} placeholder='patient email'  />
//         </div>

//         <div className="w-100vh h-100vh d-flex justify-content-center align-items-center">
//           <button className="btn btn-primary" type="submit">
//             Book Appointment
//           </button>
//         </div>
//       </form>

//       {message && <p className="message">{message}</p>}
//       <Payment 
//         isOpen={isPaymentModalOpen} 
//         onClose={handleCloseModal} 
//         onPaymentSuccess={handlePaymentSuccess} 
//       />
//     </div>
//   );
// };

// export default Appointment;
































// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import Notification from './notifications/Notifications';
// import { useNavigate } from "react-router-dom";
// import Payment from './payment/Payment';

// const Appointment = () => {
//   // State variables
//   const [appointmentId, setAppointmentId] = useState('');
//   const [selectedDoctor, setSelectedDoctor] = useState('');
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedSlot, setSelectedSlot] = useState('');

//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);


//   const [message, setMessage] = useState('');

//   const [patientId, setPatientId] = useState('');
//   const [doctors, setDoctors] = useState([]);
//   const [patientEmail, setPatientEmail] = useState('');

//   const [isLoading, setIsLoading] = useState(true); // State for loading indicator
//   const [doctorName, setDoctorName] = useState('');
//   const [doctorfee, setDoctorFee] = useState('');
  
//   const navigate = useNavigate();


//   const timeSlots = [
//     { label: "Morning 10AM-11AM", value: "morning_10_11" },
//     { label: "Afternoon 2PM-3PM", value: "afternoon_2_3" },
//     { label: "Evening 6PM-7PM", value: "evening_6_7" },
//   ];

  

//   const handleBookAppointment = () => {
    
//     setIsPaymentModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsPaymentModalOpen(false);
//   };
//   // Fetch doctors list when the component mounts
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await fetch('http://localhost:9003/ibm-doctor/doctors');
//         const data = await response.json();
//         console.log(data);
//         setDoctors(data); // Update state with fetched doctors list
//         setDoctorName(data[0].name)

//         data.forEach(doctor => {
//             console.log(doctor)
//           setDoctorFee(doctor.doctorFee);
//         });


//         setIsLoading(false); // Update loading state
//       } catch (error) {
//         console.error('Error fetching doctors:', error);
//         setIsLoading(false); // Update loading state
//       }
//     };

//     fetchDoctors();
//   }, []); // Empty dependency array ensures this effect runs only once when the component mounts

//   const handleAppointmentSubmit = async (e) => {
//     e.preventDefault();



//     // Find the selected doctor object from the doctors array
//     const selectedDoctorObject = doctors.find(doctor => doctor.doctorId === selectedDoctor);
//     const appointmentData = {
//       appointmentId: appointmentId,
//       doctorId: selectedDoctor,
//       doctorName: selectedDoctorObject.name,
//       patientId: patientId,
//       date: selectedDate,
//       slot: selectedSlot,
//       patientEmail: patientEmail

//     };

//     const response = await fetch('http://localhost:9002/ibm-appointment/appointments', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(appointmentData), // Convert data to JSON
//     });

//     const data = await response.json();


//     setMessage('sucessfully booked!');
//     setAppointmentId(data.appointmentId);
//     setDoctorName(selectedDoctorObject.name);
//     setSelectedDoctor('');
//     setSelectedDate('');
//     setSelectedSlot('');
//     setPatientId('');
//     setPatientEmail('');
//     // Clear form fields after successful submission
//     setAppointmentId('');
//     setPatientId('');
//     setPatientEmail('');
//     try {
//       const response = await fetch('http://localhost:9002/ibm-appointment/email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(), // Send patient email for notification
//       });

//       if (!response.ok) {
//         console.error('Failed to send email notification.');
//       }
//     } catch (error) {
//       console.error('Error sending email notification:', error);
//     }

//   };


//   // Function to handle navigation to payment page
//   const handlePaymentClick = () => {
//     navigate('/payment'); // Navigate to the payment page
//   };


//   return (
//     <div className="container">
//       <h2 className="my-4">Book Appointment</h2>
//       <form className="form form-group mx-2 py-2 my-2 py-2" onSubmit={handleAppointmentSubmit}>
//         <div className="form-group">
//           <input
//             type="text"
//             className="form-control"
//             value={appointmentId}
//             onChange={(e) => setAppointmentId(e.target.value)}
//             placeholder="Appointment Reason in detail"
//           />
//         </div>

//         <div className="form-group">
//           <select
//             className="form-control"
//             value={selectedDoctor}
//             onChange={(e) => setSelectedDoctor(e.target.value)}
//           >
//             <option value="" disabled>Select Doctor</option>
//             {isLoading ? (
//               <option disabled>Loading...</option>
//             ) : (
//               doctors.map(doctor => (
//                 <option key={doctor.doctorId} value={doctor.doctorId}>
//                   {doctor.name} - Appointment fee: {doctor.doctorFee}
//                 </option>
//               ))
//             )}
//           </select>
//         </div>

//         <div className="form-group">
//           <input className="form-control" type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} placeholder="Date" />
//         </div>

//         <div className="form-group">
//             <select 
//                 className="form-control"
//                 value={selectedSlot}
//                 onChange={(e) => setSelectedSlot(e.target.value)}
//             >
//                 <option value="" disabled>Select a time slot</option>
//                 {timeSlots.map((slot) => (
//                 <option key={slot.value} value={slot.value}>
//                     {slot.label}
//                 </option>
//                 ))}
//             </select>
//         </div>


//         <div className="form-group">
//           <input className="form-control" type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)} placeholder="Patient Name" />
//         </div>

//         <div className="form-group">
//           <input className="form-control" type="text" value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)} placeholder="email id" />
//         </div>

//         <div className='w-100vh h-100vh d-flex justify-content-center align-items-enter'>
//             <button className="btn btn-primary" onClick={handleBookAppointment}>
//                 Book Appointment
//             </button>
//             <Payment isOpen={isPaymentModalOpen} onClose={handleCloseModal}  />
//         </div>

//       </form>

//       {message && <p className="message">{message}</p>}
//       {<Notification id={appointmentId} />} {/* Render Notification component only when appointmentId is available */}


//     </div>
//   );
// };

// export default Appointment;


