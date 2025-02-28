import type { Meta, StoryObj } from "@storybook/react";
import CampaignDashboard from "../components/campaigns/CampaignDashboard";
import { BrowserRouter } from "react-router-dom";

const meta = {
  title: "Campaigns/CampaignDashboard",
  component: CampaignDashboard,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof CampaignDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomCampaign: Story = {
  args: {
    campaign: {
      id: "custom-campaign",
      name: "Q4 Product Launch",
      description: "Major product launch for the holiday season",
      startDate: new Date(2023, 9, 1),
      endDate: new Date(2023, 11, 31),
      stats: {
        followers: 25000,
        followersChange: 8.3,
        impressions: 120000,
        impressionsChange: 15.8,
        engagement: 5.7,
        engagementChange: 1.2,
        clicks: 3500,
        clicksChange: 10.2,
        engagementMetrics: {
          likes: 2500,
          retweets: 850,
          replies: 320,
          totalPosts: 75,
        },
      },
    },
  },
};
