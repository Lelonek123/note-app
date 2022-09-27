import { initializeApp } from "firebase/app";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    updateProfile,
} from "firebase/auth";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    setDoc,
    doc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDQlTw9EwHh1DJ5Thr6s2ApaD5MWDQeRCI",

    authDomain: "noote-app.firebaseapp.com",

    projectId: "noote-app",

    storageBucket: "noote-app.appspot.com",

    messagingSenderId: "1097144420656",

    appId: "1:1097144420656:web:d98437b122c8857c8660f5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await updateProfile(user, { displayName: username });
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            display_name: username,
            authProvider: "local",
            email,
            notes: [
                {
                    id: user.uid,
                    title: "Example note",
                    content: "Example content...",
                    tags: ["ExampleTag"],
                    timestamp: Date.now(),
                },
            ],
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};
