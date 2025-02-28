import type { Meta, StoryObj } from "@storybook/react";
import CampaignsList from "../components/campaigns/CampaignsList";

const meta = {
  title: "Campaigns/CampaignsList",
  component: CampaignsList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CampaignsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyCampaigns: Story = {
  args: {
    campaigns: [],
  },
};

export const ManyCampaigns: Story = {
  args: {
    campaigns: [
      {
        id: "1",
        name: "Summer Product Launch",
        description: "Campaign for our new summer product line",
        startDate: new Date(2023, 5, 1),
        endDate: new Date(2023, 7, 31),
        postsCount: 24,
        engagementRate: 3.8,
      },
      {
        id: "2",
        name: "Brand Awareness",
        description: "Increasing visibility of our brand on Twitter",
        startDate: new Date(2023, 3, 15),
        endDate: new Date(2023, 9, 15),
        postsCount: 45,
        engagementRate: 2.5,
      },
      {
        id: "3",
        name: "Holiday Promotion",
        description: "Special offers and content for the holiday season",
        startDate: new Date(2023, 10, 1),
        endDate: new Date(2023, 11, 31),
        postsCount: 18,
        engagementRate: 4.2,
      },
      {
        id: "4",
        name: "Product Announcement",
        description: "Announcing our newest product features",
        startDate: new Date(2023, 8, 1),
        endDate: new Date(2023, 8, 30),
        postsCount: 12,
        engagementRate: 5.1,
      },
      {
        id: "5",
        name: "Customer Testimonials",
        description: "Sharing success stories from our customers",
        startDate: new Date(2023, 6, 15),
        endDate: new Date(2023, 9, 15),
        postsCount: 30,
        engagementRate: 3.9,
      },
    ],
  },
};
