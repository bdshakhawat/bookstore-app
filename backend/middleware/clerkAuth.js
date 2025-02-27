// import { Clerk } from '@clerk/clerk-sdk-node';
// export const requireAuth = ClerkExpressWithAuth({});

// app.get("/books", requireAuth, async (req, res) => {
//   console.log(req.auth); // <-- Add this
// });

import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

export const requireAuth = ClerkExpressWithAuth({});