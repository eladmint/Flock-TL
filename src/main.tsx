import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithHistory } from "./context/Auth0Context";

// Initialize Tempo
if (import.meta.env.VITE_TEMPO === "true") {
  // Using dynamic import for ESM compatibility
  import("tempo-devtools")
    .then((module) => {
      if (module && typeof module.TempoDevtools?.init === "function") {
        module.TempoDevtools.init();
      }
    })
    .catch((err) => {
      console.error("Failed to initialize Tempo:", err);
    });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </React.StrictMode>,
);
