
// //----------------------------------------------------------------------------------------------------------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
// import { auth, db } from '../firebase';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import classNames from 'classnames';

// const LoginWithNickScreen = () => {
//     const [nickname, setNickname] = useState('');
//     const [password, setPassword] = useState('');
//     const [uploading, setUploading] = useState(false);
//     const [loadingDots, setLoadingDots] = useState(1);

//     const incompleteForm = !nickname || !password;

//     useEffect(() => {
//         let interval;
//         if (uploading) {
//             interval = setInterval(() => {
//                 setLoadingDots(prev => (prev % 3) + 1);
//             }, 500);
//         } else {
//             setLoadingDots(1);
//         }
//         return () => clearInterval(interval);
//     }, [uploading]);

//     const login = async () => {
//         try {
//             setUploading(true);

//             // Логування значень, які відправляються в запит
//             console.log('Nickname:', nickname);

//             // Виконання запиту до Firestore для пошуку користувача за нікнеймом
//             const userSnapshot = await getDocs(query(collection(db, 'users'), where('nickname', '==', nickname)));

//             if (userSnapshot.empty) {
//                 Alert.alert('Nickname not found');
//                 setUploading(false);
//                 return;
//             }

//             const userDoc = userSnapshot.docs[0];
//             const userData = userDoc.data();

//             const userCredential = await signInWithEmailAndPassword(auth, userData.email, password);

//             console.log('Logged in with:', userCredential.user.email);
//         } catch (error) {
//             Alert.alert(error.message);
//         } finally {
//             setUploading(false);
//         }
//     };

//     return (
//         <SafeAreaView>
//             <Text className="text-center p-4 font-bold text-custom-pink">
//                 Enter nickname
//             </Text>
//             <TextInput
//                 className="text-center text-xl pb-2"
//                 placeholder="Nickname"
//                 value={nickname}
//                 onChangeText={text => setNickname(text)}
//             />

//             <Text className="text-center p-4 font-bold text-custom-pink">
//                 Enter password
//             </Text>
//             <TextInput
//                 className="text-center text-xl pb-2"
//                 placeholder="Password"
//                 value={password}
//                 onChangeText={text => setPassword(text)}
//                 secureTextEntry
//             />

//             <TouchableOpacity
//                 disabled={incompleteForm}
//                 className={classNames("w-64 p-3 rounded-xl mt-4 self-center", incompleteForm ? "bg-gray-400" : "bg-custom-pink")}
//                 onPress={login}
//             >
//                 <Text className="text-center text-white text-xl">
//                     {uploading ? `Loading${'.'.repeat(loadingDots)}` : "Sing in"}
//                 </Text>
//             </TouchableOpacity>
//         </SafeAreaView>
//     );
// };

// export default LoginWithNickScreen;




import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { XMarkIcon } from 'react-native-heroicons/outline';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if email is verified
      if (!user.emailVerified) {
        Alert.alert('Error', 'Please verify your email address before logging in.');
        await auth.signOut();
        return;
      }

      Alert.alert('Success', 'Logged in successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1" >
        <View className="flex-1 bg-gray-100" >

                <View className="p-5 border-b border-[#0C4F39] bg-white shadow-xs">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="rounded-full bg-gray-100 absolute top-4 left-5"
                    >
                        <XMarkIcon color="#0C4F39" height={32} width={32} />
                    </TouchableOpacity>

                    <View>
                        <Text className="font-bold text-center">Log in or sign up to order!</Text>
                    </View>
                </View>

            <View className="mx-4 top-3">
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholder="Enter your email"
                />
                <Text style={styles.label}>Password:</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholder="Enter your password"
                />
                <View className="border-b-3 bg-[#0C4F39] rounded-sm">
                    <Button title="Login" onPress={handleLogin} color="white"/>
                </View>
                
                
                <View className="flex-row items-center top-3">
                    <Text className="flex-1">Do you not have account?</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate("RegisterWithNick")}>
                        <Text className="text-[#0C4F39] right-1 text-xl">Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;
