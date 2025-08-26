//ROUTE=>   http://localhost:3000/auth/callback

"use client";

import AuthProvider from "@app/auth-provider";
import Test from "./testY";

// route auth/callback
export default function Page() {
    return (
        <AuthProvider>
            <Test />
        </AuthProvider>
    );
}
