import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Payment from "./payment/Payment";
import { useSelector } from "react-redux"; // Assuming you're using Redux for user details
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Appointment = () => {
  const [reason, setReason] = useState(""); // State for appointment reason
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [minDate, setMinDate] = useState("");

  const navigate = useNavigate();

  const user = useSelector((state) => state.user.loggedInUser);

  const timeSlots = [
    { label: "Morning 10AM-11AM", value: "morning_10_11" },
    { label: "Afternoon 2PM-3PM", value: "afternoon_2_3" },
    { label: "Evening 6PM-7PM", value: "evening_6_7" },
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          "http://localhost:9003/ibm-doctor/doctors"
        );
        const data = await response.json();
        setDoctors(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setIsLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    setMinDate(
      `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`
    );
  }, []);
  const handleBookAppointment = (e) => {
    if (
      !reason ||
      !selectedDoctor ||
      !selectedDate ||
      !selectedSlot ||
      !name ||
      !patientEmail
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsPaymentModalOpen(false);
  };

  const handleAppointmentSubmit = async () => {
    const selectedDoctorObject = doctors.find(
      (doctor) => doctor.doctorId === selectedDoctor
    );
    try {
      const formData = new FormData();
      formData.append("doctorId", selectedDoctor);
      formData.append("doctorName", selectedDoctorObject.name);
      formData.append("patientId", patientId);
      formData.append("patientName", name);
      formData.append("patientEmail", patientEmail);
      formData.append("date", selectedDate);
      formData.append("slot", selectedSlot);
      formData.append("reason", reason);

      const response = await axios.post(
        "http://localhost:9002/ibm-appointment/appointments",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setReason("");
      setSelectedDoctor("");
      setSelectedDate("");
      setSelectedSlot("");
      setPatientEmail("");
      setPatientId("");
      setName("");
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  const handlePaymentSuccess = () => {
    handleCloseModal();
    toast.success("Payment successful! Appointment scheduled successfully!!", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    handleAppointmentSubmit();
    handleCloseModal();
  };

  return (
    <div className="container">
      <ToastContainer />
      <h2 className="my-4">Book Appointment</h2>
      <form
        className="form form-group mx-2 py-2 my-2 py-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleBookAppointment();
        }}
      >
        <div className="form-group mx-2 py-2 my-2 py-2">
          <label>Appointment Reason:</label>
          <input
            type="text"
            className="form-control"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Appointment Reason in detail"
          />
        </div>

        <div className="form-group mx-2 py-2 my-2 py-2">
          <label>Select Doctor:</label>
          <select
            className="form-control"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="" disabled>
              Select Doctor
            </option>
            {isLoading ? (
              <option disabled>Loading...</option>
            ) : (
              doctors.map((doctor) => (
                <option key={doctor.doctorId} value={doctor.doctorId}>
                  {doctor.name}- {doctor.specialization}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="form-group mx-2 py-2 my-2 py-2">
          <label>Select Date :</label>
          <input
            className="form-control mx-2 py-2 my-2 py-2"
            type="date"
            value={selectedDate}
            min={minDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="form-group mx-2 py-2 my-2 py-2">
          <label>Select Time Slot:</label>
          <select
            className="form-control"
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
          >
            <option value="" disabled>
              Select a time slot
            </option>
            {timeSlots.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mx-2 py-2 my-2 py-2">
          <label>Enter Your Name:</label>
          <input
            className="form-control"
            type="text"
            value={name}
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group mx-2 py-2 my-2 py-2">
          <label>Enter Your Email:</label>
          <input
            className="form-control"
            type="email"
            value={patientEmail}
            placeholder="Your Email"
            onChange={(e) => setPatientEmail(e.target.value)}
          />
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
