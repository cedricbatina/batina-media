// middleware/auth.global.js
export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();

  if (!auth.initialized) {
    await auth.init();
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return navigateTo("/login");
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return navigateTo("/");
  }
});
