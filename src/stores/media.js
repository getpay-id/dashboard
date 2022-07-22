import { defineStore } from "pinia";

export const useMediaStore = defineStore("media", {
  state: () => ({
    media: [],
    currentRow: null,
  }),

  getters: {},

  actions: {
    setMedia(data) {
      this.media = data;
    },
    setCurrentRow(row) {
      this.currentRow = row;
    },
  },
});
