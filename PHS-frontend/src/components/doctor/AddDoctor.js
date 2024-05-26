import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const AddNewDoctor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const departmentsArray = [
    "Dentist",
    "Orthopedic",
    "Physician",
    "Neurologist",
    "Dermatologist",
    "Surgeon",
    "Other"
  ];

  const validateForm = () => {
    if (!name || !email || !contact || !gender || !password || !specialization) {
      toast.error("Please fill out all fields");
      return false;
    }
    return true;
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("contact", contact);
      formData.append("password", password);
      formData.append("gender", gender);
      formData.append("specialization", specialization);
      formData.append("docAvatar", docAvatar);

      const response = await axios.post("http://localhost:2000/api/doctor/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      const response2 = await axios.post("http://localhost:9003/ibm-doctor/doctors", formData, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success(`Dr. ${name} added successfully!`, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setName("");
      setEmail("");
      setContact("");
      setGender("");
      setPassword("");
      setSpecialization("");
      setDocAvatar("");
      setDocAvatarPreview("");
      // navigateTo("/doctors");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
      console.error(error); // Optional: Log the error for debugging
    }
  };

  return (
    <section className="page"> 
    <ToastContainer />
      <section className="container add-doctor-form">
        <h1 className="form-title">REGISTER A NEW DOCTOR</h1>
        <form onSubmit={handleAddNewDoctor}>
          <div className="first-wrapper">
            <div>
              <img
                width="200px"
                height="100px"
                src={
                  docAvatarPreview ? `${docAvatarPreview}` : "/images/doctor.png"
                }
                alt="Doctor Avatar"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                placeholder="Mobile Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <select
                value={specialization}
                onChange={(e) => {
                  setSpecialization(e.target.value);
                }}
              >
                <option value="">Select Specialization</option>
                {departmentsArray.map((depart, index) => {
                  return (
                    <option value={depart} key={index}>
                      {depart}
                    </option>
                  );
                })}
              </select>
              <button type="submit">Register New Doctor</button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewDoctor;
