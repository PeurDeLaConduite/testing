import { userAdapter } from '@services/adapters/userAdapter';

export async function createUser(input: { name: string }) {
  await userAdapter.save(input);
}
