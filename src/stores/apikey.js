import { defineStore } from "pinia";

export const useApiKeyStore = defineStore("apikey", {
  state: () => ({
    apikeys: [],
    currentRow: null,
  }),
  actions: {
    setApiKeys(data) {
      this.apikeys = data;
    },
    setCurrentRow(data) {
      this.currentRow = data;
    },
  },
});
