import { defineStore } from "pinia";

export const usePaymentStore = defineStore("payment", {
  state: () => ({
    paymentGateways: [],
    paymentMethods: [],
    paymentChannels: [],
    paymentChannelObject: {},
  }),
  actions: {
    setPaymentGateways(data) {
      this.paymentGateways = data;
    },
    setPaymentMethods(data) {
      this.paymentMethods = data;
    },
    setPaymentChannels(data) {
      this.paymentChannels = data;
    },
    setPaymentChannelObject(data) {
      this.paymentChannelObject = data;
    },
  },
});
