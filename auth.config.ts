import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
 trustHost: true,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      const protectedPaths = ['/dashboard', '/seed', '/reset'];
      const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

      if (isProtected) {
        return isLoggedIn; // Allow only if logged in
      }

      // Redirect logged-in users away from login
      if (pathname === '/login' && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true; // Allow all other routes
    }
  },

  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

// import type { NextAuthConfig } from 'next-auth';
 
// export const authConfig = {
//  trustHost: true,
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/dashboard', nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [], // Add providers with an empty array for now
// } satisfies NextAuthConfig;