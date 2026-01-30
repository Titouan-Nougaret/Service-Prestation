import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

// Routes qui nécessitent d'être connecté
const protectedRoutes = ["/dashboard", "/admin", "/profile"];

// Routes de connexion/inscription (on redirige vers / si déjà connecté)
const authRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  // Récupérer le token depuis les cookies
  const cookie = request.cookies.get("session")?.value;
  const session = cookie ? await decrypt(cookie).catch(() => null) : null;

  // Rediriger vers /login si on tente d'accéder à une route protégée sans session
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // Rediriger vers / si on tente d'accéder à login/register avec une session active
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

// Configurer les paths sur lesquels le middleware doit s'exécuter
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
