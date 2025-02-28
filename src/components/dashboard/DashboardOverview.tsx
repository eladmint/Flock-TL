import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatsOverview from "./StatsOverview";
import CampaignsList from "../campaigns/CampaignsList";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useTweets } from "@/hooks/useTweets";

interface DashboardOverviewProps {
  userName?: string;
  isLoading?: boolean;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  userName = "Twitter User",
  isLoading: propIsLoading = false,
}) => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"campaigns" | "posts">(
    "campaigns",
  );

  const { campaigns, loading: campaignsLoading } = useCampaigns();
  const { tweets, loading: tweetsLoading } = useTweets();

  const isLoading = propIsLoading || campaignsLoading || tweetsLoading;

  const handleSelectCampaign = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}`);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-50 p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {userName}</h1>
          <p className="text-gray-500 mt-1">
            Here's an overview of your Twitter campaigns and scheduled posts
          </p>
        </div>

        <StatsOverview />

        <div className="mt-8 flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Your Campaigns</h2>
                <button
                  onClick={() => setSelectedTab("campaigns")}
                  className={`text-sm ${selectedTab === "campaigns" ? "text-blue-600 font-medium" : "text-gray-500"}`}
                >
                  View all
                </button>
              </div>
            </div>
            {selectedTab === "campaigns" ? (
              <CampaignsList
                campaigns={campaigns.map((campaign) => ({
                  id: campaign.id,
                  name: campaign.name,
                  description: campaign.description || "",
                  startDate: new Date(campaign.start_date),
                  endDate: new Date(campaign.end_date),
                  postsCount: tweets.filter(
                    (t) => t.campaign_id === campaign.id,
                  ).length,
                  engagementRate: 0, // This would be calculated from analytics in a real app
                }))}
                onSelectCampaign={handleSelectCampaign}
              />
            ) : null}
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Upcoming Posts</h2>
                <button
                  onClick={() => setSelectedTab("posts")}
                  className={`text-sm ${selectedTab === "posts" ? "text-blue-600 font-medium" : "text-gray-500"}`}
                >
                  View all
                </button>
              </div>
            </div>
            {selectedTab === "posts" ? (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                {tweets.length > 0 ? (
                  <div className="space-y-4">
                    {tweets
                      .filter((tweet) => tweet.status === "scheduled")
                      .slice(0, 5)
                      .map((tweet) => (
                        <div key={tweet.id} className="p-4 border rounded-lg">
                          <p className="text-sm">{tweet.content}</p>
                          <div className="mt-2 text-xs text-gray-500">
                            Scheduled for:{" "}
                            {new Date(
                              tweet.scheduled_for || "",
                            ).toLocaleString()}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500">
                    No scheduled posts yet. Create your first campaign to get
                    started.
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Quick Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Optimize Posting Times</h3>
                <p className="text-sm text-gray-600">
                  Schedule your tweets during peak engagement hours to maximize
                  reach.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Use Hashtags Strategically</h3>
                <p className="text-sm text-gray-600">
                  Research and use relevant hashtags to increase your content's
                  discoverability.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Engage With Your Audience</h3>
                <p className="text-sm text-gray-600">
                  Respond to comments and mentions to build stronger
                  relationships with followers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
