dProps> = ({
  campaign = {
    id: "campaign-123",
    name: "Summer Product Launch",
    description: "Campaign for our new summer product line",
    startDate: new Date(2023, 5, 1),
    endDate: new Date(2023, 7, 31),
    stats: {
      followers: 12453,
      followersChange: 5.2,
      impressions: 45678,
      impressionsChange: 12.3,
      engagement: 3.8,
      engagementChange: -0.5,
      clicks: 1234,
      clicksChange: 7.8,
      engagementMetrics: {
        likes: 876,
        retweets: 234,
        replies: 123,
        totalPosts: 45,
      },
    },
  },
  posts = [
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
  ],
  onEditCampaign = () => {},
  onDeleteCampaign = () => {},
  onBackToList = () => {},
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Format date range for display
  const formatDateRange = () => {
    const startDate = campaign.startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const endDate = campaign.endDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${startDate} - ${endDate}`;
  };

  const handleDeleteCampaign = () => {
    onDeleteCampaign(campaign.id);
    setIsDeleteDialogOpen(false);
    onBackToList();
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-50">
      {/* Campaign Header */}
      <div className="bg-white p-6 shadow-sm">
        <div className="container mx-auto">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBackToList}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">{campaign.name}</h1>
          </div>

          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 mb-2">{campaign.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>{formatDateRange()}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Campaign
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-6 space-y-6">
        {/* Campaign Stats Section */}
        <CampaignStats
          campaignName={campaign.name}
          dateRange={formatDateRange()}
          followers={campaign.stats.followers}
          followersChange={campaign.stats.followersChange}
          impressions={campaign.stats.impressions}
          impressionsChange={campaign.stats.impressionsChange}
          engagement={campaign.stats.engagement}
          engagementChange={campaign.stats.engagementChange}
          clicks={campaign.stats.clicks}
          clicksChange={campaign.stats.clicksChange}
          engagementMetrics={campaign.stats.engagementMetrics}
        />

        {/* Campaign Posts Section */}
        <CampaignPosts
          campaignId={campaign.id}
          campaignName={campaign.name}
          posts={posts}
        />
      </div>

      {/* Edit Campaign Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
            <DialogDescription>
              Update the details for your campaign.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {/* Campaign form would be implemented here */}
            <div className="p-4 border rounded-md bg-gray-50 text-center">
              <p>Campaign Form Component Would Render Here</p>
              <p className="text-sm text-gray-500 mt-2">
                Editing campaign: {campaign.id}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Campaign Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Campaign</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this campaign? This action cannot
              be undone and will delete all associated posts.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCampaign}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignDashboard;
