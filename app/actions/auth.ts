"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ActionResult, actionError, actionSuccess } from "@/lib/actions";

// Server actions for authentication with email/password and Google

export async function login(
  formData: { email: string; password: string }
): Promise<ActionResult<void>> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        return actionError("Invalid email or password");
      }
      return actionError("Unable to sign in. Please try again.");
    }
  } catch {
    return actionError("Unable to sign in. Please try again.");
  }

  redirect("/dashboard");
}

export async function signup(
  formData: { email: string; password: string }
): Promise<ActionResult<void>> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      if (error.message.includes("already registered")) {
        return actionError("An account with this email already exists");
      }
      return actionError("Unable to create account. Please try again.");
    }

    return actionSuccess(undefined, "Check your email to confirm your account");
  } catch {
    return actionError("Unable to create account. Please try again.");
  }
}

export async function logout(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function signInWithGoogle(): Promise<ActionResult<{ url: string }>> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      return actionError("Unable to sign in with Google. Please try again.");
    }

    if (!data.url) {
      return actionError("Unable to sign in with Google. Please try again.");
    }

    return actionSuccess({ url: data.url });
  } catch {
    return actionError("Unable to sign in with Google. Please try again.");
  }
}
