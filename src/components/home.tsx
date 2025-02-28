import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./layout/Header";
import TwitterAuth from "./auth/TwitterAuth";
import DashboardOverview from "./dashboard/DashboardOverview";
import CampaignDashboard from "./campaigns/CampaignDashboard";
import { useAuth } from "@/context/AuthContext";

interface HomeProps {
  isAuthenticated?: boolean;
  userName?: string;
  authError?: string | null;
}

const Home: React.FC<HomeProps> = ({
  isAuthenticated: propIsAuthenticated = false,
  userName: propUserName = "Twitter User",
  authError = null,
}) => {
  const { user, loading: authLoading, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
    null,
  );
  const navigate = useNavigate();

  const isAuthenticated = user !== null || propIsAuthenticated;
  const userName = user?.user_metadata?.name || propUserName;

  // Check authentication status
  useEffect(() => {
    if (!authLoading) {
      setLoading(false);
    }
  }, [authLoading]);

  const handleLogout = async () => {
    await signOut();
    setSelectedCampaignId(null);
  };

  const handleSelectCampaign = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}`);
  };

  const handleBackToOverview = () => {
    navigate("/");
  };

  if (loading || authLoading) {
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

  if (!isAuthenticated) {
    return <TwitterAuth error={authError} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        user={{
          name: userName,
          email:
            user?.email ||
            `${userName.toLowerCase().replace(" ", ".")}@example.com`,
          avatar: user?.user_metadata?.avatar_url,
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
