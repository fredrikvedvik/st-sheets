import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
} from "firebase/auth";
import { firebaseConfig } from "../config";

export const app = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(app);

export class Auth {
    get authenticated() {
        return this._loggedIn === true;
    }

    private _loggedIn: boolean | null = null;
    setLoggedIn(value: boolean) {
        this._loggedIn = value;
        for (const hook of this._loginHooks) {
            hook();
        }
    }

    private _loginHooks: (() => any)[] = [];
    onStateUpdate(hook: () => any) {
        this._loginHooks.push(hook);
    }

    get loading() {
        return this._loggedIn === null;
    }

    login() {
        signInWithPopup(firebaseAuth, new GoogleAuthProvider());
    }

    async getToken() {
        if (!this.authenticated) {
            return null;
        }
        return (await firebaseAuth.currentUser?.getIdToken()) ?? null;
    }
}

const auth = new Auth();

onAuthStateChanged(firebaseAuth, (u) => {
    if (u !== null) {
        auth.setLoggedIn(true);
    } else {
        auth.setLoggedIn(false);
    }
});

export default auth;
