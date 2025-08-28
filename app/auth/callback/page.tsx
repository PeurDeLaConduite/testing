//ROUTE=>   http://localhost:3000/auth/callback

"use client";

import AuthProvider from "@src/app/Authentication/auth-provider";

// route auth/callback
export default function Page() {
    return <AuthProvider />;
}
