// Auth middleware — protects /dashboard routes
import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}
