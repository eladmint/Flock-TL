import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

type Auth0ContextType = {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
};

const Auth0Context = createContext<Auth0ContextType | undefined>(undefined);

export function Auth0ProviderWithHistory({
  children,
}: {
  children: ReactNode;
}) {
  const domain =
    import.meta.env.VITE_AUTH0_DOMAIN || "dev-rr7gb1kntasyvasa.us.auth0.com";
  const clientId =
    import.meta.env.VITE_AUTH0_CLIENT_ID || "1C2m7j2kQBSFWf3Y3AXCQ70wFOdOAIXP";
  const redirectUri = window.location.origin + "/callback";

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: `https://${domain}/api/v2/`,
        scope: "openid profile email offline_access",
      }}
    >
      <Auth0ContextProvider>{children}</Auth0ContextProvider>
    </Auth0Provider>
  );
}

export function Auth0ContextProvider({ children }: { children: ReactNode }) {
  const {
    isAuthenticated,
    user,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          setToken(accessToken);
        } catch (error) {
          console.error("Error getting token", error);
        }
      }
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  const signIn = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: "twitter",
      },
    });
  };

  const signOut = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const value = {
    isAuthenticated,
    user,
    loading: isLoading,
    signIn,
    signOut,
  };

  return (
    <Auth0Context.Provider value={value}>{children}</Auth0Context.Provider>
  );
}

export function useAuth() {
  const context = useContext(Auth0Context);
  if (context === undefined) {
    throw new Error("useAuth must be used within an Auth0Provider");
  }
  return context;
}
