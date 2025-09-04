"use client";
import { useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useUserNameForm } from "@ui/models/userName/hooks";

// route auth/callback
export default function ConnectForm() {
    const { user } = useAuthenticator();
    const manager = useUserNameForm(null);

    useEffect(() => {
        if (user) {
            void manager.refresh(); // 🔄 charge/rafraîchit au montage et quand l'user change
        }
    }, [user, manager]);

    if (!user) return <Authenticator />;
    return null;
}
