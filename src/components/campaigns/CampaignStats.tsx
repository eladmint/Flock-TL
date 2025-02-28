import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  MessageSquare,
  Repeat,
  Heart,
  BarChart3,
  TrendingUp,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  description?: string;
}

const StatCard = ({
  title = "Stat",
  value = "0",
  change = 0,
  icon = <BarChart3 className="h-4 w-4" />,
  description = "Stat description",
}: StatCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center pt-1">
          {change !== 0 && (
            <span
              className={`flex items-center text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}
            >
              {isPositive ? (
                <ArrowUpRight className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownRight className="mr-1 h-3 w-3" />
              )}
              {Math.abs(change)}%
            </span>
          )}
          <span className="text-xs text-muted-foreground ml-2">
            {description}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

interface EngagementMetricProps {
  title: string;
  value: number;
  total: number;
  color?: string;
}

const EngagementMetric = ({
  title = "Metric",
  value = 0,
  total = 100,
  color = "bg-blue-500",
}: EngagementMetricProps) => {
  const percentage = Math.min(100, Math.round((value / total) * 100)) || 0;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-sm text-muted-foreground">
          {value}/{total}
        </span>
      </div>
      <Progress value={percentage} className={`h-2 ${color}`} />
    </div>
  );
};

interface CampaignStatsProps {
  campaignName?: string;
  dateRange?: string;
  followers?: number;
  followersChange?: number;
  impressions?: number;
  impressionsChange?: number;
  engagement?: number;
  engagementChange?: number;
  clicks?: number;
  clicksChange?: number;
  engagementMetrics?: {
    likes: number;
    retweets: number;
    replies: number;
    totalPosts: number;
  };
}

const CampaignStats = ({
  campaignName = "Summer Campaign",
  dateRange = "Last 30 days",
  followers = 12453,
  followersChange = 5.2,
  impressions = 45678,
  impressionsChange = 12.3,
  engagement = 3.8,
  engagementChange = -0.5,
  clicks = 1234,
  clicksChange = 7.8,
  engagementMetrics = {
    likes: 876,
    retweets: 234,
    replies: 123,
    totalPosts: 45,
  },
}: CampaignStatsProps) => {
  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{campaignName}</h2>
            <p className="text-sm text-muted-foreground">{dateRange}</p>
          </div>
          <div className="flex space-x-2">
            <select className="bg-white border rounded-md px-3 py-1 text-sm">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
              <option>Custom range</option>
            </select>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Followers"
                value={followers.toLocaleString()}
                change={followersChange}
                icon={<Users className="h-4 w-4" />}
                description="Total followers"
              />
              <StatCard
                title="Impressions"
                value={impressions.toLocaleString()}
                change={impressionsChange}
                icon={<TrendingUp className="h-4 w-4" />}
                description="Total impressions"
              />
              <StatCard
                title="Engagement Rate"
                value={`${engagement}%`}
                change={engagementChange}
                icon={<BarChart3 className="h-4 w-4" />}
                description="Avg. engagement"
              />
              <StatCard
                title="Link Clicks"
                value={clicks.toLocaleString()}
                change={clicksChange}
                icon={<ArrowUpRight className="h-4 w-4" />}
                description="Total clicks"
              />
            </div>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Engagement Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <EngagementMetric
                  title="Likes"
                  value={engagementMetrics.likes}
                  total={engagementMetrics.totalPosts * 50}
                  color="bg-red-500"
                />
                <EngagementMetric
                  title="Retweets"
                  value={engagementMetrics.retweets}
                  total={engagementMetrics.totalPosts * 20}
                  color="bg-green-500"
                />
                <EngagementMetric
                  title="Replies"
                  value={engagementMetrics.replies}
                  total={engagementMetrics.totalPosts * 15}
                  color="bg-blue-500"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Engagement Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                    <Heart className="h-8 w-8 text-red-500 mb-2" />
                    <span className="text-2xl font-bold">
                      {engagementMetrics.likes}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Total Likes
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                    <Repeat className="h-8 w-8 text-green-500 mb-2" />
                    <span className="text-2xl font-bold">
                      {engagementMetrics.retweets}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Total Retweets
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                    <MessageSquare className="h-8 w-8 text-blue-500 mb-2" />
                    <span className="text-2xl font-bold">
                      {engagementMetrics.replies}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Total Replies
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">
                    Top Performing Posts
                  </h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-sm">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. #TwitterCampaign
                            </p>
                            <div className="flex items-center mt-2 space-x-4">
                              <span className="flex items-center text-xs text-muted-foreground">
                                <Heart className="h-3 w-3 mr-1 text-red-500" />{" "}
                                {Math.floor(Math.random() * 100)}
                              </span>
                              <span className="flex items-center text-xs text-muted-foreground">
                                <Repeat className="h-3 w-3 mr-1 text-green-500" />{" "}
                                {Math.floor(Math.random() * 50)}
                              </span>
                              <span className="flex items-center text-xs text-muted-foreground">
                                <MessageSquare className="h-3 w-3 mr-1 text-blue-500" />{" "}
                                {Math.floor(Math.random() * 20)}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {i} day{i !== 1 ? "s" : ""} ago
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audience" className="space-y-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-center h-64 border rounded-lg bg-gray-50">
                  <p className="text-muted-foreground">
                    Audience demographic data visualization would appear here
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Top Locations</h3>
                    <div className="space-y-2">
                      {[
                        "United States",
                        "United Kingdom",
                        "Canada",
                        "Australia",
                        "Germany",
                      ].map((country, i) => (
                        <div
                          key={country}
                          className="flex justify-between items-center"
                        >
                          <span>{country}</span>
                          <span className="text-sm text-muted-foreground">
                            {40 - i * 5}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Age Distribution
                    </h3>
                    <div className="space-y-2">
                      {["18-24", "25-34", "35-44", "45-54", "55+"].map(
                        (age, i) => (
                          <div
                            key={age}
                            className="flex justify-between items-center"
                          >
                            <span>{age}</span>
                            <span className="text-sm text-muted-foreground">
                              {30 - Math.abs(i - 2) * 5}%
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CampaignStats;
