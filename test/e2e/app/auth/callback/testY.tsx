"use client";
import { generateClient } from "aws-amplify/data";
import ConnectItem from "@app/auth/callback/ConnectItem";

const client = generateClient();

// route auth/callback
export default function Test() {
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
            console.log("OK:", res);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            {/* ⬇️ On n'affiche plus ConnectForm directement ici */}
            <section className="section">
                <div className="fixed-menu"></div>
                <div className="fixed-menu"></div>

                <div className="post-content__content">
                    {/* Bouton qui requiert la connexion */}
                    <ConnectItem>
                        <nav className="connect">
                            <div className="group_link-submenu connection nav-padding">
                                <button
                                    aria-label="Page Se connecter"
                                    className="head-link"
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
                                    <div className="nav-icon">
                                        <svg
                                            width="18"
                                            height="18"
                                            fill="none"
                                            aria-hidden="true"
                                            viewBox="0 0 18 18"
                                        >
                                            <path
                                                d="M8.94406 9.71053C11.6314 9.71053 13.81 7.53675 13.81 4.85526C13.81 2.17378 11.6314 0 8.94406 0C6.25668 0 4.07812 2.17378 4.07812 4.85526C4.07812 7.53675 6.25668 9.71053 8.94406 9.71053Z"
                                                className="icon-color"
                                            />
                                            <path
                                                d="M13.6105 10.6578H11.4742C10.8808 10.9736 9.73355 11.171 9.02146 11.171C8.26981 11.171 7.16212 10.9736 6.56872 10.6578H4.35333C2.81047 10.6578 1.62366 11.6052 1.10938 12.9078C2.49399 15.9078 5.50058 17.9999 9.02146 17.9999C12.5423 17.9999 15.5885 15.9078 16.9336 12.9078C16.3006 11.5657 15.1533 10.6578 13.6105 10.6578Z"
                                                className="icon-color"
                                            />
                                        </svg>
                                    </div>
                                    <span className="nav-link show-link">Test GraphQL</span>
                                </button>
                            </div>
                        </nav>
                    </ConnectItem>

                    <div className="fixed-menu"></div>

                    {/* Bouton public (API key) — pas besoin de connexion */}
                    <nav className="connect">
                        <div className="group_link-submenu connection nav-padding">
                            <button
                                aria-label="Charger Todo public"
                                className="head-link"
                                onClick={load}
                            >
                                <div className="nav-icon">
                                    <svg
                                        width="18"
                                        height="18"
                                        fill="none"
                                        aria-hidden="true"
                                        viewBox="0 0 18 18"
                                    >
                                        <path
                                            d="M8.94406 9.71053C11.6314 9.71053 13.81 7.53675 13.81 4.85526C13.81 2.17378 11.6314 0 8.94406 0C6.25668 0 4.07812 2.17378 4.07812 4.85526C4.07812 7.53675 6.25668 9.71053 8.94406 9.71053Z"
                                            className="icon-color"
                                        />
                                        <path
                                            d="M13.6105 10.6578H11.4742C10.8808 10.9736 9.73355 11.171 9.02146 11.171C8.26981 11.171 7.16212 10.9736 6.56872 10.6578H4.35333C2.81047 10.6578 1.62366 11.6052 1.10938 12.9078C2.49399 15.9078 5.50058 17.9999 9.02146 17.9999C12.5423 17.9999 15.5885 15.9078 16.9336 12.9078C16.3006 11.5657 15.1533 10.6578 13.6105 10.6578Z"
                                            className="icon-color"
                                        />
                                    </svg>
                                </div>
                                <span className="nav-link show-link">Charger Todo public</span>
                            </button>
                        </div>
                    </nav>

                    <div className="fixed-menu"></div>
                </div>
            </section>
        </>
    );
}
