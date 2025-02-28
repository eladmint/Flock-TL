import { createClient } from '@supabase/supabase-js';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';

// Create a custom hook to get Supabase client with Auth0 token
export function useSupabaseClient() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [supabaseClient, setSupabaseClient] = useState(null);
  
  useEffect(() => {
    const initializeSupabase = async () => {
      // Create basic Supabase client
      const baseClient = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY
      );
      
      // If user is authenticated with Auth0, add the token to Supabase requests
      if (isAuthenticated) {
        try {
          // Get Auth0 access token
          const token = await getAccessTokenSilently();
          
          // Create new Supabase client with Auth0 token in headers
          const authClient = createClient(
            import.meta.env.VITE_SUPABASE_URL,
            import.meta.env.VITE_SUPABASE_ANON_KEY,
            {
              global: {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            }
          );
          
          setSupabaseClient(authClient);
        } catch (error) {
          console.error('Failed to get Auth0 token:', error);
          setSupabaseClient(baseClient);
        }
      } else {
        setSupabaseClient(baseClient);
      }
    };
    
    initializeSupabase();
  }, [isAuthenticated, getAccessTokenSilently]);
  
  return supabaseClient;
}

// Create a context to provide the Supabase client throughout the app
const SupabaseContext = createContext(null);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const supabaseClient = useSupabaseClient();
  
  return (
    <SupabaseContext.Provider value={supabaseClient}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  return useContext(SupabaseContext);
}
