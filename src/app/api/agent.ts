import axios, { AxiosResponse } from "axios";
import { IPatient, IMeeting } from "../models/patient";

import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error");
  }
  if (
    error.response.status === 400 &&
    error.response.config.method === "get" &&
    error.response.data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (error.response.status === 401) {
    window.localStorage.removeItem("jwt");
    history.push("/");
    toast.info("Session is epired.");
  }
  if (error.response.status === 404) {
    history.push("/notfound");
  }
  if (error.response.status === 500) {
    toast.error("Server error");
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;


const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Patients = {
  list: (): Promise<IPatient[]> => requests.get("/patients"),
  details: (id: string) => requests.get(`/patients/${id}`),
  create: (patient: IPatient) => requests.post("/patients", patient),
  update: (patient: IPatient) =>
    requests.put(`/patients/edit/${patient.id}`, patient),
  delete: (id: string) => requests.del(`/patients/${id}`),
  meetingUpdate: (meeting: IMeeting) =>
    requests.put(`/patients/meeting/edit/${meeting.meetingId}`, meeting),
  meetingCreate: (meeting: IMeeting, id: string) =>
    requests.post(`/patients/meeting/create/${id}`, meeting),
  meetingDelete: (id: string) => requests.del(`patients/meetings/${id}`),
};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/login`, user),
};

export default {
  Patients,
  User,
};
