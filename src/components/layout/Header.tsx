import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  HelpCircle,
  LogOut,
  Menu,
  PlusCircle,
  Settings,
  Twitter,
  User,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
  notifications?: number;
}

const Header = ({
  user = {
    name: "Twitter User",
    email: "user@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
  },
  onLogout = () => console.log("Logout clicked"),
  notifications = 3,
}: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", href: "/" },
    { label: "Campaigns", href: "/campaigns" },
  ];

  const handleCreateCampaign = () => {
    navigate("/create-campaign");
  };

  return (
    <header className="w-full h-[72px] bg-white border-b border-gray-200 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="flex items-center mr-8">
          <Twitter className="h-8 w-8 text-blue-500" />
          <span className="ml-2 text-xl font-bold">Flock</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-gray-600 hover:text-blue-500 font-medium"
            >
              {item.label}
            </Link>
          ))}
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-blue-500 font-medium flex items-center gap-1 px-0"
            onClick={handleCreateCampaign}
          >
            <PlusCircle className="h-4 w-4" />
            <span>New Campaign</span>
          </Button>
        </nav>
      </div>

      <div className="flex items-center space-x-3">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500"
                  variant="destructive"
                >
                  {notifications}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px]">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-auto">
              {notifications > 0 ? (
                Array.from({ length: notifications }).map((_, i) => (
                  <DropdownMenuItem key={i} className="py-3 cursor-pointer">
                    <div className="flex items-start gap-2">
                      <Twitter className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Campaign Update</p>
                        <p className="text-sm text-gray-500">
                          Your scheduled tweet was published successfully.
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {i + 1} hour{i !== 0 ? "s" : ""} ago
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="py-4 text-center text-gray-500">
                  No new notifications
                </div>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Help */}
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 pl-2 pr-3 py-1.5"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline font-medium">{user.name}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[220px]">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile Menu Button */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open Menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <SheetHeader>
              <SheetTitle className="flex items-center">
                <Twitter className="h-6 w-6 text-blue-500 mr-2" />
                Flock
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-gray-600 hover:text-blue-500 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                variant="ghost"
                className="justify-start font-medium text-gray-600 hover:text-blue-500 py-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleCreateCampaign();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                New Campaign
              </Button>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start font-medium text-gray-600 hover:text-blue-500"
                >
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-medium text-gray-600 hover:text-blue-500"
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-medium text-red-500"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLogout();
                  }}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Log out
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
