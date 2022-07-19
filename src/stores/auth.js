import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: sessionStorage.getItem("accessToken"),
    apiUrl: sessionStorage.getItem("apiUrl"),
    axiosInstance: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    axios: (state) => state.axiosInstance,
  },
  actions: {
    setApiUrl(url) {
      this.apiUrl = url;
      sessionStorage.setItem("apiUrl", url);
      this.axiosInstance = axios.create({
        baseURL: this.apiUrl,
      });
    },
    setAccessToken(token) {
      this.accessToken = token;
      sessionStorage.setItem("accessToken", token);
      this.axiosInstance.interceptors.request.use((config) => {
        var headers = config.headers;
        if (this.accessToken) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      });
    },
    async signIn(username, password) {
      var form = new FormData();
      form.append("username", username);
      form.append("password", password);
      try {
        const resp = await this.axios.post("/auth/signin", form);
        this.setAccessToken(resp.data.access_token);
        return { status: resp.status, data: resp.data };
      } catch (error) {
        const resp = error.response;
        return { status: resp.status, data: resp.data };
      }
    },
  },
});
