import {NextResponse} from "next/server";
import {getSessionCookie} from "better-auth/cookies";

const PUBLIC_ROUTES = ["/", "/jobs"];
const AUTH_ROUTES = ["/login", "/register"];
const RECRUITER_ROUTES = ["/post-job"];
const SEEKER_ROUTES = ["/saved-jobs"];

export async function proxy(request) {
  const {pathname} = request.nextUrl;

  const session = getSessionCookie(request);

  const isLoggedIn = !!session;

  if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/jobs", request.url));
    }
    return NextResponse.next();
  }

  const isProtected =
    RECRUITER_ROUTES.some((route) => pathname.startsWith(route)) ||
    SEEKER_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && isProtected) {
    try {
      const sessionRes = await fetch(
        new URL("/api/auth/get-session", request.url),
        {
          headers: {
            cookie: request.headers.get("cookie") || "",
          },
        },
      );

      const data = await sessionRes.json();
      const userRole = data?.user?.role;

      if (
        RECRUITER_ROUTES.some((route) => pathname.startsWith(route)) &&
        userRole !== "recruiter"
      ) {
        return NextResponse.redirect(new URL("/jobs", request.url));
      }

      if (
        SEEKER_ROUTES.some((route) => pathname.startsWith(route)) &&
        userRole !== "seeker"
      ) {
        return NextResponse.redirect(new URL("/jobs", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // run on all routes except Next.js internals
  ],
};
