import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  const adminProfileData = useSelector(
    (state) => state.adminData.adminProfileData
  );
  const selectedRole = useSelector((state) => state.role.selectedRole);
  const userData = useSelector((state) => state.user.loggedInUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderProfileDetails = () => {
    if (selectedRole === "admin") {
      return (
        <div className="d-flex flex-row">
          <div className="px-4 py-4">
            {adminProfileData.avatar && (
              <img
                className=""
                src={adminProfileData.avatar}
                style={{ marginBottom: "30px" }}
                alt="Avatar"
                width={160}
              />
            )}
            <div className="px-4">
              <p>
                <strong>Name:</strong> {adminProfileData.name}
              </p>
              <p>
                <strong>Email:</strong> {adminProfileData.email}
              </p>
              <p>
                <strong>Contact:</strong> {adminProfileData.contact}
              </p>
              <p>
                <strong>Gender:</strong> {adminProfileData.gender}
              </p>
              <p>
                <strong>Role:</strong> {adminProfileData.role}
              </p>
            </div>
          </div>
        </div>
      );
    }else if(selectedRole === "patient"){
         
    } else {
      return <p>No profile data available.</p>;
    }
  };

  return (
    <div className="m-4 p-4">
      <div className="border shadow-lg rounded-4 px-4 d-flex flex-row justify-content-between">
        <div>
          <h2 className="px-4 py-2">Your Profile</h2>

          {renderProfileDetails()}

          <Modal show={isModalOpen} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <UpdateProfile />
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
        <div>
          {!isModalOpen && (
            <p className="fw-bold p-2 fs-5">
              <button className="btn pb-2 fs-2" onClick={handleEditClick}>
                <i className="bi bi-pencil-fill"></i>
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
