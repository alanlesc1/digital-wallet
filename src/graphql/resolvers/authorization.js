import { skip } from 'graphql-resolvers';

export const isAuthenticated = (_, args, { authUser, results }) =>
  authUser ? skip : results.create(results.NotAuthenticatedError);

export const hasRoleTrackPayManager = (_, args, { authUser, results }) =>
  authUser.userRoles.includes('TPM') ? skip : results.create(results.NotAuthorizedError);

export const hasRoleEventProducer = (_, args, { authUser, results }) =>
  authUser.userRoles.includes('PRO') ? skip : results.create(results.NotAuthorizedError);

export const hasRoleVendor = (_, args, { authUser, results }) =>
  authUser.userRoles.includes('VEN') ? skip : results.create(results.NotAuthorizedError);

export const hasRoleBuyer = (_, args, { authUser, results }) =>
  authUser.userRoles.includes('BUY') ? skip : results.create(results.NotAuthorizedError);

export const hasRolePOS = (_, args, { authUser, results }) =>
  authUser.userRoles.includes('POS') ? skip : results.create(results.NotAuthorizedError);
