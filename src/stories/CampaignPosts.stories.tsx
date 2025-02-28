import type { Meta, StoryObj } from "@storybook/react";
import CampaignPosts from "../components/campaigns/CampaignPosts";

const meta = {
  title: "Campaigns/CampaignPosts",
  component: CampaignPosts,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CampaignPosts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyPosts: Story = {
  args: {
    campaignId: "empty-campaign",
    campaignName: "New Campaign",
    posts: [],
  },
};

export const ManyPosts: Story = {
  args: {
    campaignId: "many-posts-campaign",
    campaignName: "Content Marketing Campaign",
    posts: [
      {
        id: "post-1",
        content:
          "Excited to announce our new summer collection! Stay tuned for more details. #SummerLaunch #NewProducts",
        scheduledDate: "2023-06-15T10:00:00",
        status: "scheduled",
        likes: 0,
        retweets: 0,
        autoLike: true,
      },
      {
        id: "post-2",
        content:
          "Our summer collection drops next week! Here's a sneak peek at what's coming. #SummerVibes",
        scheduledDate: "2023-06-10T14:30:00",
        status: "scheduled",
        likes: 0,
        retweets: 0,
        autoLike: false,
      },
      {
        id: "post-3",
        content:
          "Thanks to everyone who joined our product preview yesterday! The feedback has been amazing. #CustomerLove",
        scheduledDate: "2023-06-05T09:15:00",
        status: "published",
        likes: 45,
        retweets: 12,
        autoLike: true,
      },
      {
        id: "post-4",
        content:
          "Draft post for the summer campaign finale. Need to add more details about the special offers.",
        scheduledDate: "",
        status: "draft",
        likes: 0,
        retweets: 0,
        autoLike: false,
      },
      {
        id: "post-5",
        content:
          "Check out our latest blog post on summer fashion trends: https://example.com/blog/summer-trends",
        scheduledDate: "2023-06-20T12:00:00",
        status: "scheduled",
        likes: 0,
        retweets: 0,
        autoLike: true,
      },
      {
        id: "post-6",
        content:
          "Summer sale starts this weekend! Get 30% off all items. Use code SUMMER30 at checkout. #SummerSale",
        scheduledDate: "2023-06-25T09:00:00",
        status: "scheduled",
        likes: 0,
        retweets: 0,
        autoLike: true,
      },
      {
        id: "post-7",
        content:
          "Our first batch of summer collection items sold out in 24 hours! Restocking next week. #HotSeller",
        scheduledDate: "2023-06-02T15:30:00",
        status: "published",
        likes: 78,
        retweets: 23,
        autoLike: true,
      },
    ],
  },
};
