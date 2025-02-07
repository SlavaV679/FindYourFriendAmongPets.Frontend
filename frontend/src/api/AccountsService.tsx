import axios, { AxiosResponse } from "axios";
import { LoginResponse } from "../models/LoginResponse";
import { Envelope } from "../models/Envelope";
import { api, API_URL } from "./api";

export class AccountsService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<Envelope<LoginResponse>>> {
    console.log(email, password);
    return api.post<Envelope<LoginResponse>>("Accounts/login", {
      email,
      password,
    });
  }

  static async refresh() {
    return axios.post<Envelope<LoginResponse>>(
      API_URL + "accounts/refresh",
      {},
      {
        withCredentials: true,
      }
    );
  }

  static async logout() {
    return api.post<Envelope<LoginResponse>>("accounts/logout");
  }
}
