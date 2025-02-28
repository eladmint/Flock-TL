import type { Meta, StoryObj } from "@storybook/react";
import Header from "../components/layout/Header";
import { BrowserRouter } from "react-router-dom";

const meta = {
  title: "Layout/Header",
  component: Header,
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
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithNotifications: Story = {
  args: {
    notifications: 5,
  },
};

export const NoNotifications: Story = {
  args: {
    notifications: 0,
  },
};

export const CustomUser: Story = {
  args: {
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
  },
};
