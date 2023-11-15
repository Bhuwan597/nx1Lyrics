import { NextResponse } from "next/server";
import verifyToken from "../utils/verifyToken";
import { cookies } from "next/headers";

export default async function middleware(request) {
  const path = request.nextUrl.pathname;
  if (path.startsWith("/admin/dashboard")) {
    if (!cookies().get("jwt"))
      return NextResponse.redirect(new URL("/admin/login", request.url));
    try {
      let jwtToken = cookies().get("jwt").value;
      const decoded = await verifyToken(jwtToken);
      if (!decoded)
        return NextResponse.redirect(new URL("/admin/login", request.url));
    } catch (error) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }
  if (path === "/admin/login" && cookies().get("jwt")) {
    try {
      let jwtToken = cookies().get("jwt").value;
      const decoded = await verifyToken(jwtToken);
      if (decoded)
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } catch (error) {}
  }
  if (path.startsWith("/api/user")) {
    if(path === '/api/user/login' || path === '/api/user/logout') return console.log('Login or logout is called')
    const BearerToken = await request.headers.get("authorization");
    if (!BearerToken) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }
    try {
      const BearerTokenValue = BearerToken.split(" ")[1];
      const decoded = await verifyToken(BearerTokenValue);
      if (!decoded.id) {
      }
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
  }
}
export const config = {
  matcher: ["/api/user/:path*", "/admin/:path*"],
};
