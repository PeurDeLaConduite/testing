import "@aws-amplify/ui-react/styles.css";
import "@assets/styles/amplify/authenticator.scss";

import ProfileForm from "@/src/components/Profile/UserProfileManager";
import UserNameManager from "@components/Profile/UserNameManager";
import AuthProvider from "@src/app/Authentication/auth-provider";
import SectionContainer from "../blog/SectionContainer";
import ConnectionIcon from "../../src/components/svg_Icon/Connection";
export default function ConnectionPage() {
    return (
        <AuthProvider>
            <SectionContainer id="profile s1" title="Espace personnel" icon={<ConnectionIcon />}>
                <div className="post-content__content">
                    <UserNameManager />
                    <ProfileForm />
                </div>
            </SectionContainer>
        </AuthProvider>
    );
}
