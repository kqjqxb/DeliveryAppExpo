// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, Button, Alert, TouchableOpacity, RadioButton } from 'react-native';
// import { auth, db } from '../firebase';
// import { collection, query, where, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { useNavigation } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import classNames from 'classnames';

// const RegisterWithNickScreen = () => {
//     const [password, setPassword] = useState('');
//     const [nickname, setNickname] = useState('');
//     const [gender, setGender] = useState('male'); // New state for gender
//     const [uploading, setUploading] = useState(false);
//     const [loadingDots, setLoadingDots] = useState(1);
    
//     const navigation = useNavigation();

//     const incompleteForm = !nickname || !password || !gender;

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

//     const register = async () => {
//         if (!password || !nickname || !gender) {
//             Alert.alert('All fields are required');
//             return;
//         }

//         try {
//             const nicknameQuery = query(collection(db, 'users'), where('nickname', '==', nickname));
//             const nicknameExists = await getDocs(nicknameQuery);

//             if (!nicknameExists.empty) {
//                 Alert.alert('Nickname already taken');
//                 return;
//             }

//             const email = `${nickname}@example.com`; // Use nickname to create a fake email
//             console.log('Creating user with email:', email, 'and password:', password);
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             await setDoc(doc(db, 'users', user.uid), {
//                 email: user.email,
//                 nickname: nickname,
//                 gender: gender, // Save the selected gender
//             });

//             console.log(await getDoc(doc(db, 'users', user.uid)));
//             Alert.alert('Successfully registered');
//             navigation.navigate('Home'); // Redirect to HomeScreen
//         } catch (error) {
//             Alert.alert(error.message);
//         }
//     };

//     return (
//         <SafeAreaView>
//             <Text className="text-2xl font-bold pl-2 text-center">Registration</Text>
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
            
//             <Text className="text-center p-4 font-bold text-custom-pink">
//                 Select gender
//             </Text>
//             <View className="flex-row justify-center">
//                 <TouchableOpacity
//                     className={classNames("p-2", gender === 'male' ? "bg-custom-pink" : "bg-gray-300")}
//                     onPress={() => setGender('male')}
//                 >
//                     <Text className="text-white">Male</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     className={classNames("p-2", gender === 'female' ? "bg-custom-pink" : "bg-gray-300")}
//                     onPress={() => setGender('female')}
//                 >
//                     <Text className="text-white">Female</Text>
//                 </TouchableOpacity>
//             </View>
            
//             <TouchableOpacity
//                 disabled={incompleteForm}
//                 className={classNames("w-64 p-3 rounded-xl mt-4 self-center", incompleteForm ? "bg-gray-400" : "bg-custom-pink")}
//                 onPress={register}
//             >
//                 <Text className="text-center text-white text-xl">
//                     {uploading ? `Loading${'.'.repeat(loadingDots)}` : "Register"}
//                 </Text>
//             </TouchableOpacity>
//         </SafeAreaView>
//     );
// };

// export default RegisterWithNickScreen;





import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'; // Import the modal library
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { XMarkIcon } from 'react-native-heroicons/solid';
import { useTranslation } from 'react-i18next';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const { t } = useTranslation();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      Alert.alert('Success', 'Account created successfully! Please verify your email.');
      await sendEmailVerification(user);
      await auth.signOut();
      // Show modal after registration success
      setModalVisible(true);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1">
        <View className="flex-1 bg-gray-100" >
            <View className="p-5 border-b border-[#0C4F39] bg-white shadow-xs">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="rounded-full bg-gray-100 absolute top-4 left-5"
                >
                    <XMarkIcon color="#0C4F39" height={32} width={32} />
                </TouchableOpacity>

                <View>
                    <Text className="font-bold text-center">{t("Log_in_or_sign_up_to_order")}</Text>
                </View>
            </View>

            <View className="flex-1 p-4">
            <Text style={styles.label}>{t("Email")}:</Text>
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
                    <Button title="Register" onPress={handleRegister} color="white"/>
                </View>

            {/* Modal component with custom animation */}
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)} // Close modal on backdrop press
                animationIn="slideInRight"
                animationOut="slideOutRight"
                style={styles.modal}
                backdropOpacity={0.3} // Optional: Adjust the opacity of the backdrop
                useNativeDriver // Improves animation performance
            >
                <View style={styles.modalContent}>
                <Text style={styles.modalText}>Check your email for verification!</Text>
                <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
            </View>
        </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

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
  modal: {
    margin: 0, // Disable default modal margin
    justifyContent: 'flex-end', // Align the modal to the right side of the screen horizontally
    alignItems: 'flex-end', // Align the modal to the right side
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 4,
    width: '70%', // Adjust width as needed
    alignSelf: 'flex-end', // Align content to the right side of the screen
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default RegisterScreen;
