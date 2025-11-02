import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        // expoClientId: 'YOUR_EXPO_CLIENT_ID',
        iosClientId: '671521209301-0b79djjvi9lm5tjo9bvniktldm8qanct.apps.googleusercontent.com',
        androidClientId: '671521209301-6i3dqbdikrnk7j1mbrejgt0561oca9he.apps.googleusercontent.com',
        // webClientId: 'YOUR_WEB_CLIENT_ID',
        redirectUri: AuthSession.makeRedirectUri({
            useProxy: true,
        }),
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            // Fetch user data from Google API
            fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${authentication.accessToken}` },
            })
                .then(res => res.json())
                .then(data => setUser(data))
                .catch(error => console.error(error));
        }
    }, [response]);

    const signInWithGoogle = () => {
        promptAsync();
    };

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);




// import React, { createContext, useContext, useState, useEffect } from 'react';
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';

// WebBrowser.maybeCompleteAuthSession();

// const AuthContext = createContext({
//     user: null,
//     signInWithGoogle: () => {}
// });

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     const [request, response, promptAsync] = Google.useAuthRequest({
//         clientId: {
//             androidClientId: '524823735896-8p2o5v4a6lpdngdvujflsh4ogbn1kk0q.apps.googleusercontent.com',
//             iosClientId: '524823735896-hqua7e7v0jebfopalheq0kel4136tf2e.apps.googleusercontent.com'
//         },
//         scopes: ['profile', 'email'],
//         redirectUri: 'https://7e5d-91-192-129-50.ngrok-free.app', // замініть на ваш ngrok URL
//     });

//     useEffect(() => {
//         if (response?.type === 'success') {
//             const { authentication } = response;
//             console.log(authentication.accessToken);
//             setUser(authentication.accessToken); // або збережіть необхідну інформацію користувача
//         }
//     }, [response]);

//     const signInWithGoogle = async () => {
//         promptAsync();
//     };

//     return (
//         <AuthContext.Provider value={{ user, signInWithGoogle }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default function useAuth() {
//     return useContext(AuthContext);
// }

// export { AuthProvider };
