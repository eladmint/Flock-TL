import type { Meta, StoryObj } from "@storybook/react";
import PostEditor from "../components/posts/PostEditor";

const meta = {
  title: "Posts/PostEditor",
  component: PostEditor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PostEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateNew: Story = {};

export const EditExisting: Story = {
  args: {
    postId: "existing-post-123",
    campaignId: "summer-campaign",
    initialContent:
      "Check out our latest blog post on summer fashion trends: https://example.com/blog/summer-trends #SummerFashion #TrendAlert",
    initialScheduledDate: new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
    ), // 1 week from now
    initialAutoLike: true,
  },
};

export const LongContent: Story = {
  args: {
    initialContent:
      "This is a very long tweet that exceeds the character limit. Twitter has a 280 character limit for tweets, and this content is designed to demonstrate how the PostEditor component handles content that goes beyond that limit. The character counter should turn yellow when approaching the limit and red when exceeding it. #TooLong #CharacterLimit #TwitterTips #SocialMediaMarketing #ContentCreation #DigitalMarketing #SocialMediaStrategy",
  },
};
