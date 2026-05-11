import { NextRequest, NextResponse } from "next/server";

const ADMIN_USERNAME = "admin";

export function proxy(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD || "12345";

  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Area"',
      },
    });
  }

  const [scheme, encoded] = authHeader.split(" ");

  if (scheme !== "Basic" || !encoded) {
    return new NextResponse("Invalid authentication", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Area"',
      },
    });
  }

  const decoded = atob(encoded);
  const separatorIndex = decoded.indexOf(":");

  const username = decoded.slice(0, separatorIndex);
  const password = decoded.slice(separatorIndex + 1);

  const isValid = username === ADMIN_USERNAME && password === adminPassword;

  if (!isValid) {
    return new NextResponse("Invalid username or password", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/booking-status/:path*",
    "/api/booking-delete/:path*",
  ],
};