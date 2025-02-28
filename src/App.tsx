import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import CampaignDashboard from "./components/campaigns/CampaignDashboard";
import CampaignForm from "./components/campaigns/CampaignForm";

function App() {
  // Dynamically import tempo-routes only if in Tempo environment
  let tempoRoutes = [];
  try {
    if (import.meta.env.VITE_TEMPO === "true") {
      // This will be handled at build time by Vite
      const routes = require("tempo-routes").default;
      tempoRoutes = routes;
    }
  } catch (error) {
    console.error("Failed to load tempo routes:", error);
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(tempoRoutes)}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaigns/:id" element={<CampaignDashboard />} />
          <Route path="/create-campaign" element={<CampaignForm />} />
          <Route
            path="/edit-campaign/:id"
            element={<CampaignForm isEditing={true} />}
          />
          <Route path="/callback" element={<Home />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
