// stores/authStore.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
    initialized: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async init() {
      if (this.initialized) return;
      this.loading = true;
      try {
        const data = await $fetch("/api/auth/me");
        this.user = data.user;
      } catch (e) {
        this.user = null;
      } finally {
        this.loading = false;
        this.initialized = true;
      }
    },

    async login(payload) {
      this.loading = true;
      try {
        const data = await $fetch("/api/auth/login", {
          method: "POST",
          body: payload,
        });
        this.user = data.user;
        return data;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      await $fetch("/api/auth/logout", { method: "POST" });
      this.user = null;
    },
  },
});
