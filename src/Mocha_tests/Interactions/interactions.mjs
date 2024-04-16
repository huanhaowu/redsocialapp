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

const getLikes = async (postId) => {
  const likesRef = collection(db, 'posts', postId, 'likes');
  const querySnapshot = await getDocs(likesRef);
  const likes = querySnapshot.docs.map((doc) => doc.data());
  return likes;
};

const getComments = async (postId) => {
  const commentsRef = collection(db, 'posts', postId, 'comments');
  const querySnapshot = await getDocs(commentsRef);
  const comments = querySnapshot.docs.map((doc) => doc.data());
  return comments;
};

describe('Interactions tests', function () {
  this.timeout(10000);

  it('should get all likes for all posts', async function () {
    const posts = await getPosts();
    for (let post of posts) {
      const likes = await getLikes(post.uid);
      //   getLikes(post.uid).then((likes) => console.log(likes));
      expect(likes).to.be.an('array');
    }
  });

  it('should get all comments for all posts', async function () {
    const posts = await getPosts();
    for (let post of posts) {
      const comments = await getComments(post.uid);
      //   getComments(post.uid).then((comments) => console.log(comments));
      expect(comments).to.be.an('array');
    }
  });
});
