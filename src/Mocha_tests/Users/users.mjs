// // test.js
// import { strict as assert } from 'assert';
// import { expect } from 'chai';
// import { getDocs, where } from 'firebase/firestore';
// import { collection, query, orderBy } from 'firebase/firestore';

// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyCwa373ojIxpNADe7jzLgfZjhn1ppwxRTU',
//   authDomain: 'media-92083.firebaseapp.com',
//   projectId: 'media-92083',
//   storageBucket: 'media-92083.appspot.com',
//   messagingSenderId: '191907306625',
//   appId: '1:191907306625:web:c78ed78c671e74eb658180',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const collectionRef = collection(db, 'posts');

// const collectionUsersRef = collection(db, 'users');

// const userStateChanged = async () => {
//   const q = query(
//     collectionUsersRef,
//     where('uid', '==', 'A7zKRG4oFbPWFINPwQpSIOHXYyl1')
//   );
//   const querySnapshot = await getDocs(q);
//   const userData = querySnapshot.docs.map((doc) => doc.data());
//   if (userData.length > 0) {
//     setUserData(userData[0]);
//     setUser(auth.currentUser);
//   } else {
//     setUser(null);
//   }
//   return userData;
// };

// describe('Users tests', () => {
//   it('should get user data', async function () {
//     const userData = await userStateChanged();
//     expect(userData).to.be.an('array');
//   });
// });
