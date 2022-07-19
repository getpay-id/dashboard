import { defineStore } from "pinia";

export const usePaymentStore = defineStore("payment", {
  state: () => ({
    paymentGateways: [],
  }),
  actions: {
    setPaymentGateways(data) {
      this.paymentGateways = data;
    },
  },
});
