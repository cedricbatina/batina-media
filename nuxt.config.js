// nuxt.config.mjs
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxtjs/i18n", "@nuxtjs/sitemap", "@vite-pwa/nuxt"],

  devtools: { enabled: true },

  devServer: {
    port: 3008,
    host: "0.0.0.0",
  },
  css: ["~/assets/css/main.css"],

  i18n: {
    locales: [
      { code: "fr", iso: "fr-FR", file: "fr.json", name: "Français" },
      { code: "en", iso: "en-US", file: "en.json", name: "English" },
      { code: "pt", iso: "pt-PT", file: "pt.json", name: "Português" },
      { code: "es", iso: "es-ES", file: "es.json", name: "Espanol" },
    ],
    defaultLocale: "fr",
    strategy: "prefix_except_default",
    lazy: true,

    // ⬇️ change juste CETTE LIGNE
    langDir: "locales",

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
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
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    mailFrom: process.env.MAIL_FROM,
    mailVerificationBaseUrl: process.env.MAIL_VERIFICATION_BASE_URL,

    // PUBLIC (client)
    public: {
      appBaseUrl: process.env.APP_BASE_URL,
    },
  },
});
