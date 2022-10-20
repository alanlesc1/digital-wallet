import { skip } from 'graphql-resolvers';

export const isAuthenticated = (_, args, { authUser, results }) =>
  authUser ? skip : results.create(results.NotAuthenticatedError);
