import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Twitter } from "lucide-react";
import { useAuth } from "@/context/Auth0Context";
import { Link } from "react-router-dom";

interface TwitterAuthProps {
  onAuthenticate?: () => void;
  isLoading?: boolean;
  error?: string | null;
}

const TwitterAuth: React.FC<TwitterAuthProps> = ({
  onAuthenticate,
  isLoading: propIsLoading = false,
  error: propError = null,
}) => {
  const { signIn, loading: authLoading } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const isLoading = propIsLoading || authLoading;
  const error = propError;

  const handleAuthenticate = async () => {
    setIsAuthenticating(true);
    if (onAuthenticate) {
      onAuthenticate();
    } else {
      signIn();
    }
    setIsAuthenticating(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px] bg-white shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Twitter className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Connect to Twitter
          </CardTitle>
          <CardDescription>
            Authenticate with your Twitter account to start managing your
            campaigns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-gray-500">
            <p>
              Flock helps you create, schedule, and manage Twitter campaigns
              through an intuitive dashboard.
            </p>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600"
            onClick={handleAuthenticate}
            disabled={isLoading || isAuthenticating}
          >
            {isLoading || isAuthenticating ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <Twitter className="h-4 w-4" />
                <span>Connect with Twitter</span>
              </>
            )}
          </Button>
          <div className="text-xs text-center text-gray-500">
            By connecting, you agree to our{" "}
            <Link
              to="/terms-of-service"
              className="text-blue-500 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy-policy"
              className="text-blue-500 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TwitterAuth;
