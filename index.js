import apolloServer from './src/graphql';
import { expressjwt } from 'express-jwt';
import { serverPort, jwtSecret } from './src/config/environment';
import app from './src/app';
import { nodeEnv } from './src/config/environment';
import { initializeApp, applicationDefault } from 'firebase-admin/app';

const auth = expressjwt({
  secret: jwtSecret,
  algorithms: ["HS256"],
  credentialsRequired: false,
});

const start = async () => {
  // Init Firebase
  initializeApp({
    credential: applicationDefault(),
  });

  await apolloServer.start();
  app.use(auth);
  apolloServer.applyMiddleware({ app });

  try {
    await app.listen(serverPort);
    console.log(`Server (${nodeEnv.env}) started at port ${serverPort}`);
  } catch {
    console.log('Not able to start server');
  }
};

start();
