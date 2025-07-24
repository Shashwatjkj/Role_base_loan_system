import axios from 'axios';

// Axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

// ========== AUTH ==========

export const loginUser = async (username: string, password: string) => {
  const res = await api.post('/auth/login', { username, password });
  return res.data; // { token, role }
};

// ========== APPLICATION ==========


export const submitApplication = async (formData: any) => {
  const res = await api.post('/applications/submit', formData);
  return res.data;
};

export const getApplications = async (token: string) => {
  const res = await api.get('/applications/pending', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateApplicationStatus = async (
  id: string,
  status: string,
  token: string
) => {
  const res = await api.post(
    `/applications/status/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};


export const addAdmin = async (
  username: string,
  password: string,
  token: string
) => {
  const res = await api.post(
    '/admin/add',
    { username, password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getDashboardStats = async (token: string) => {
  const res = await api.get('/dashboard/summary', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};