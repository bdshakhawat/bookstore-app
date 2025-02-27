// Copy from the Clerk docs and paste it into the middleware.js file.

import { authMiddleware } from '@clerk/nextjs';
// Allow public access to login page
export default authMiddleware({
  publicRoutes: ['/'], 
});
// Applies to all routes except static files
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

