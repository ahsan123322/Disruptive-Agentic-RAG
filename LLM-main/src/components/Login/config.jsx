
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {

  apiKey: "AIzaSyCpdaEWUatQEWUfo79mdXqrFzG8pow-lSE",

  authDomain: "lyzer-48909.firebaseapp.com",

  projectId: "lyzer-48909",

  storageBucket: "lyzer-48909.appspot.com",

  messagingSenderId: "331930313149",

  appId: "1:331930313149:web:79a785be45cbb21d74b2d4",

  measurementId: "G-VMH8320TWF"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export default app;
