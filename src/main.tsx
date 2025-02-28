import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Initialize Tempo only if in Tempo environment
if (import.meta.env.VITE_TEMPO === "true") {
  import("tempo-devtools")
    .then(({ TempoDevtools }) => {
      TempoDevtools.init();
    })
    .catch((err) => {
      console.error("Failed to load Tempo devtools:", err);
    });
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
