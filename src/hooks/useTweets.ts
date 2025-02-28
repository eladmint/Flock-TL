import { useState, useEffect } from "react";
import { useSupabase } from "./useSupabaseAuth";
import { useAuth } from "@/context/Auth0Context";

export interface Tweet {
  id: string;
  content: string;
  campaign_id: string | null;
  scheduled_for: string | null;
  status: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  media_ids: string[] | null;
}

export function useTweets(campaignId?: string) {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const supabase = useSupabase();

  useEffect(() => {
    if (!user || !supabase) return;

    const fetchTweets = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from("tweets")
          .select("*")
          .eq("created_by", user.sub);

        if (campaignId) {
          query = query.eq("campaign_id", campaignId);
        }

        const { data, error } = await query.order("scheduled_for", {
          ascending: true,
        });

        if (error) throw error;
        setTweets(data || []);
      } catch (err) {
        console.error("Error fetching tweets:", err);
        setError("Failed to fetch tweets");
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();

    // Subscribe to changes
    const subscription = supabase
      .channel("tweets-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tweets" },
        fetchTweets,
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, campaignId, supabase]);

  const createTweet = async (
    tweetData: Omit<Tweet, "id" | "created_at" | "updated_at" | "created_by">,
  ) => {
    if (!user || !supabase) throw new Error("User not authenticated");

    try {
      const { data, error } = await supabase
        .from("tweets")
        .insert({
          ...tweetData,
          created_by: user.sub,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error creating tweet:", err);
      throw err;
    }
  };

  const updateTweet = async (
    id: string,
    updates: Partial<Omit<Tweet, "id" | "created_at" | "created_by">>,
  ) => {
    if (!user || !supabase) throw new Error("User not authenticated");

    try {
      const { data, error } = await supabase
        .from("tweets")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("created_by", user.sub)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error updating tweet:", err);
      throw err;
    }
  };

  const deleteTweet = async (id: string) => {
    if (!user || !supabase) throw new Error("User not authenticated");

    try {
      const { error } = await supabase
        .from("tweets")
        .delete()
        .eq("id", id)
        .eq("created_by", user.sub);

      if (error) throw error;
      return true;
    } catch (err) {
      console.error("Error deleting tweet:", err);
      throw err;
    }
  };

  const getTweet = async (id: string) => {
    if (!supabase) throw new Error("Supabase client not initialized");

    try {
      const { data, error } = await supabase
        .from("tweets")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error fetching tweet:", err);
      throw err;
    }
  };

  return {
    tweets,
    loading,
    error,
    createTweet,
    updateTweet,
    deleteTweet,
    getTweet,
  };
}
