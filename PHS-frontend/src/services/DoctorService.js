import axios from 'axios';

const BASE_URL = 'http://localhost:2000';

const DoctorService = {
    registerDoctor: async (doctorData) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/doctor/register`, doctorData);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    },

    loginDoctor: async (credentials) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/doctor/login`, credentials);
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    },

    updateDoctorProfile: async (updatedData, token) => {
        console.log(updatedData);
        try {
            const response = await axios.put(`${BASE_URL}/api/doctor/${updatedData._id}`, updatedData, {
                headers: { authorization: `Bearer ${token}` }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
};

export default DoctorService;
