import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import MainRoutes from "./routes";
import * as Sentry from "@sentry/react";

let release = "react-sentry-project@1.0.0"

Sentry.init({
  dsn: "https://4bbc5a3f84b742e9b06c4d44f24b7ce8@o4505199266365440.ingest.sentry.io/4505201115267072",
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  tracesSampleRate: 1.0,
  release: release,
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter tab="index">
    <MainRoutes tab="index" />
  </BrowserRouter>
);
