import { NextRequest, NextResponse } from "next/server";

const ADMIN_USERNAME = "admin";

function unauthorized(message = "Authentication required") {
  return new NextResponse(message, {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Area"',
    },
  });
}

export function proxy(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error("ADMIN_PASSWORD is not set");
    return unauthorized("ADMIN_PASSWORD is not set");
  }

  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return unauthorized();
  }

  const encoded = authHeader.replace("Basic ", "");

  let decoded = "";

  try {
    decoded = atob(encoded);
  } catch {
    return unauthorized("Invalid authentication");
  }

  const separatorIndex = decoded.indexOf(":");

  if (separatorIndex === -1) {
    return unauthorized("Invalid authentication");
  }

  const username = decoded.slice(0, separatorIndex);
  const password = decoded.slice(separatorIndex + 1);

  const isValid = username === ADMIN_USERNAME && password === adminPassword;

  if (!isValid) {
    return unauthorized("Invalid username or password");
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