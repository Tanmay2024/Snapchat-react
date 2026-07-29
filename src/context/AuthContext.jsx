import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { ensureProfile, setPresence } from "../services/profileService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);

            if (user) {
                await ensureProfile(user);
                await setPresence(user.uid, true);
                const snap = await getDoc(doc(db, "users", user.uid));

                if (snap.exists()) {
                    setProfile(snap.data());
                } else {
                    setProfile(null);
                }
            } else {
                setProfile(null);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const logout = async () => { if (currentUser) await setPresence(currentUser.uid, false); return signOut(auth); };

    const value = {
        currentUser,
        profile,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
