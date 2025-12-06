import { View, Text, SafeAreaView, TouchableOpacity, Linking, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { ArrowLeftIcon, UserIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, BellIcon, LockClosedIcon, GlobeAltIcon } from 'react-native-heroicons/outline';
import i18n from 'i18next'; // Імпорт для i18next
import { useTranslation } from 'react-i18next';
import LanguageModal from '../components/LanguageModal'; // Імпортуємо компонент LanguageModal
import NameModal from '../components/NameModal'; // New modal for name change
import '../i18n'; 
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isNameModalVisible, setNameModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const { t } = useTranslation();

  // Fetch user name from Firestore
  const fetchName = async () => {
    const user = auth.currentUser;
    console.log('fetchName: currentUser', user);
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, 'Users', user.uid));
        console.log('fetchName: userDoc.exists()', userDoc.exists());
        if (userDoc.exists()) {
          setUserName(userDoc.data().name || '');
          console.log('fetchName: name', userDoc.data().name);
        } else {
          setUserName('');
          console.log('fetchName: no userDoc');
        }
      } catch (err) {
        console.log('fetchName: error', err);
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
              { label: t('phone_number'), icon: <PhoneIcon size={24} color="#0C4F39" /> },
              { label: t('email'), icon: <EnvelopeIcon size={24} color="#0C4F39" /> },
              { label: t('my_address'), icon: <MapPinIcon size={24} color="#0C4F39" /> },
              { label: t('notifications'), icon: <BellIcon size={24} color="#0C4F39" /> },
              { label: t('password'), icon: <LockClosedIcon size={24} color="#0C4F39" /> },
              { label: t('language'), icon: <GlobeAltIcon size={24} color="#0C4F39" />, onPress: () => setModalVisible(true) }, // Відкриття модального вікна
            ].map((item, index) => (
              <TouchableOpacity 
                key={index} 
                className="flex-row items-center justify-between mb-5 border-b border-gray-200 pb-3"
                onPress={item.onPress}
              >
                <View className="flex-row items-center ">
                  {item.icon}
                  <Text className="ml-3 text-lg font-semibold text-gray-700">{item.label}</Text>
                </View>
                {item.value && <Text className="text-gray-500">{item.value}</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Name change modal */}
        <NameModal
          isVisible={isNameModalVisible}
          onClose={() => {
            setNameModalVisible(false);
            console.log('NameModal: closed by user');
          }}
          onSave={handleSaveName}
          initialName={userName}
        />

        {/* Використовуємо компонент LanguageModal */}
        <LanguageModal
          isVisible={isModalVisible} // Передаємо видимість модального вікна
          onClose={() => setModalVisible(false)} // Закриття модального вікна
        />

        {/* Footer */}
        <View className="items-center pt-8">
          <Text className="text-gray-600 font-medium" style={{fontSize: 12}}>&copy; {t("all_rights_reserved")}</Text>
          <Text className="font-medium text-gray-600 pt-1" style={{fontSize: 12}}>
            {t("created_by")} <Text className="font-bold text-[#0C4F39]">{t("maksym_lomakin")}</Text>
          </Text>

          <View className="flex-row items-center pt-1">
            <Text className="font-semibold text-gray-600" style={{fontSize: 12}}>{t('follow_us')}:</Text>
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
