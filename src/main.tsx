import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Initialize Tempo only if in Tempo environment and in development
if (import.meta.env.DEV && import.meta.env.VITE_TEMPO === "true") {
  try {
    import("tempo-devtools")
      .then(({ TempoDevtools }) => {
        TempoDevtools.init();
      })
      .catch((err) => {
        console.error("Failed to load Tempo devtools:", err);
      });
  } catch (error) {
    console.warn("Tempo devtools not available", error);
  }
}

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
