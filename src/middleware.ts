import { NextRequest, NextResponse } from "next/server";
import { checkAuthentication } from "./app/utils/auth";

export function middleware(request: NextRequest) {
    // check authentication
    let isLogin = checkAuthentication()
    
    if (request.nextUrl.pathname.startsWith('/auth')) {
        if (isLogin) {
            return NextResponse.rewrite(new URL("/", request.url))
        }
        return NextResponse.redirect(new URL("/", request.url))
    }

    if (!isLogin) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/profile"]
}