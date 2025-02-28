import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./layout/Header";
import TwitterAuth from "./auth/TwitterAuth";
import DashboardOverview from "./dashboard/DashboardOverview";
import CampaignDashboard from "./campaigns/CampaignDashboard";

interface HomeProps {
  isAuthenticated?: boolean;
  userName?: string;
  authError?: string | null;
}

const Home: React.FC<HomeProps> = ({
  isAuthenticated = false,
  userName = "Twitter User",
  authError = null,
}) => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated);
  const [loading, setLoading] = useState(true);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
    null,
  );
  const navigate = useNavigate();

  // Simulate checking authentication status
  useEffect(() => {
    // In a real app, this would check for a valid session
    const checkAuth = async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleAuthenticate = () => {
    // In a real app, this would redirect to Auth0 for Twitter authentication
    setLoading(true);
    // Simulate authentication process
    setTimeout(() => {
      setAuthenticated(true);
      setLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    // In a real app, this would clear the session
    setAuthenticated(false);
    setSelectedCampaignId(null);
  };

  const handleSelectCampaign = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    // In a real app with routing, this would navigate to the campaign page
    // navigate(`/campaigns/${campaignId}`);
  };

  const handleBackToOverview = () => {
    setSelectedCampaignId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="h-4 w-48 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <TwitterAuth onAuthenticate={handleAuthenticate} error={authError} />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        user={{
          name: userName,
          email: `${userName.toLowerCase().replace(" ", ".")}@example.com`,
        }}
        onLogout={handleLogout}
      />

      <main className="flex-1 overflow-auto">
        {selectedCampaignId ? (
          <CampaignDashboard onBackToList={handleBackToOverview} />
        ) : (
          <DashboardOverview userName={userName} />
        )}
      </main>
    </div>
  );
};

export default Home;
