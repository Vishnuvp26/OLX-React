import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut , User} from 'firebase/auth';
import { auth } from '../Firebase/Firebase';

export interface AuthContextType {
    user: User | null;
    logout: () => void;
  }

const AuthContext = createContext<AuthContextType | null>(null)

export const userAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
    };

    console.log('Firebase auth user : ', user);

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};