import React, { useState } from "react";
import {
  PlusCircle,
  Calendar,
  Users,
  BarChart,
  Edit,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Campaign {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  postsCount: number;
  engagementRate: number;
}

interface CampaignsListProps {
  campaigns?: Campaign[];
  onCreateCampaign?: (campaign: Omit<Campaign, "id">) => void;
  onEditCampaign?: (campaign: Campaign) => void;
  onDeleteCampaign?: (id: string) => void;
  onSelectCampaign?: (id: string) => void;
}

const CampaignsList = ({
  campaigns = [
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
  ],
  onCreateCampaign = () => {},
  onEditCampaign = () => {},
  onDeleteCampaign = () => {},
  onSelectCampaign = () => {},
}: CampaignsListProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    setCampaignToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (campaignToDelete) {
      onDeleteCampaign(campaignToDelete);
      setCampaignToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full h-full overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Campaigns</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new Twitter campaign.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Campaign Name
                </label>
                <Input id="name" placeholder="Enter campaign name" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Input
                  id="description"
                  placeholder="Enter campaign description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="startDate" className="text-sm font-medium">
                    Start Date
                  </label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="endDate" className="text-sm font-medium">
                    End Date
                  </label>
                  <Input id="endDate" type="date" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button>Create Campaign</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((campaign) => (
          <Card
            key={campaign.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelectCampaign(campaign.id)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{campaign.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {campaign.description}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditCampaign(campaign);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleDeleteClick(campaign.id, e)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {format(campaign.startDate, "MMM d, yyyy")} -{" "}
                  {format(campaign.endDate, "MMM d, yyyy")}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Posts</p>
                    <p className="font-medium">{campaign.postsCount}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Engagement</p>
                    <p className="font-medium">{campaign.engagementRate}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCampaign(campaign.id);
                }}
              >
                View Campaign
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this campaign? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignsList;
