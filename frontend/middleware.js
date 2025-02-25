import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/'], // Add public routes here
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};