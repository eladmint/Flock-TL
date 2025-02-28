import type { Meta, StoryObj } from "@storybook/react";
import Home from "../components/home";
import { BrowserRouter } from "react-router-dom";

const meta = {
  title: "Pages/Home",
  component: Home,
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
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Authenticated: Story = {
  args: {
    isAuthenticated: true,
    userName: "Jane Smith",
  },
};

export const Unauthenticated: Story = {
  args: {
    isAuthenticated: false,
  },
};

export const AuthError: Story = {
  args: {
    isAuthenticated: false,
    authError: "Failed to authenticate with Twitter. Please try again.",
  },
};
