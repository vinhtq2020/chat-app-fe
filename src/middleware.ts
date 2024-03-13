import { NextRequest, NextResponse } from "next/server";
import { checkAuthentication } from "./app/utils/auth";

export function middleware(request: NextRequest) {
    let isLogin = checkAuthentication()
    if (isLogin) {
        return NextResponse.next()
    }
    return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
    matcher: ["/profile"]
}