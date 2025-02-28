import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import {
  Calendar,
  Clock,
  Edit,
  MoreHorizontal,
  Plus,
  Trash2,
  Twitter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

interface Post {
  id: string;
  content: string;
  scheduledDate: string;
  status: "scheduled" | "published" | "draft";
  likes: number;
  retweets: number;
  autoLike: boolean;
}

interface CampaignPostsProps {
  campaignId?: string;
  campaignName?: string;
  posts?: Post[];
}

const CampaignPosts: React.FC<CampaignPostsProps> = ({
  campaignId = "campaign-123",
  campaignName = "Summer Product Launch",
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
}) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const filteredPosts =
    activeTab === "all"
      ? posts
      : posts.filter((post) => post.status === activeTab);

  const handleDeletePost = (postId: string) => {
    setPostToDelete(postId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In a real implementation, this would call an API to delete the post
    console.log(`Deleting post ${postToDelete}`);
    setIsDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not scheduled";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500">Published</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case "draft":
        return <Badge className="bg-gray-500">Draft</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">Campaign Posts</CardTitle>
          <CardDescription>Manage posts for {campaignName}</CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus size={16} />
              <span>New Post</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
              <DialogDescription>
                Create a new post for the {campaignName} campaign.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {/* This would be replaced with the actual PostEditor component */}
              <div className="p-4 border rounded-md bg-gray-50 text-center">
                <p>Post Editor Component Would Render Here</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Save Post</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6">
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <ScrollArea className="h-[500px] pr-4">
              {filteredPosts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                  <p>No posts found in this category</p>
                  <Button
                    variant="link"
                    className="mt-2"
                    onClick={() => setActiveTab("all")}
                  >
                    View all posts
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <Twitter size={18} className="text-blue-500" />
                            {getStatusBadge(post.status)}
                            {post.autoLike && (
                              <Badge
                                variant="outline"
                                className="text-xs border-red-300 text-red-500"
                              >
                                Auto-like
                              </Badge>
                            )}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem>
                                    <Edit size={14} className="mr-2" />
                                    Edit Post
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Post</DialogTitle>
                                  </DialogHeader>
                                  <div className="py-4">
                                    {/* This would be replaced with the actual PostEditor component */}
                                    <div className="p-4 border rounded-md bg-gray-50 text-center">
                                      <p>
                                        Post Editor Component Would Render Here
                                      </p>
                                      <p className="text-sm text-gray-500 mt-2">
                                        Editing post: {post.id}
                                      </p>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline">Cancel</Button>
                                    <Button>Save Changes</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <DropdownMenuItem
                                onClick={() => handleDeletePost(post.id)}
                                className="text-red-500"
                              >
                                <Trash2 size={14} className="mr-2" />
                                Delete Post
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <p className="text-sm my-3">{post.content}</p>

                        <div className="flex items-center text-xs text-gray-500 mt-4">
                          <div className="flex items-center mr-4">
                            <Calendar size={14} className="mr-1" />
                            {formatDate(post.scheduledDate)}
                          </div>

                          {post.status === "published" && (
                            <div className="flex gap-3">
                              <span className="flex items-center">
                                <span className="font-medium mr-1">
                                  {post.likes}
                                </span>{" "}
                                Likes
                              </span>
                              <span className="flex items-center">
                                <span className="font-medium mr-1">
                                  {post.retweets}
                                </span>{" "}
                                Retweets
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be
              undone.
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
    </Card>
  );
};

export default CampaignPosts;
