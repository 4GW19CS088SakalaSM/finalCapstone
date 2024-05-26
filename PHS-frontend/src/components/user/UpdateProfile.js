// UpdateProfile.js

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userUpdateProfile } from "../../redux/UserSlice";
import UserService from "../../services/UserService";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const selectedRole = useSelector((state) => state.role.selectedRole);
  const userData = useSelector((state) => state.adminData.adminProfileData);
  const token = useSelector((store) => store.user.jwtToken);
  const [formData, setFormData] = useState(userData);

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await UserService.updateUserProfile(formData, token);
      dispatch(userUpdateProfile(user));
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_BAD_REQUEST") alert(error.message);
    }
  };

  return (
    <>
      {/* <h1>Update Your Profile</h1> */}
      {selectedRole === "admin" ? (
        <form className="row g-3 px-4" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-group-lg px-4 py-1 rounded"
            placeholder="Enter First Name"
            autoFocus
            required
          />
          {/* <br /> */}
          <label>Phone :</label>
          <input
            type="text"
            name="phone"
            value={formData.contact}
            onChange={handleChange}
            className="input-group-lg px-4 py-1 rounded"
            placeholder="Enter Phone "
            required
          />
          {/* <br /> */}
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-group-lg px-4 py-1 rounded"
            placeholder="Enter Email"
            required
          />
          <br />
          <label>Avatar :</label>
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="input-group-lg px-4 py-2 my-4 rounded"
            placeholder="Add avatar here...."
          />
          <br />
          {selectedRole === "admin" ? (
            <button
              type="submit"
              disabled
              className="bg-btn-small rounded py-2 "
            >
              Admin Can't edit profile
            </button>
          ) : (
            <button type="submit" className="bg-btn-small rounded py-2 ">
              Save Changes
            </button>
          )}
        </form>
      ) : (
        <p>No profile data available.</p>
      )}
    </>
  );
};

export default UpdateProfile;
