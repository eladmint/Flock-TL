import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../ui/tooltip";
import { format } from "date-fns";
import { CalendarIcon, Info, Twitter } from "lucide-react";

interface PostEditorProps {
  postId?: string;
  campaignId?: string;
  initialContent?: string;
  initialScheduledDate?: Date;
  initialAutoLike?: boolean;
  onSave?: (post: {
    id?: string;
    content: string;
    scheduledDate: Date | null;
    autoLike: boolean;
    campaignId: string;
  }) => void;
  onCancel?: () => void;
}

const PostEditor: React.FC<PostEditorProps> = ({
  postId,
  campaignId = "default-campaign",
  initialContent = "",
  initialScheduledDate = new Date(Date.now() + 86400000), // Default to tomorrow
  initialAutoLike = false,
  onSave = () => {},
  onCancel = () => {},
}) => {
  const [content, setContent] = useState(initialContent);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(
    initialScheduledDate,
  );
  const [autoLike, setAutoLike] = useState(initialAutoLike);
  const [charCount, setCharCount] = useState(initialContent.length);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const MAX_CHARS = 280; // Twitter character limit

  useEffect(() => {
    setCharCount(content.length);
  }, [content]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSave = () => {
    if (content.trim() === "") {
      alert("Please enter tweet content");
      return;
    }

    if (content.length > MAX_CHARS) {
      alert(`Tweet content exceeds maximum character limit of ${MAX_CHARS}`);
      return;
    }

    onSave({
      id: postId,
      content,
      scheduledDate,
      autoLike,
      campaignId,
    });
  };

  const getCharCountColor = () => {
    if (charCount > MAX_CHARS) return "text-red-500";
    if (charCount > MAX_CHARS - 20) return "text-amber-500";
    return "text-gray-500";
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Twitter className="h-5 w-5 text-blue-400" />
          {postId ? "Edit Tweet" : "Create New Tweet"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="content">Tweet Content</Label>
            <span className={`text-sm font-medium ${getCharCountColor()}`}>
              {charCount}/{MAX_CHARS}
            </span>
          </div>
          <Textarea
            id="content"
            placeholder="What's happening?"
            value={content}
            onChange={handleContentChange}
            className={`min-h-[120px] ${charCount > MAX_CHARS ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="scheduled-date">Schedule Date & Time</Label>
          <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                id="scheduled-date"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {scheduledDate ? (
                  format(scheduledDate, "PPP p")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={scheduledDate}
                onSelect={(date) => {
                  setScheduledDate(date);
                  setIsDatePickerOpen(false);
                }}
                initialFocus
              />
              <div className="p-3 border-t border-border">
                <div className="flex justify-between items-center">
                  <Label htmlFor="time">Time</Label>
                  <input
                    type="time"
                    id="time"
                    className="border rounded px-2 py-1 text-sm"
                    defaultValue={
                      scheduledDate ? format(scheduledDate, "HH:mm") : "12:00"
                    }
                    onChange={(e) => {
                      if (scheduledDate) {
                        const [hours, minutes] = e.target.value
                          .split(":")
                          .map(Number);
                        const newDate = new Date(scheduledDate);
                        newDate.setHours(hours, minutes);
                        setScheduledDate(newDate);
                      }
                    }}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center justify-between space-x-2 pt-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="auto-like"
              checked={autoLike}
              onCheckedChange={setAutoLike}
            />
            <Label htmlFor="auto-like" className="cursor-pointer">
              Auto-like when published
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Automatically like this tweet from your account when it's
                    published
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Tweet</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostEditor;
