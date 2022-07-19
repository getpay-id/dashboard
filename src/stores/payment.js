import { defineStore } from "pinia";

export const usePaymentStore = defineStore("payment", {
  state: () => ({
    paymentGateways: [],
    paymentMethods: [],
  }),
  actions: {
    setPaymentGateways(data) {
      this.paymentGateways = data;
    },
    setPaymentMethods(data) {
      this.paymentMethods = data;
    },
  },
});
