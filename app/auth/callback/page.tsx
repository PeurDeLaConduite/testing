"use client";
import { generateClient } from "aws-amplify/data";
import { signInWithRedirect } from "aws-amplify/auth";
const client = generateClient();

export default function Page() {
    async function load() {
        try {
            const res = await client.graphql({
                query: /* GraphQL */ `
                    query {
                        listTodos {
                            items {
                                id
                                content
                            }
                        }
                    }
                `,
                authMode: "apiKey",
            });
            console.log(res);
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <div className="post-content__post">
            <div className="post-content__content">
                <button
                    className="button-page__back flx-c"
                    onClick={() => signInWithRedirect()}
                >
                    Login
                </button>
                <button
                    className="button-page__back flx-c"
                    onClick={async () => {
                        try {
                            const res = await client.graphql({
                                query: `{ __typename }`,
                            });
                            console.log("OK:", res);
                        } catch (e) {
                            console.error("ERR:", e);
                        }
                    }}
                >
                    Test GraphQL
                </button>
                <button className="button-page__back flx-c" onClick={load}>
                    Charger Todo public
                </button>
            </div>
        </div>
    );
}
