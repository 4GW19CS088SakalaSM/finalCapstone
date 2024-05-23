import React, { useState, useEffect } from 'react';

const Notification = ({ id }) => {
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await fetch(`http://localhost:9002/ibm-appointment/appointments/${id}`);
        const data = await response.json();
        setAppointmentDetails(data); // Update appointment details state with fetched data
      } catch (error) {
        console.error('Error fetching appointment details:', error);
      }
    };

    if (id) {
      fetchAppointmentDetails();
    }
  }, [id]); // Adding id as a dependency

  return (
    <div className="notification">
      <h3>Appointment Details</h3>
      {appointmentDetails ? (
        <div>
          <p><strong>Date:</strong> {appointmentDetails.date}</p>
          <p><strong>Doctor:</strong> {appointmentDetails.doctorName}</p>
          <p><strong>Slot:</strong> {appointmentDetails.slot}</p>
          <p><strong>Patient:</strong> {appointmentDetails.patientId}</p>
        </div>
      ) : (
        <p>Loading appointment details...</p>
      )}
    </div>
  );
};

export default Notification;


// import React, { useState, useEffect } from 'react';
// import { useRef } from 'react';

// const Notification = ({id}) => {
//   const [appointmentDetails, setAppointmentDetails] = useState(null);
  


//   useEffect(() => {
//     const fetchAppointmentDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:9002/ibm-appointment/appointments/${id}`);
//         const data = await response.json();
//         setAppointmentDetails(data); // Update appointment details state with fetched data
//       } catch (error) {
//         console.error('Error fetching appointment details:', error);
//       }
//     };

//     if (id) {
//       fetchAppointmentDetails();
//     }

  
//   }, []);
  
//   return (
//     <div className="notification">
//       <h3>Appointment Details</h3>
//       {appointmentDetails ? (
//         <div>
//           <p><strong>Date:</strong> {appointmentDetails.date}</p>
//           <p><strong>Doctor:</strong> {appointmentDetails.doctorName}</p>
//           <p><strong>Slot:</strong> {appointmentDetails.slot}</p>
//           <p><strong>Patient:</strong> {appointmentDetails.patientId}</p>
//         </div>
//       ) : (
//         <p>Loading appointment details...</p>
//       )}
//     </div>
//   );
  
// };

// export default Notification;
