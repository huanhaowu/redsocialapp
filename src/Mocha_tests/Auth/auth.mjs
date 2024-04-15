import assert from 'assert';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCwa373ojIxpNADe7jzLgfZjhn1ppwxRTU',
  authDomain: 'media-92083.firebaseapp.com',
  projectId: 'media-92083',
  storageBucket: 'media-92083.appspot.com',
  messagingSenderId: '191907306625',
  appId: '1:191907306625:web:c78ed78c671e74eb658180',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

describe('Auth/Security tests', function () {
  it('should login with valid credentials', function (done) {
    const email = '1104326@est.intec.edu.do';
    const password = 'pruebaprueba';

    login(email, password)
      .then((user) => {
        assert(user, 'User should exist');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should fail to login with invalid credentials', function (done) {
    const email = '1104326@est.intec.edu.do';
    const password = 'invalidpassword';

    login(email, password)
      .then((user) => {
        done(new Error('Should not reach this point'));
      })
      .catch((err) => {
        assert(err, 'Error should exist');
        done();
      });
  });
});
