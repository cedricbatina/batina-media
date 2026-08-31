// nuxt.config.mjs
import { resolveSiteUrl } from "./utils/resolveSiteUrl.js";

const SITE_URL = resolveSiteUrl();

export default defineNuxtConfig({
  compatibilityDate: '2026-03-05',
  modules: ["@pinia/nuxt", "@nuxtjs/i18n", "@nuxtjs/sitemap", "@vite-pwa/nuxt", "@nuxt/ui"],

  devtools: { enabled: true },

  devServer: {
    port: 3008,
    host: "0.0.0.0",
  },
  css: ["~/assets/css/main.css"],
  plugins: ['~/plugins/reveal.client'],
  i18n: {
    locales: [
      { code: "fr", iso: "fr-FR", file: "fr.json", name: "Français" },
      { code: "en", iso: "en-US", file: "en.json", name: "English" },
      { code: "pt", iso: "pt-PT", file: "pt.json", name: "Português" },
      { code: "es", iso: "es-ES", file: "es.json", name: "Espanol" },
    ],
    defaultLocale: "fr",
    fallbackLocale: "fr",
    strategy: "prefix",
    lazy: true,
    baseUrl: SITE_URL,

    // ⬇️ change juste CETTE LIGNE
    langDir: "locales",

    detectBrowserLanguage: false,
  },
  site: {
    url: SITE_URL,
  },
  sitemap: {
    autoLastmod: true,
    exclude: [
      "/login",
      "/register",
      "/forgot-password",
      "/reset-password",
      "/verify-email",
      "/resend-verification",
    ],
  },
  // strategy=prefix → sans locale = 404 en prod (ex. /presse). Alias FR par défaut.
  routeRules: {
    "/presse": { redirect: { to: "/fr/presse", statusCode: 301 } },
    "/contact": { redirect: { to: "/fr/contact", statusCode: 301 } },
    "/projects": { redirect: { to: "/fr/projects", statusCode: 301 } },
    "/studio": { redirect: { to: "/fr/studio", statusCode: 301 } },
    "/solutions": { redirect: { to: "/fr/solutions", statusCode: 301 } },
    "/privacy": { redirect: { to: "/fr/privacy", statusCode: 301 } },
    "/terms": { redirect: { to: "/fr/terms", statusCode: 301 } },
    "/legal": { redirect: { to: "/fr/legal", statusCode: 301 } },
    "/login": { redirect: { to: "/fr/login", statusCode: 301 } },
    "/register": { redirect: { to: "/fr/register", statusCode: 301 } },
    "/forgot-password": { redirect: { to: "/fr/forgot-password", statusCode: 301 } },
    "/reset-password": { redirect: { to: "/fr/reset-password", statusCode: 301 } },
    "/verify-email": { redirect: { to: "/fr/verify-email", statusCode: 301 } },
    "/resend-verification": { redirect: { to: "/fr/resend-verification", statusCode: 301 } },
  },
  runtimeConfig: {
    // PRIVATE (server)
    mysqlHost: process.env.DB_HOST,
    mysqlUser: process.env.DB_USER,
    mysqlPassword: process.env.DB_PASSWORD,
    mysqlDatabase: process.env.DB_NAME,
    mysqlPort: process.env.DB_PORT || 3306,

    jwtSecret: process.env.JWT_SECRET,
    jwtEmailSecret: process.env.JWT_EMAIL_SECRET || process.env.JWT_SECRET,

    smtpHost: process.env.SMTP_HOST,
    smtpHostIp: process.env.SMTP_HOST_IP,
    smtpTlsServername: process.env.SMTP_TLS_SERVERNAME,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    mailFrom: process.env.MAIL_FROM || process.env.EMAIL_FROM,
    mailVerificationBaseUrl: process.env.MAIL_VERIFICATION_BASE_URL,

    // PUBLIC (client)
    public: {
      appBaseUrl: SITE_URL,
      siteUrl: SITE_URL,
    },
  },
});


