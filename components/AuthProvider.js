import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Navigate to CompletedProfileScreen if the user is authenticated
                navigation.navigate('CompletedProfile');
            }
        });

        return () => unsubscribe();
    }, [navigation]);

    const register = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // After successful registration, redirect to CompletedProfileScreen
            navigation.navigate('CompletedProfile');
        } catch (error) {
            console.error('Error registering:', error.message);
        }
    };

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // After successful login, redirect to CompletedProfileScreen
            navigation.navigate('CompletedProfile');
        } catch (error) {
            console.error('Error logging in:', error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, register, login }}>
            {children}
        </AuthContext.Provider>
    );
};
