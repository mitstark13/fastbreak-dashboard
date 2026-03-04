"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { ActionResult, actionError, actionSuccess } from "@/lib/actions";

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  venues: string[];
  type: string;
}

export async function createEvent(
  formData: EventFormData
): Promise<ActionResult<void>> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.from("events").insert({
      title: formData.title,
      description: formData.description,
      date: formData.date,
      venue: formData.venues,
      type: formData.type,
    });

    if (error) {
      return actionError("Unable to create event. Please try again.");
    }

    revalidatePath("/dashboard");
    return actionSuccess(undefined, "Event created successfully");
  } catch {
    return actionError("Unable to create event. Please try again.");
  }
}

export async function updateEvent(
  id: string,
  formData: EventFormData
): Promise<ActionResult<void>> {
  try {
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
      return actionError("Unable to update event. Please try again.");
    }

    revalidatePath("/dashboard");
    return actionSuccess(undefined, "Event updated successfully");
  } catch {
    return actionError("Unable to update event. Please try again.");
  }
}

export async function deleteEvent(id: string): Promise<ActionResult<void>> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) {
      return actionError("Unable to delete event. Please try again.");
    }

    revalidatePath("/dashboard");
    return actionSuccess(undefined, "Event deleted successfully");
  } catch {
    return actionError("Unable to delete event. Please try again.");
  }
}
