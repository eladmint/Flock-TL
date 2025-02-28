import type { Meta, StoryObj } from "@storybook/react";
import DashboardOverview from "../components/dashboard/DashboardOverview";
import { BrowserRouter } from "react-router-dom";

const meta = {
  title: "Dashboard/DashboardOverview",
  component: DashboardOverview,
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
} satisfies Meta<typeof DashboardOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomUser: Story = {
  args: {
    userName: "Jane Smith",
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
