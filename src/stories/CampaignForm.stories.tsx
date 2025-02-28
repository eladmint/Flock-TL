import type { Meta, StoryObj } from "@storybook/react";
import CampaignForm from "../components/campaigns/CampaignForm";

const meta = {
  title: "Campaigns/CampaignForm",
  component: CampaignForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CampaignForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateNew: Story = {};

export const EditExisting: Story = {
  args: {
    isEditing: true,
    initialData: {
      name: "Summer Product Launch",
      description: "Campaign for our new summer product line",
      startDate: new Date(2023, 5, 1),
      endDate: new Date(2023, 7, 31),
      goals:
        "Increase brand awareness and drive sales for our new summer collection",
      targetAudience:
        "Fashion enthusiasts aged 18-35 interested in summer trends",
    },
  },
};
