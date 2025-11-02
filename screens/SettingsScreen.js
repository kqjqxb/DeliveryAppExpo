import { View, Text, SafeAreaView, TouchableOpacity, Linking, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { ArrowLeftIcon, UserIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, BellIcon, LockClosedIcon, GlobeAltIcon } from 'react-native-heroicons/outline';
import i18n from 'i18next'; // Імпорт для i18next
import { useTranslation } from 'react-i18next';
import LanguageModal from '../components/LanguageModal'; // Імпортуємо компонент LanguageModal
import '../i18n'; 

const SettingsScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const [isModalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();

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
              { label: t('name'), icon: <UserIcon size={24} color="#0C4F39" /> },
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
              </TouchableOpacity>
            ))}
          </View>
        </View>

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
