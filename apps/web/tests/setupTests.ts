import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { TextEncoder, TextDecoder } from 'util';

vi.mock('aws-amplify', () => ({
  Auth: {
    signIn: vi.fn(),
    currentAuthenticatedUser: vi.fn(),
    signOut: vi.fn(),
  },
  API: {
    get: vi.fn(),
    post: vi.fn(),
    del: vi.fn(),
  },
}));

vi.mock('@aws-amplify/ui-react', () => ({
  Authenticator: ({ children }: any) => children,
}));

afterEach(() => {
  cleanup();
});

(global as any).URL.createObjectURL =
  (global as any).URL.createObjectURL || vi.fn();
Object.assign(global, { TextEncoder, TextDecoder });
