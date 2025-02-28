import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Heart,
  Repeat,
  BarChart3,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change = 0, icon }: StatCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== null && (
          <div className="flex items-center mt-1">
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span
              className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}
            >
              {Math.abs(change)}% from last week
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface StatsOverviewProps {
  followers?: number;
  followersChange?: number;
  engagement?: number;
  engagementChange?: number;
  impressions?: number;
  impressionsChange?: number;
  retweets?: number;
  retweetsChange?: number;
}

const StatsOverview = ({
  followers = 12483,
  followersChange = 2.5,
  engagement = 3.2,
  engagementChange = -0.8,
  impressions = 48762,
  impressionsChange = 12.3,
  retweets = 843,
  retweetsChange = 5.7,
}: StatsOverviewProps) => {
  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Account Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Followers"
          value={followers.toLocaleString()}
          change={followersChange}
          icon={<Users className="w-5 h-5 text-blue-500" />}
        />
        <StatCard
          title="Engagement Rate"
          value={`${engagement}%`}
          change={engagementChange}
          icon={<Heart className="w-5 h-5 text-pink-500" />}
        />
        <StatCard
          title="Impressions"
          value={impressions.toLocaleString()}
          change={impressionsChange}
          icon={<BarChart3 className="w-5 h-5 text-purple-500" />}
        />
        <StatCard
          title="Retweets"
          value={retweets.toLocaleString()}
          change={retweetsChange}
          icon={<Repeat className="w-5 h-5 text-green-500" />}
        />
      </div>
    </div>
  );
};

export default StatsOverview;
