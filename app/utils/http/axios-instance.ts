import axios, { Axios, AxiosInstance, CreateAxiosDefaults } from "axios";

const axiosConfig: CreateAxiosDefaults = {
    baseURL: "http://localhost:8080",
    timeout: 1000,
}

export const axiosInstant = axios.create(axiosConfig)
