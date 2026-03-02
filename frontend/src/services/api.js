import axios from 'axios';

const API_BASE_URL = 'https://workflow-automation-backend-7up6.onrender.com';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authApi = {
    login: (role, data) => api.post(`/api/auth/login/${role.toLowerCase()}`, data),
    register: (role, data) => api.post(`/api/auth/register/${role.toLowerCase()}`, data),
};

export const requestApi = {
    createRequest: (data) => api.post('/request/create', data),
    approveStage: (data) => api.post('/request/approve', data),
    getRequestsForUser: (userId) => api.get(`/request/user/${userId}`),
    getRequestStatus: (requestId) => api.get(`/request/${requestId}`),
};

export const workflowApi = {
    createWorkflow: (data) => api.post('/workflow/create', data),
};

export default api;
