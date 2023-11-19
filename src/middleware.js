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
  if (path.startsWith("/api")) {
    if (path === "/api/user/login" || path === "/api/user/logout" || ( path ==='/api/user/create' && request.method === 'POST')) return
    if(path.startsWith('/api/lyrics') && (request.method === 'GET' || request.method === 'POST')) return
    if(path.startsWith('/api/feedbacks') && request.method === 'POST' ) return
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
      if (!decoded.payload.id) {
        return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
      }
      return
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
  }
}
export const config = {
  matcher: [
    "/admin/:path*",
    "/api/:path*",
  ],
};
