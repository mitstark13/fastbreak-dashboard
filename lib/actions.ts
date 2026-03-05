// Consistent action result types and message handling

export type ActionResult<T = void> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string };

export function actionSuccess<T = void>(
  data: T,
  message?: string
): ActionResult<T> {
  return { success: true, data, message };
}

export function actionError(error: string): ActionResult<never> {
  return { success: false, error };
}

export async function safeAction<T>(
  fn: () => Promise<T>,
  errorMessage = "Something went wrong. Please try again."
): Promise<ActionResult<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    console.error("Action error:", error);
    return { success: false, error: errorMessage };
  }
}
