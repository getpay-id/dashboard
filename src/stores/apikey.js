import { defineStore } from "pinia";

export const useApiKeyStore = defineStore("apikey", {
  state: () => ({
    apikeys: [],
  }),
  actions: {
    setApiKeys(data) {
      this.apikeys = data;
    },
  },
});
