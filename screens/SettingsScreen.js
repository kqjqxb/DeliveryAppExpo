import { View, Text, SafeAreaView, TouchableOpacity, Linking, ScrollView, Image, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { ArrowLeftIcon, UserIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, BellIcon, LockClosedIcon, GlobeAltIcon } from 'react-native-heroicons/outline';
import i18n from 'i18next'; // Імпорт для i18next
import { useTranslation } from 'react-i18next';
import LanguageModal from '../components/LanguageModal'; // Імпортуємо компонент LanguageModal
import NameModal from '../components/NameModal'; // New modal for name change
import PasswordModal from '../components/PasswordModal'; // New modal for password change
import PhoneModal from '../components/PhoneModal'; // New modal for phone change
import MapModal from '../components/MapModal'; // Додаємо імпорт MapModal
import * as Location from 'expo-location'; // Додаємо імпорт для доступу до локації
import '../i18n';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { updateEmail, sendEmailVerification, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isNameModalVisible, setNameModalVisible] = useState(false);
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [isPhoneModalVisible, setPhoneModalVisible] = useState(false);
  const [isMapModalVisible, setMapModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [emailPending, setEmailPending] = useState(null); // for pending email verification
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');
  const { t } = useTranslation();

  // Fetch user name, email, phone, and address from Firestore/Auth
  const fetchName = async () => {
    const user = auth.currentUser;
    console.log('fetchName: currentUser', user);
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, 'Users', user.uid));
        console.log('fetchName: userDoc.exists()', userDoc.exists());
        if (userDoc.exists()) {
          setUserName(userDoc.data().name || '');
          setUserEmail(user.email || '');
          setUserPhone(userDoc.data().phone || '');
          // Fetch address if exists
          if (userDoc.data().address) {
            console.log('fetchName: fetched address from Firestore:', userDoc.data().address);
            setSelectedAddress(userDoc.data().address);
          } else {
            console.log('fetchName: no address in Firestore');
            setSelectedAddress('');
          }
        } else {
          setUserName('');
          setUserEmail('');
          setUserPhone('');
          setSelectedAddress('');
          console.log('fetchName: no userDoc');
        }
      } catch (err) {
        console.log('fetchName: error', err);
        setSelectedAddress('');
      }
    }
  };

  React.useEffect(() => {
    fetchName();
  }, []);

  const handleCall = () => {
    const phoneNumber = `+380995659254`;
    Linking.openURL(`tel:${phoneNumber}`).catch(err => console.error(`${t("call_error")}`, err));
  };

  const openLink = async () => {
    const url = 'https://www.instagram.com/kqjqxb';
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`${t("Cannot_open_URL")}: ${url}`);
    }
  };

  // Handler to update name in Firestore and update UI
  const handleSaveName = async (newName) => {
    console.log('handleSaveName: newName', newName);
    const user = auth.currentUser;
    console.log('handleSaveName: currentUser', user);
    if (user) {
      try {
        await setDoc(doc(db, 'Users', user.uid), { name: newName }, { merge: true });
        console.log('handleSaveName: setDoc success');
        await fetchName();
      } catch (err) {
        console.log('handleSaveName: setDoc error', err);
      }
    } else {
      console.log('handleSaveName: no user');
    }
    setNameModalVisible(false);
    console.log('handleSaveName: modal closed');
  };

  // Email change handler with verification and re-auth
  const handleSaveEmail = async (currentPassword, newEmail) => {
    const user = auth.currentUser;
    if (user && newEmail && newEmail !== user.email) {
      try {
        // Re-authenticate
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        // Set pending email in Firestore
        await setDoc(doc(db, 'Users', user.uid), { pendingEmail: newEmail }, { merge: true });
        // Update email and send verification
        await updateEmail(user, newEmail);
        await sendEmailVerification(user);
        setEmailPending(newEmail);
        alert(t('verify_new_email_message'));
      } catch (err) {
        alert(t('email_change_error'));
      }
    }
    setEmailModalVisible(false);
  };

  // Listen for email verification and finalize email change
  React.useEffect(() => {
    const interval = setInterval(async () => {
      const user = auth.currentUser;
      if (user && emailPending) {
        await user.reload();
        if (user.emailVerified && user.email === emailPending) {
          // Remove pendingEmail from Firestore, update email field
          await setDoc(doc(db, 'Users', user.uid), { email: emailPending, pendingEmail: null }, { merge: true });
          setUserEmail(emailPending);
          setEmailPending(null);
          alert(t('email_verified_success'));
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [emailPending]);

  // Password change handler with re-auth and double entry
  const handleSavePassword = async (currentPassword, newPassword) => {
    const user = auth.currentUser;
    if (user && newPassword) {
      try {
        // Re-authenticate
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        alert(t('password_changed_success'));
      } catch (err) {
        alert(t('password_change_error'));
      }
    }
    setPasswordModalVisible(false);
  };

  // Phone change handler
  const handleSavePhone = async (newPhone) => {
    const user = auth.currentUser;
    if (user && newPhone) {
      try {
        await setDoc(doc(db, 'Users', user.uid), { phone: newPhone }, { merge: true });
        setUserPhone(newPhone);
      } catch (err) {
        alert(t('phone_change_error'));
      }
    }
    setPhoneModalVisible(false);
  };

  // Отримати поточну локацію користувача
  const fetchUserLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert(t('location_permission_denied'));
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (err) {
      alert(t('location_fetch_error'));
    }
  };

  // Відкрити модалку з картою
  const handleOpenMapModal = async () => {
    await fetchUserLocation();
    setMapModalVisible(true);
  };

  // Отримати адресу з координат
  const fetchAddressFromCoords = async (location) => {
    try {
      const results = await Location.reverseGeocodeAsync(location);
      if (results && results.length > 0) {
        const addr = results[0];
        // Формуємо рядок адреси
        let addressString = '';
        if (addr.street) addressString += addr.street;
        if (addr.name && addr.name !== addr.street) addressString += ` ${addr.name}`;
        if (addr.city) addressString += `, ${addr.city}`;
        if (addr.region) addressString += `, ${addr.region}`;
        if (addr.postalCode) addressString += `, ${addr.postalCode}`;
        return addressString.trim();
      } else {
        return '';
      }
    } catch (err) {
      return '';
    }
  };

  // Зберегти вибрану адресу у Firestore
  const handleSaveAddress = async (location) => {
    setSelectedLocation(location);
    setMapModalVisible(false);
    const addressString = await fetchAddressFromCoords(location);
    setSelectedAddress(addressString);
    // Save to Firestore
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(db, 'Users', user.uid), { address: addressString }, { merge: true });
      } catch (err) {
        // Optionally show error
      }
    }
  };

  const checkCurrentPassword = async (password) => {
    const user = auth.currentUser;
    if (!user || !password) return false;
    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      return true;
    } catch (err) {
      return false;
    }
  };

  return (
    <View className="flex-1 bg-gray-50 pb-5">
      {/* Back button */}
      <TouchableOpacity
        onPress={navigation.goBack}
        className="absolute left-5 top-12 z-50 p-3 bg-white rounded-full shadow"
      >
        <ArrowLeftIcon size={16} color="#0C4F39" />
      </TouchableOpacity>

      <ScrollView className="flex-1">
        {/* Top image */}
        <View className="relative h-72">
          <Image
            source={require("../assets/dinner.jpg")}
            className="h-full w-full object-cover"
            blurRadius={0}
          />
          <Text className="absolute top-12 left-16 text-white font-bold text-3xl shadow-lg">
            {t('food_quote')} {/* Використовуйте t для перекладу */}
          </Text>
        </View>

        {/* Content below image */}
        <View className="px-6 -mt-20">
          {/* Floating white box */}
          <View className="bg-white p-5 rounded-xl shadow-lg w-full">
            <Text className="text-2xl font-bold mb-6">{t('account_settings')}</Text>

            {/* Icon list */}
            {[
              {
                label: t('name'),
                value: userName || t('guest'),
                icon: <UserIcon size={24} color="#0C4F39" />,
                onPress: () => setNameModalVisible(true)
              },
              {
                label: t('phone_number'),
                value: userPhone,
                icon: <PhoneIcon size={24} color="#0C4F39" />,
                onPress: () => setPhoneModalVisible(true)
              },
              {
                label: t('email'),
                value: userEmail,
                icon: <EnvelopeIcon size={24} color="#0C4F39" />,
              },
              { 
                label: t('my_address'), 
                icon: <MapPinIcon size={24} color="#0C4F39" />, 
                onPress: handleOpenMapModal, 
                value: selectedAddress || (selectedLocation ? `${selectedLocation.latitude.toFixed(5)}, ${selectedLocation.longitude.toFixed(5)}` : undefined) 
              },
              { label: t('notifications'), icon: <BellIcon size={24} color="#0C4F39" /> },
              { label: t('password'), icon: <LockClosedIcon size={24} color="#0C4F39" />, onPress: () => setPasswordModalVisible(true) },
              { label: t('language'), icon: <GlobeAltIcon size={24} color="#0C4F39" />, onPress: () => setModalVisible(true) }, // Відкриття модального вікна
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center justify-between mb-5 border-b border-gray-200 pb-3"
                onPress={item.onPress}
                disabled={item.value === userEmail}
              >
                <View className="flex-row items-center ">
                  {item.icon}
                  <Text className="ml-3 text-lg font-semibold text-gray-700" style={{
                    fontSize: Dimensions.get('window').width * 0.04,
                  }}>{item.label}</Text>
                </View>
                {item.value && <Text className="text-gray-500" adjustsFontSizeToFit={true} numberOfLines={item.value === userEmail ? 1 : 2} style={{
                  maxWidth: '48%',
                }}>{item.value}</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Modals */}
        <NameModal
          isVisible={isNameModalVisible}
          onClose={() => setNameModalVisible(false)}
          onSave={handleSaveName}
          initialName={userName}
        />
        <PasswordModal
          isVisible={isPasswordModalVisible}
          onClose={() => setPasswordModalVisible(false)}
          onSave={handleSavePassword}
          checkCurrentPassword={checkCurrentPassword}
        />
        <PhoneModal
          isVisible={isPhoneModalVisible}
          onClose={() => setPhoneModalVisible(false)}
          onSave={handleSavePhone}
          initialPhone={userPhone}
        />
        <MapModal
          isVisible={isMapModalVisible}
          onClose={() => setMapModalVisible(false)}
          onSave={handleSaveAddress}
          initialLocation={userLocation}
        />

        {/* Використовуємо компонент LanguageModal */}
        <LanguageModal
          isVisible={isModalVisible} // Передаємо видимість модального вікна
          onClose={() => setModalVisible(false)} // Закриття модального вікна
        />

        {/* Footer */}
        <View className="items-center pt-8">
          <Text className="text-gray-600 font-medium" style={{ fontSize: 12 }}>&copy; {t("all_rights_reserved")}</Text>
          <Text className="font-medium text-gray-600 pt-1" style={{ fontSize: 12 }}>
            {t("created_by")} <Text className="font-bold text-[#0C4F39]">{t("maksym_lomakin")}</Text>
          </Text>

          <View className="flex-row items-center pt-1">
            <Text className="font-semibold text-gray-600" style={{ fontSize: 12 }}>{t('follow_us')}:</Text>
            <TouchableOpacity onPress={openLink} className="ml-1">
              <Image
                source={{ uri: "https://i.pinimg.com/564x/5a/95/11/5a9511d5243a7dbd30b3bc0115a9ff0f.jpg" }}
                className="h-7 w-7 rounded-full"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
