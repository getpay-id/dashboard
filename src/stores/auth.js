import { defineStore } from "pinia";
import axios from "axios";
import { router } from "src/router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: sessionStorage.getItem("accessToken"),
    apiUrl: sessionStorage.getItem("apiUrl"),
    axiosInstance: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    axios: (state) => {
      const instance =
        state.axiosInstance ||
        axios.create({
          baseURL: state.apiUrl,
        });
      if (state.accessToken) {
        instance.defaults.headers.common.Authorization = `Bearer ${state.accessToken}`;
      }
      // Add a response interceptor
      instance.interceptors.response.use(
        function (response) {
          return response;
        },
        function (error) {
          const resp = error.response;
          const self = useAuthStore();
          const isExpired =
            resp.status === 400 && resp.data.detail === "Token has expired";
          if (isExpired) {
            self.logout();
          }
          return Promise.reject(error);
        }
      );
      return instance;
    },
  },
  actions: {
    logout() {
      this.accessToken = this.axiosInstance = null;
      sessionStorage.removeItem("accessToken");
      router.push("/signin");
    },
    setApiUrl(url) {
      this.apiUrl = url;
      sessionStorage.setItem("apiUrl", url);
    },
    setAccessToken(token) {
      this.accessToken = token;
      sessionStorage.setItem("accessToken", token);
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
