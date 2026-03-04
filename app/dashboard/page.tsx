import { createClient } from "@/utils/supabase/server";
import { DashboardClient } from "./components/dashboard-client";

interface DashboardItem {
  id: string;
  title: string;
  description: string;
  date: string;
  venues: string[];
  type: string;
}

interface SearchParams {
  search?: string;
  type?: string;
}

async function getDashboardItems(
  searchParams: SearchParams
): Promise<DashboardItem[]> {
  const supabase = await createClient();

  let query = supabase
    .from("events")
    .select("id, title, description, date, venues:venue, type")
    .order("date", { ascending: true });

  if (searchParams.search) {
    query = query.ilike("title", `%${searchParams.search}%`);
  }

  if (searchParams.type) {
    query = query.eq("type", searchParams.type);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching dashboard items:", error);
    return [];
  }

  return data ?? [];
}

async function getSportTypes(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select("type")
    .order("type");

  if (error) {
    console.error("Error fetching sport types:", error);
    return [];
  }

  const uniqueTypes = [...new Set(data?.map((item) => item.type) ?? [])];
  return uniqueTypes;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const [items, sportTypes] = await Promise.all([
    getDashboardItems(params),
    getSportTypes(),
  ]);

  return <DashboardClient items={items} sportTypes={sportTypes} />;
}
