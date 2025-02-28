import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Edit, Filter, MoreHorizontal, Trash2, Twitter } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface Post {
  id: string;
  content: string;
  scheduledDate: Date;
  campaign: string;
  status: 'scheduled' | 'published' | 'failed';
  autoLike: boolean;
}

interface ScheduledPostsListProps {
  posts?: Post[];
  onEditPost?: (postId: string) => void;
  onDeletePost?: (postId: string) => void;
  onFilterChange?: (filter: string) => void;
}

const ScheduledPostsList: React.FC<ScheduledPostsListProps> = ({
  posts = [
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
    }
  ],
  onEditPost = (id) => console.log(`Edit post ${id}`),
  onDeletePost = (id) => console.log(`Delete post ${id}`),
  onFilterChange = (filter) => console.log(`Filter changed to ${filter}`)
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter posts based on search query, campaign, status, and date
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.campaign.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCampaign = campaignFilter === 'all' || post.campaign === campaignFilter;
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesDate = !selectedDate || 
                        format(post.scheduledDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
    
    return matchesSearch && matchesCampaign && matchesStatus && matchesDate;
  });

  // Get unique campaigns for filter dropdown
  const campaigns = Array.from(new Set(posts.map(post => post.campaign)));

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'scheduled':
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case 'published':
        return <Badge className="bg-green-500">Published</Badge>;
      case 'failed':
        return <Badge className="bg-red-500">Failed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Scheduled Posts</CardTitle>
          <Button variant="outline" onClick={() => onEditPost('new')}>
            Create Post
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Input 
            placeholder="Search posts..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button variant="ghost" size="icon" onClick={() => setSelectedDate(undefined)}>
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-2">
          <Select value={campaignFilter} onValueChange={setCampaignFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by campaign" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              {campaigns.map(campaign => (
                <SelectItem key={campaign} value={campaign}>{campaign}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>
          <TabsContent value="list" className="mt-4">
            <div className="space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <Twitter className="h-5 w-5 text-blue-400" />
                          <span className="font-medium">{post.campaign}</span>
                          {getStatusBadge(post.status)}
                          {post.autoLike && <Badge variant="outline" className="ml-2">Auto-Like</Badge>}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEditPost(post.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDeletePost(post.id)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="mt-2 text-sm text-gray-700">{post.content}</p>
                      <div className="mt-2 text-xs text-gray-500">
                        Scheduled for: {format(post.scheduledDate, 'PPP p')}
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No posts match your filters. Try adjusting your search criteria.
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="calendar" className="mt-4">
            <div className="text-center py-8 text-gray-500">
              Calendar view is under development. Please use list view for now.
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ScheduledPostsList;
