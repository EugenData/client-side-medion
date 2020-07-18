import axios, { AxiosResponse } from "axios";
import { IPatient } from "../models/patient";


axios.defaults.baseURL = "http://localhost:5000/api/";

const responseBody = (response: AxiosResponse) => response.data;
const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );
const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
};
const Patients = {
  list: (): Promise<IPatient[]> => requests.get("/patients"),
  details: (id: string) => requests.get(`/patients/${id}`),
  create: (patient: IPatient) => requests.post("/patients", patient),
  update: (patient: IPatient) =>
    requests.put(`/patients/${patient.id}`, patient),
  delete: (id: string) => requests.del(`/patients/${id}`),
};
export default {
  Patients
};
