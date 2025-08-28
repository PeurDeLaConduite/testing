//ROUTE=>   http://localhost:3000/auth/callback

"use client";

import AuthProvider from "@src/app/Authentication/auth-provider";
import Comp from "./Comp";

// route auth/callback
export default function Page() {
    return (
        <AuthProvider>
            <Comp />
        </AuthProvider>
    );
}
