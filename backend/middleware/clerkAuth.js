
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

export const requireAuth = ClerkExpressWithAuth({
  // Optional: Add debug logging
  onError: (err) => console.error("Auth error:", err)
});
