// require then initialize
const firebaseClient = require('firebase/app');
firebaseClient.initializeApp(
  JSON.parse(process.env.FIREBASE_CLIENT_CREDENTIALS)
);

const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

// initialized elsewhere, just need to require it and thats it
const firebaseAdmin = require('firebase-admin');

const userSignUp = async (userDetails) => {
  return firebaseAdmin
    .auth()
    .createUser({
      email: userDetails.email,
      password: userDetails.password,
      emailVerified: true,
    })
    .then(async (userRecord) => {
      // Set a "cusotm claim" or authorization/role data
      firebaseAdmin
        .auth()
        .setCustomUserClaims(userRecord.uid, {
          admin: false,
          regularUser: true,
        })
        .then(() => {
          console.log('Set default claims to the new user');
        });
      return userRecord;
    })
    .catch((error) => {
      console.log(`Internal singup function error is:\n ${error}`);
      return { error: error };
    });
};

// const userSignIn = async () => {};

module.exports = {
  userSignUp,
};
