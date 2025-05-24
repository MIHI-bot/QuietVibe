
// import { clerkMiddleware } from '@clerk/nextjs/server'; // Correct import
// // This example protects all routes including api/trpc routes
// // Please edit this to allow other routes to be public as needed.
// // https://clerk.com/docs/references/nextjs/auth-middleware for information about configuring ur Middleware
// export default clerkMiddleware({
//   publicRoutes: ['/', '/profile/id', '/api/webhook/clerk'],
//   ignoredRoutes: []
// });
 
// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
// };

// import { authMiddleware } from "@clerk/nextjs";
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// https://clerk.com/docs/references/nextjs/auth-middleware for information about configuring ur Middleware
// export default authMiddleware({publicRoutes:['/','/api/webhook/clerk'],ignoredRoutes:['api/webhook/clerk']});
 
// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
// };

// The Above code was chanbged to the code which is being written doesNotThrow.
// and this was made without watching the VideoColorSpace, so if error occired in future plase refer tot the video once. Thank You !


import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware#auth-middleware
export default clerkMiddleware({
 publicRoutes: ['/', '/profile/:id', '/api/webhook/clerk'],
  ignoredRoutes: [],
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico
     */
    "/((?!_next|static|favicon\\.ico).*)",
    "/",
  ],
};



