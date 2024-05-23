import axios from 'axios';

const BASE_URL = 'http://localhost:2000';


const AdminService = {
    // registerAdmin: async (adminData) => {
    //     try {
    //         const response = await axios.post(`${BASE_URL}/api/admin/register`, adminData);
    //         return response.data;
    //     } catch (error) {
    //         console.error(error);
    //         throw new Error(error);
    //     }
    // },

    loginAdmin: async (credentials) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/admin/login`, credentials);
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    },

    // updateAdminProfile: async (updatedData, token) => {
    //     console.log(updatedData);
    //     try {
    //         const response = await axios.put(`${BASE_URL}/api/admin/${updatedData._id}`, updatedData, {
    //             headers: { authorization: `Bearer ${token}` }
    //         });
    //         console.log(response.data);
    //         return response.data;
    //     } catch (error) {
    //         console.error(error);
    //         throw new Error(error);
    //     }
    // },

    getDoctors: async (token) => {
        try {
            const response = await axios.get(`http://localhost:9003/ibm-doctor/doctors`, {
                headers: { authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    },

    getPatients: async (token) => {
        try {
            const response = await axios.get(`http://localhost:9004/ibm-patient/patients`, {
                headers: { authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    },

    getAppointments: async (token) => {
        try {
            const response = await axios.get(`http://localhost:9002/ibm-appointment/appointments`, {
                headers: { authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
};

export default AdminService;
