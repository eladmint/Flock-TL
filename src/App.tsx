import { Suspense } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import Home from "./components/home";
import CampaignDashboard from "./components/campaigns/CampaignDashboard";
import CampaignForm from "./components/campaigns/CampaignForm";
// Import tempo routes conditionally
let routes = [];
if (import.meta.env.VITE_TEMPO === "true") {
  try {
    // @ts-ignore - This will be handled by the tempo plugin
    routes = window.__TEMPO_ROUTES__ || [];
  } catch (error) {
    console.error("Failed to load tempo routes:", error);
  }
}

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
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
