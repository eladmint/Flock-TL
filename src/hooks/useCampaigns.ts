import { useState, useEffect } from "react";
import { useSupabase } from "./useSupabaseAuth";
import { useAuth } from "@/context/Auth0Context";

export interface Campaign {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  status: string;
  hashtags: string[];
}

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const supabase = useSupabase();

  useEffect(() => {
    if (!user || !supabase) return;

    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("campaigns")
          .select("*")
          .eq("created_by", user.sub)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setCampaigns(data || []);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError("Failed to fetch campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();

    // Subscribe to changes
    const subscription = supabase
      .channel("campaigns-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "campaigns" },
        fetchCampaigns,
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, supabase]);

  const createCampaign = async (
    campaignData: Omit<
      Campaign,
      "id" | "created_at" | "updated_at" | "created_by"
    >,
  ) => {
    if (!user || !supabase) throw new Error("User not authenticated");

    try {
      const { data, error } = await supabase
        .from("campaigns")
        .insert({
          ...campaignData,
          created_by: user.sub,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error creating campaign:", err);
      throw err;
    }
  };

  const updateCampaign = async (
    id: string,
    updates: Partial<Omit<Campaign, "id" | "created_at" | "created_by">>,
  ) => {
    if (!user || !supabase) throw new Error("User not authenticated");

    try {
      const { data, error } = await supabase
        .from("campaigns")
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
      console.error("Error updating campaign:", err);
      throw err;
    }
  };

  const deleteCampaign = async (id: string) => {
    if (!user || !supabase) throw new Error("User not authenticated");

    try {
      const { error } = await supabase
        .from("campaigns")
        .delete()
        .eq("id", id)
        .eq("created_by", user.sub);

      if (error) throw error;
      return true;
    } catch (err) {
      console.error("Error deleting campaign:", err);
      throw err;
    }
  };

  const getCampaign = async (id: string) => {
    if (!supabase) throw new Error("Supabase client not initialized");

    try {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error fetching campaign:", err);
      throw err;
    }
  };

  return {
    campaigns,
    loading,
    error,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    getCampaign,
  };
}
