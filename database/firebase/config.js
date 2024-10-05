import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCNHIAYotNy6pq5bH7YF6uGjfMq96pYX38",
  authDomain: "compositiontools-db.firebaseapp.com",
  projectId: "compositiontools-db",
  storageBucket: "compositiontools-db.appspot.com",
  messagingSenderId: "398044584974",
  appId: "1:398044584974:web:0370267076e0ec4cfc305f",
  measurementId: "G-XBN55KY6M2"
};

const config = initializeApp(firebaseConfig);

export {
  config,
};
