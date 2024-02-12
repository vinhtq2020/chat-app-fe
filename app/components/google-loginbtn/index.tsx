"use client";
import { signIn, signOut, useSession } from "next-auth/react"

export const GoogleLoginBtn = () => {
    const { data: session } = useSession()
    if (session && session.user) {
        console.log(session);
        return (<button onClick={()=> signOut()}>
            Sign Out with google
        </button>)
    }

    return (<button onClick={() => signIn("google")}>
        Sign In with google
    </button>)
}