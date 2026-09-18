import assert from "node:assert/strict";
import test from "node:test";

import { resolveSiteUrl } from "../utils/resolveSiteUrl.js";

test("uses the production origin when APP_BASE_URL is localhost", () => {
  assert.equal(
    resolveSiteUrl({
      APP_BASE_URL: "http://localhost:3008",
      NODE_ENV: "production",
    }),
    "https://batina-media.com",
  );
});

test("does not let a localhost value hide a configured public origin", () => {
  assert.equal(
    resolveSiteUrl({
      APP_BASE_URL: "http://localhost:3008",
      NUXT_PUBLIC_SITE_URL: "https://batina-media.com/",
      NODE_ENV: "production",
    }),
    "https://batina-media.com",
  );
});

test("uses the local origin during development when no public origin is configured", () => {
  assert.equal(resolveSiteUrl({ NODE_ENV: "development" }), "http://localhost:3008");
});

test("uses the production fallback on Vercel even without NODE_ENV", () => {
  assert.equal(resolveSiteUrl({ VERCEL: "1" }), "https://batina-media.com");
});

test("rejects malformed configured origins", () => {
  assert.equal(
    resolveSiteUrl({
      APP_BASE_URL: "batina-media.com",
      NODE_ENV: "production",
    }),
    "https://batina-media.com",
  );
});
