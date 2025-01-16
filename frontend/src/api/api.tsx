import axios from "axios";

export const API_URL: string = "http://localhost:5068/";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
