export interface AmplifyGlobal {
    __AMPLIFY_CONFIGURED__?: boolean;
    amplify?: unknown;
}

declare global {
    // eslint-disable-next-line no-var
    var __AMPLIFY_CONFIGURED__: boolean | undefined;

    interface Window extends AmplifyGlobal {}

    namespace NodeJS {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface Global extends AmplifyGlobal {}
    }
}

export {};
