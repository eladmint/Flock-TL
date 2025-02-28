import type { Meta, StoryObj } from "@storybook/react";
import TwitterAuth from "../components/auth/TwitterAuth";

const meta = {
  title: "Auth/TwitterAuth",
  component: TwitterAuth,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TwitterAuth>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    error: "Authentication failed. Please try again.",
  },
};
