"use client";

import React from "react";
import { Authenticator, View, Heading, useTheme } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "@assets/styles/amplify/authenticator.scss";
import { signUp } from "aws-amplify/auth";
import { configureI18n, formFields } from "@domain/core";
import { userNameService } from "@domain/models/userName";

configureI18n();

export default function Authentication() {
    const services = {
        async handleSignUp(formData: Parameters<typeof signUp>[0]) {
            const result = await signUp(formData);
            try {
                if (!result.userId) throw new Error("User ID manquant");
                await userNameService.create({
                    id: result.userId,
                    userName: formData.username,
                });
            } catch (err) {
                console.error("Erreur création pseudo", err);
            }
            return result;
        },
    };

    const components = {
        SignIn: {
            Header() {
                const { tokens } = useTheme();
                return (
                    <View textAlign="center" paddingTop={tokens.space.large}>
                        <Heading level={3}>
                            <img
                                alt="Peur de la Conduite — logo"
                                src="/img/brand/Brand-Logo.svg"
                                // width="140px"
                                height="auto"
                                className="auth-logo"
                            />
                        </Heading>
                    </View>
                );
            },
        },
        SignUp: {
            Header() {
                const { tokens } = useTheme();
                return (
                    <View textAlign="center" paddingTop={tokens.space.large}>
                        <Heading level={3}>
                            <img
                                alt="Peur de la Conduite — logo"
                                src="/img/brand/Brand-Logo.svg" // chemin de ton logo
                                // width="140px"
                                height="auto"
                                className="auth-logo"
                            />
                        </Heading>
                    </View>
                );
            },
        },
    };

    return <Authenticator components={components} formFields={formFields} services={services} />;
}
