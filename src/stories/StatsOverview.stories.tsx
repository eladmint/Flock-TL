import type { Meta, StoryObj } from "@storybook/react";
import StatsOverview from "../components/dashboard/StatsOverview";

const meta = {
  title: "Dashboard/StatsOverview",
  component: StatsOverview,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StatsOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomStats: Story = {
  args: {
    followers: 25000,
    followersChange: 8.3,
    engagement: 5.7,
    engagementChange: 1.2,
    impressions: 120000,
    impressionsChange: 15.8,
    retweets: 1500,
    retweetsChange: 12.4,
  },
};

export const NegativeStats: Story = {
  args: {
    followers: 10000,
    followersChange: -2.1,
    engagement: 2.8,
    engagementChange: -0.5,
    impressions: 35000,
    impressionsChange: -5.3,
    retweets: 420,
    retweetsChange: -3.2,
  },
};
