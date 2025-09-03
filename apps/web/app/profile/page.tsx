// src/app/profile/page.tsx
import "@aws-amplify/ui-react/styles.css";
import "@assets/styles/amplify/authenticator.scss";
import Loader from "../../src/components/loader/Loader";

import UserProfileManager from "@src/components/Profile/UserProfileManager";
import UserNameManager from "@src/components/Profile/UserNameManager";
// import AuthProvider from "@src/auth/Authentication/auth-provider";
import SectionContainer from "../blog/SectionContainer";
import ConnectionIcon from "@components/svg_Icon/Connection";
import AuthGuard from "@src/auth/Authentication/AuthGuard";

export default function ConnectionPage() {
    return (
        // <AuthProvider>
        <AuthGuard fallback={<Loader />}>
            <SectionContainer id="profile" title="Espace personnel" icon={<ConnectionIcon />}>
                <div className="post-content__content">
                    <UserNameManager />
                    <UserProfileManager />
                </div>
            </SectionContainer>
        </AuthGuard>
        // </AuthProvider>
    );
}
