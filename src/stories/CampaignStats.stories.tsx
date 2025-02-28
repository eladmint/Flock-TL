import type { Meta, StoryObj } from "@storybook/react";
import CampaignStats from "../components/campaigns/CampaignStats";

const meta = {
  title: "Campaigns/CampaignStats",
  component: CampaignStats,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CampaignStats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HighEngagement: Story = {
  args: {
    campaignName: "Viral Marketing Campaign",
    dateRange: "Jan 1, 2023 - Mar 31, 2023",
    followers: 50000,
    followersChange: 25.8,
    impressions: 250000,
    impressionsChange: 45.3,
    engagement: 8.9,
    engagementChange: 3.2,
    clicks: 15000,
    clicksChange: 35.7,
    engagementMetrics: {
      likes: 12500,
      retweets: 4800,
      replies: 2300,
      totalPosts: 120,
    },
  },
};

export const LowEngagement: Story = {
  args: {
    campaignName: "Awareness Campaign",
    dateRange: "Apr 1, 2023 - Apr 30, 2023",
    followers: 8500,
    followersChange: -1.2,
    impressions: 15000,
    impressionsChange: -5.8,
    engagement: 1.3,
    engagementChange: -0.7,
    clicks: 450,
    clicksChange: -3.5,
    engagementMetrics: {
      likes: 320,
      retweets: 85,
      replies: 42,
      totalPosts: 30,
    },
  },
};
