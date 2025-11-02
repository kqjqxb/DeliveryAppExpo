// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
// import Modal from 'react-native-modal'; // Import the modal library
// import { auth } from '../firebase';
// import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
// import { XMarkIcon } from 'react-native-heroicons/solid';

// const TestScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isRegistering, setIsRegistering] = useState(false); // State to toggle between login and register
//   const [isModalVisible, setModalVisible] = useState(false);

//   const handleRegister = async () => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       Alert.alert('Success', 'Account created successfully! Please verify your email.');
//       await sendEmailVerification(user);
//       await auth.signOut();
//       setModalVisible(true);
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       if (!user.emailVerified) {
//         Alert.alert('Error', 'Please verify your email address before logging in.');
//         await auth.signOut();
//         return;
//       }

//       Alert.alert('Success', 'Logged in successfully!');
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1">
//       <View className="flex-1 bg-gray-100">
//         <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             className="rounded-full bg-gray-100 absolute top-4 left-5"
//           >
//             <XMarkIcon color="#00CCBB" height={32} width={32} />
//           </TouchableOpacity>

//           <View>
//             <Text className="font-bold text-center">
//               {isRegistering ? 'Register and go to order!' : 'Log in or sign up to order!'}
//             </Text>
//           </View>
//         </View>

//         <View className="mx-4 top-3">
//           <Text style={styles.label}>Email:</Text>
//           <TextInput
//             style={styles.input}
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             placeholder="Enter your email"
//           />
//           <Text style={styles.label}>Password:</Text>
//           <TextInput
//             style={styles.input}
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//             placeholder="Enter your password"
//           />
          
//           <View className="border-b-3 bg-[#00CCBB] rounded-sm">
//             {isRegistering ? (
//               <Button title="Register" onPress={handleRegister} color="white" />
//             ) : (
//               <Button title="Login" onPress={handleLogin} color="white" />
//             )}
//           </View>

//           <View className="flex-row items-center top-3">
//             {isRegistering ? (
//               <Text className="flex-1">Already have an account?</Text>
//             ) : (
//               <Text className="flex-1">Do you not have an account?</Text>
//             )}
//             <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
//               <Text className="text-[#00CCBB] right-1 text-xl">
//                 {isRegistering ? 'Login' : 'Register'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Modal for verification message */}
//         <Modal
//           isVisible={isModalVisible}
//           onBackdropPress={() => setModalVisible(false)}
//           animationIn="slideInRight"
//           animationOut="slideOutRight"
//           style={styles.modal}
//           backdropOpacity={0.3}
//           useNativeDriver
//         >
//           <View style={styles.modalContent}>
//             <Text style={styles.modalText}>Check your email for verification!</Text>
//             <Button title="Close" onPress={() => setModalVisible(false)} />
//           </View>
//         </Modal>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 4,
//     marginBottom: 16,
//     paddingHorizontal: 8,
//   },
//   modal: {
//     margin: 0,
//     justifyContent: 'flex-end',
//     alignItems: 'flex-end',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 16,
//     borderRadius: 4,
//     width: '70%',
//     alignSelf: 'flex-end',
//   },
//   modalText: {
//     fontSize: 16,
//     marginBottom: 16,
//   },
// });

// export default TestScreen;





import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase'; // Переконайтесь, що правильно імпортовано

const AuthScreen = () => {
  const [isRegister, setIsRegister] = useState(false); // Стан для перемикання між реєстрацією та авторизацією
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => { // Додано async
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      Alert.alert('Success', 'Account created successfully! Please verify your email.');
      await sendEmailVerification(user);
      await auth.signOut();
      // setModalVisible(true); // Модальне вікно, додайте при потребі
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleLogin = async () => { // Додано async
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsRegister(!isRegister)} style={styles.closeButton}>
          <XMarkIcon color="#00CCBB" height={32} width={32} />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {isRegister ? 'Register and go to order!' : 'Login and go to order!'}
        </Text>
      </View>

      {isRegister ? (
        // Форма реєстрації
        <View style={styles.formContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Enter your email"
          />

          <Text style={styles.label}>Password:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="Enter your password"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconButton}>
              {showPassword ? (
                <EyeSlashIcon color="gray" size={24} />
              ) : (
                <EyeIcon color="gray" size={24} />
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirm Password:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholder="Confirm your password"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.iconButton}>
              {showConfirmPassword ? (
                <EyeSlashIcon color="gray" size={24} />
              ) : (
                <EyeIcon color="gray" size={24} />
              )}
            </TouchableOpacity>
          </View>

          <Button title="Register" onPress={handleRegister} color="#00CCBB" />
          <TouchableOpacity onPress={() => setIsRegister(false)}>
            <Text style={styles.switchText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Форма авторизації
        <View style={styles.formContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Enter your email"
          />

          <Text style={styles.label}>Password:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="Enter your password"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconButton}>
              {showPassword ? (
                <EyeSlashIcon color="gray" size={24} />
              ) : (
                <EyeIcon color="gray" size={24} />
              )}
            </TouchableOpacity>
          </View>

          <Button title="Login" onPress={handleLogin} color="#00CCBB" />
          <TouchableOpacity onPress={() => setIsRegister(true)}>
            <Text style={styles.switchText}>Don't have an account? Register</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#00CCBB',
    backgroundColor: 'white',
    shadowOpacity: 0.1,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
  },
  iconButton: {
    padding: 8,
  },
  switchText: {
    color: '#00CCBB',
    marginTop: 16,
    textAlign: 'center',
  },
  closeButton: {
    borderRadius: 50,
    backgroundColor: 'gray',
    padding: 8,
    position: 'absolute',
    top: 15,
    left: 15,
  },
});

export default AuthScreen;
