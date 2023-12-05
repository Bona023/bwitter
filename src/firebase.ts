import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCwGfe1ZCYbhr0LdFglNRDQKyxXKoDkpWk",
    authDomain: "bwitter-reloaded.firebaseapp.com",
    projectId: "bwitter-reloaded",
    storageBucket: "bwitter-reloaded.appspot.com",
    messagingSenderId: "769008180584",
    appId: "1:769008180584:web:42cb4822c075e9a919cadd",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
