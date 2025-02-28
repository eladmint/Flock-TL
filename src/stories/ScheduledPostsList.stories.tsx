import type { Meta, StoryObj } from "@storybook/react";
import ScheduledPostsList from "../components/posts/ScheduledPostsList";

const meta = {
  title: "Posts/ScheduledPostsList",
  component: ScheduledPostsList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScheduledPostsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyList: Story = {
  args: {
    posts: [],
  },
};

export const MixedStatusPosts: Story = {
  args: {
    posts: [
      {
        id: '1',
        content: 'Excited to announce our new product launch! #ProductLaunch #Innovation',
        scheduledDate: new Date(Date.now() + 86400000), // tomorrow
        campaign: 'Product Launch',
        status: 'scheduled',
        autoLike: true
      },
      {
        id: '2',
        content: 'Check out our latest blog post on industry trends and insights: https://example.com/blog',
        scheduledDate: new Date(Date.now() + 172800000), // day after tomorrow
        campaign: 'Content Marketing',
        status: 'scheduled',
        autoLike: false
      },
      {
        id: '3',
        content: 'We're hiring! Join our team and help us build the future of social media management.',
        scheduledDate: new Date(Date.now() + 259200000), // 3 days from now
        campaign: 'Recruitment',
        status: 'scheduled',
        autoLike: true
      },
      {
        id: '4',
        content: 'Thanks to everyone who attended our webinar yesterday! The recording is now available.',
        scheduledDate: new Date(Date.now() - 86400000), // yesterday
        campaign: 'Webinar Series',
        status: 'published',
        autoLike: true
      },
      {
        id: '5',
        content: 'Our system was down for maintenance. We apologize for any inconvenience caused.',
        scheduledDate: new Date(Date.now() - 172800000), // 2 days ago
        campaign: 'System Updates',
        status: 'published',
        autoLike: false
      },
      {
        id: '6',
        content: 'Tweet failed to publish due to API rate limiting. Please try again later.',
        scheduledDate: new Date(Date.now() - 43200000), // 12 hours ago
        campaign: 'Product Launch',
        status: 'failed',
        autoLike: true
      },
    ],
  },
};
