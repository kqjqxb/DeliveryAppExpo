// components/RestaurantMoreScreen.js

import { View, Text, SafeAreaView, TouchableOpacity, Linking, ScrollView, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import MapView, { Marker } from 'react-native-maps';
import { useTranslation } from 'react-i18next';

const RestaurantMoreScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  const { t } = useTranslation();

  const handleShowOnMap = () => {
    const url = `${restaurant.google_map_link}`;
    Linking.openURL(url).catch(err => console.error(`${t("open_map_error")}`, err));
  };

  const handleCall = () => {
    const phoneNumber = `${restaurant.phone}`;
    Linking.openURL(`tel:${phoneNumber}`).catch(err => console.error(`${t("call_error")}`, err));
  };

  // Перевірка координат
  if (!restaurant.lat || !restaurant.long) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-gray-700">{t("no_coordinates_of_restaurant")}</Text>
      </SafeAreaView>
    );
  }

  // Функція для відображення годин роботи
  const renderOpeningHours = () => {
    const days = [
      { key: 'monday' },
      { key: 'tuesday' },
      { key: 'wednesday' },
      { key: 'thursday' },
      { key: 'friday' },
      { key: 'saturday' },
      { key: 'sunday' },
    ];

    return days.map(day => {
      const dayInfo = restaurant.opening_hours ? restaurant.opening_hours[day.key] : null;
      if (dayInfo?.isClosed) {
        return (
          <Text key={day.key} className="text-gray-500 mt-2">
            {t(day.key)}: {t("closed")}
          </Text>
        );
      }
      return (
        <Text key={day.key} className="text-gray-500 mt-2">
          {t(day.key)}: {dayInfo?.hours || `${t("not_specified")}`}
        </Text>
      );
    });
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header з кнопкою повернення */}
      <View className="relative h-16 flex-row items-center justify-center mt-10">
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute left-5 p-2 bg-gray-100 rounded-full"
        >
          <ArrowLeftIcon size={20} color="#0C4F39" />
        </TouchableOpacity>
        <Text className="font-extrabold text-xl text-center">{restaurant.title}</Text>
      </View>

      <ScrollView className="flex-1 bg-gray-100">
        {/* Контейнер для карти з фіксованою висотою */}
        <View className="h-60 w-full">
          <MapView
            initialRegion={{
              latitude: restaurant.lat,
              longitude: restaurant.long,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            className="flex-1"
            mapType="mutedStandard"
          >
            <Marker
              title={restaurant.name}
              description={restaurant.short_description}
              coordinate={{
                latitude: restaurant.lat,
                longitude: restaurant.long,
              }}
              identifier="origin"
              pinColor="#0C4F39"
            />
          </MapView>
        </View>

        <View className="p-5">
          {/* Кнопка "Показати на карті" */}
          <TouchableOpacity
            onPress={handleShowOnMap}
            className="bg-[#0C4F39] p-4 rounded-md"
          >
            <Text className="text-center text-white font-bold">{t("show_on_map")}</Text>
          </TouchableOpacity>

          {/* Блок "Варіанти доставки" */}
          <View className="mt-5 bg-white p-4 rounded-lg shadow">
            <Text className="text-xl font-bold">{t("delivery_options")}</Text>
            <View className="flex-row items-center space-x-1">
                <Image 
                    source={require('../assets/fast-delivery.png')}
                    className="h-5 w-5 color-[#0C4F39]"
                />
                <Text className=" text-black font-semibold" style={{fontSize: 12}}> {t("Delivery")} · <Image 
                    source={require('../assets/calendar_icon.png')}
                    className="h-5 w-5 t-3 color-[#0C4F39]"
                /> {t("Pre-order")}</Text>
            </View>
          </View>

          {/* Блок "Контакти" */}
          <View className="mt-5 bg-white p-4 rounded-lg shadow">
            <Text className="text-xl font-bold">{t("Contacts")}</Text>
            <Text className="text-gray-500 mt-2">{t("Address")}: {restaurant.address}</Text>
            <View className="flex-row items-center mt-2">
              <Text className="text-gray-500">{t("Phone")}: {restaurant.phone}</Text>
            </View>
            <View className="pt-5">
              <TouchableOpacity
                onPress={handleCall}
                className="bg-[#0C4F39] p-4 rounded-md"
              >
                <Text className="text-center text-white font-bold">{t("Call")}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Блок "Години роботи" */}
          <View className="mt-5 bg-white p-4 rounded-lg shadow">
            <Text className="text-xl font-bold">{t("Hours_of_operation")}</Text>
            {renderOpeningHours()}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RestaurantMoreScreen;
