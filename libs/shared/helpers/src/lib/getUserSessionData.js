import { getSession as _getSession } from 'next-auth/client';

export default async function getUserSessionData(
  context,
  getSession = _getSession
) {
  if (!context) {
    // eslint-disable-next-line
    console.error(`missing required field: context`);

    return undefined;
  }

  const session = await getSession(context);

  return {
    isUserSignedIn: Boolean(session?.user.email),
    userSessionData: session?.user,
  };
}
