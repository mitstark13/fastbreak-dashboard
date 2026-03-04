"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  venues: string[];
  type: string;
}

export async function createEvent(formData: EventFormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("events").insert({
    title: formData.title,
    description: formData.description,
    date: formData.date,
    venue: formData.venues,
    type: formData.type,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateEvent(id: string, formData: EventFormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("events")
    .update({
      title: formData.title,
      description: formData.description,
      date: formData.date,
      venue: formData.venues,
      type: formData.type,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteEvent(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
