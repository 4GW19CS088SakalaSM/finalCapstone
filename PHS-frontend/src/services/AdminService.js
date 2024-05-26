import axios from "axios";

const BASE_URL = "http://localhost:2000";

const AdminService = {
  loginAdmin: async (credentials) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/admin/login`,
        credentials
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  getDoctors: async (token) => {
    try {
      const response = await axios.get(
        `http://localhost:9003/ibm-doctor/doctors`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  getPatients: async (token) => {
    try {
      const response = await axios.get(
        `http://localhost:9004/ibm-patient/patients`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  getAppointments: async (token) => {
    try {
      const response = await axios.get(
        `http://localhost:9002/ibm-appointment/appointments`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
};

export default AdminService;
