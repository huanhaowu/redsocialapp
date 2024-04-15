// // test.js
// import assert from 'assert';
// import sinon from 'sinon';
// import { setDoc, serverTimestamp } from 'firebase/firestore';
// import React, { useReducer } from 'react';

// const handleSubmitPost = async (text) => {
//   console.log('handleSubmitPost triggered');

//   if (text.current.value !== '') {
//     try {
//       await setDoc(postRef, {
//         documentId: document,
//         uid: user?.uid || userData?.uid,
//         logo: user?.photoURL,
//         name: user?.displayName || userData?.name,
//         email: user?.email || userData?.email,
//         text: text.current.value,
//         timestamp: serverTimestamp(),
//       });

//       text.current.value = '';
//     } catch (error) {
//       alert(error.message);
//       console.log(error.message);
//     }
//   } else {
//   }
// };

// describe('Posts tests', function () {
//   it('should create a post with only text', async function () {
//     // Mock the Firestore functions
//     const setDocMock = sinon.stub(setDoc, 'setDoc');
//     const serverTimestampMock = sinon.stub(serverTimestamp, 'serverTimestamp');

//     // Mock the user and userData context
//     const user = {
//       uid: 'A7zKRG4oFbPWFINPwQpSIOHXYyl1',
//       photoURL:
//         'https://lh3.googleusercontent.com/a/ACg8ocJ1D-KC9GDBOumi_VlsLjK4BN0OJ4D_mvEJqxkcHikv7Fi-MFo=s96-c',
//       displayName: 'UsuarioPrueba',
//       email: '1104326@est.intec.edu.do',
//     };
//     const userData = {
//       uid: 'A7zKRG4oFbPWFINPwQpSIOHXYyl1',
//       name: 'UsuarioPrueba',
//       email: '1104326@est.intec.edu.do',
//     };

//     // Mock the text ref
//     const text = { current: { value: 'Test post text' } };

//     // Call the function
//     await handleSubmitPost(text);

//     // Check that the Firestore functions were called with the correct arguments
//     assert(
//       setDocMock.calledWith(sinon.match.any, {
//         documentId: sinon.match.string,
//         uid: user.uid,
//         logo: user.photoURL,
//         name: user.displayName,
//         email: user.email,
//         text: text.current.value,
//         timestamp: serverTimestamp(),
//       })
//     );

//     // Restore the mocks
//     setDocMock.restore();
//     serverTimestampMock.restore();
//   });
// });

// test.js
import { strict as assert } from 'assert';
import { expect } from 'chai';
import { getDocs } from 'firebase/firestore';
import { collection, query, orderBy } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const collectionRef = collection(db, 'posts');

const getPosts = async () => {
  const q = query(collectionRef, orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map((doc) => doc.data());
  return posts;
};

// Call the function and prints all the posts
// getPosts().then((posts) => console.log(posts));

describe('Posts tests', () => {
  it('should return an array of posts', async function () {
    const posts = await getPosts();
    expect(posts).to.be.an('array');
  });
});
