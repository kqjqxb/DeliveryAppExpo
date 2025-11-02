import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';
import { useTranslation } from 'react-i18next';

const TestScreen1 = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);

  const { t, i18n } = useTranslation();
  const textSize = i18n.language === 'uk' ? 'text-base' : 'text-lg';

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert(`${t("Error")}`, `${t("Passwords_do_not_match")}`);
      return;
    }
    try {
      setRegisterModalVisible(true);
    } catch (error) {
      Alert.alert(`${t("Error")}`, error.message);
    }
  };

  const handleRegisterSubmit = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Додаємо користувача в колекцію "users"
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      Alert.alert(`${t("Success")}`, `${t("Account_created_successfully")}`);
      await sendEmailVerification(user);
      await auth.signOut();
      setRegisterModalVisible(false);
      setModalVisible(true);
    } catch (error) {
      Alert.alert(`${t("Error")}`, error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        Alert.alert(`${t("Error")}`, `${t("Please_verify_your_email")}`);
        await auth.signOut();
        return;
      }

      Alert.alert(`${t("Success")}`, `${t("Logged_in_successfully")}`);
      navigation.replace('CompletedProfile');
    } catch (error) {
      Alert.alert(`${t("Error")}`, error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-gray-100">
        <View className="p-4 border-b border-[#00CCBB] bg-white shadow-xs">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-1 left-4 p-2 rounded-full"
          >
            <XMarkIcon color="#00CCBB" height={35} width={35} />
          </TouchableOpacity>

          <Text className="font-bold text-center">
            {isRegistering ? `${t("Register_and_go_to_order")}` : `${t("Log_in_or_sign_up_to_order")}`}
          </Text>
        </View>

        <View className="p-4">
          <Text className="text-lg mb-2">{t("Email")}:</Text>
          <TextInput
            className="h-10 border border-gray-300 rounded-md px-3 mb-4"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder={t("Enter_your_email")}
          />

          <Text className="text-lg mb-2">{t("Password")}:</Text>
          <View className="flex-row items-center border border-gray-300 rounded-md mb-4">
            <TextInput
              className="flex-1 h-10 px-3"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              placeholder={t("Enter_your_password")}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} className="p-2">
              {isPasswordVisible ? <EyeSlashIcon color="gray" height={24} width={24} /> : <EyeIcon color="gray" height={24} width={24} />}
            </TouchableOpacity>
          </View>

          {isRegistering && (
            <>
              <Text className="text-lg mb-2">{t("Confirm_Password")}</Text>
              <View className="flex-row items-center border border-gray-300 rounded-md mb-4">
                <TextInput
                  className="flex-1 h-10 px-3"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!isConfirmPasswordVisible}
                  placeholder={t("Confirm_your_password")}
                />
                <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} className="p-2">
                  {isConfirmPasswordVisible ? <EyeSlashIcon color="gray" height={24} width={24} /> : <EyeIcon color="gray" height={24} width={24} />}
                </TouchableOpacity>
              </View>
            </>
          )}

          <View className="bg-[#00CCBB] rounded-md overflow-hidden">
            {isRegistering ? (
              <Button title={t("Register")} onPress={handleRegister} color="white" />
            ) : (
              <Button title={t("Login")} onPress={handleLogin} color="white" />
            )}
          </View>

          <View className="flex-row items-center mt-4">
            {isRegistering ? (
              <Text className="flex-1">{t("Already_have_an_account")}</Text>
            ) : (
              <Text className="flex-1">{t("Do_you_not_have_an_account")}</Text>
            )}
            <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
              <Text className={`text-[#00CCBB] ${textSize}`}>
                {isRegistering ? `${t("Login")}` : `${t("Register")}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal for verification message */}
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          animationIn="slideInRight"
          animationOut="slideOutRight"
          className="m-0 justify-end"
          backdropOpacity={0.3}
          useNativeDriver
        >
          <View className="bg-white p-4 rounded-md w-3/4 self-center">
            <Text className="text-lg mb-4">{t("Check_your_email_for_verification")}</Text>
            <Button title={t("Close")} onPress={() => setModalVisible(false)} />
          </View>
        </Modal>

        {/* Modal for registration form */}
        <Modal
          isVisible={isRegisterModalVisible}
          onBackdropPress={() => setRegisterModalVisible(false)}
          animationIn="slideInRight"
          animationOut="slideOutRight"
          className="m-0 justify-end"
          backdropOpacity={0.3}
          useNativeDriver
        >
          <View className="bg-white p-4 rounded-md w-3/4 self-center">
            <Text className="text-lg mb-2">{t("Email")}</Text>
            <TextInput
              className="h-10 border border-gray-300 rounded-md px-3 mb-4"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder={t("Enter_your_email")}
            />

            <Text className="text-lg mb-2">{t("Password")}</Text>
            <View className="flex-row items-center border border-gray-300 rounded-md mb-4">
              <TextInput
                className="flex-1 h-10 px-3"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                placeholder={t("Enter_your_password")}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} className="p-2">
                {isPasswordVisible ? <EyeSlashIcon color="gray" height={24} width={24} /> : <EyeIcon color="gray" height={24} width={24} />}
              </TouchableOpacity>
            </View>

            <Text className="text-lg mb-2">{t("Confirm_Password")}</Text>
            <View className="flex-row items-center border border-gray-300 rounded-md mb-4">
              <TextInput
                className="flex-1 h-10 px-3"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!isConfirmPasswordVisible}
                placeholder={t("Confirm_your_password")}
              />
              <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} className="p-2">
                {isConfirmPasswordVisible ? <EyeSlashIcon color="gray" height={24} width={24} /> : <EyeIcon color="gray" height={24} width={24} />}
              </TouchableOpacity>
            </View>

            <Button title={t("Submit")} onPress={handleRegisterSubmit} color="#00CCBB" />
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default TestScreen1;
