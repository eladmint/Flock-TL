import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/components/home";
import CampaignDashboard from "@/components/campaigns/CampaignDashboard";
import { Suspense } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/campaigns/:id",
    element: <CampaignDashboard />,
  },
  // Add more routes as needed
]);

export default function Routes() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
