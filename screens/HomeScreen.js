// import { View, Text, Image, TextInput, ScrollView } from 'react-native'
// import React, { useEffect, useLayoutEffect, useState } from 'react'
// import { useNavigation } from '@react-navigation/native'
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//     UserIcon,
//     ChevronDownIcon,
//     MagnifyingGlassIcon,
//     AdjustmentsVerticalIcon,
// } from "react-native-heroicons/outline";
// import Categories from '../components/Categories';
// import FeaturedRow from '../components/FeaturedRow';
// import client from '../sanity/sanityClient'; // Use the Sanity client here

// const HomeScreen = () => {
//     const navigation = useNavigation();
//     const [featuredCategories, setFeaturedCategories] = useState([]);

//     useLayoutEffect(() => {
//         navigation.setOptions({
//             headerShown: false,
//         });
//     }, []);

//     useEffect(() => {
//         client.fetch(`
//             *[_type == "featured"] {
//                 ...,
//                 restaurants[]->{
//                     ...,
//                     dishes[]->
//                 }
//             }`
//         ).then(data => {
//             console.log("Fetched data:", data);
//             setFeaturedCategories(data);
//         });
//     }, []);

//     return (
//         <SafeAreaView className="bg-white pt-5">
//             {/* Header */}
//             <View className="flex-row pb-3 items-center mx-4 space-x-2">
//                 <Image
//                     source={{ uri: 'https://links.papareact.com/wru' }}
//                     className="h-7 w-7 bg-gray-300 p-4 rounded-full"
//                 />
//                 <View className="flex-1">
//                     <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
//                     <Text className="font-bold text-xl">
//                         Current Location
//                         <ChevronDownIcon size={20} color="#0C4F39" />
//                     </Text>
//                 </View>
//                 <View>
//                     <UserIcon size={35} color="#0C4F39" onPress={() => navigation.navigate("Profile")}/>
//                 </View>
//             </View>

//             {/* Search */}
//             <View className="flex-row items-center space-x-2 pb-2 mx-4">
//                 <View className="flex-row space-x-2 flex-1 bg-gray-200 p-2">
//                     <MagnifyingGlassIcon color="gray" size={20} />
//                     <TextInput
//                         placeholder="Restaurants and cuisines"
//                         keyboardType="default"
//                     />
//                 </View>
//                 <AdjustmentsVerticalIcon color="#0C4F39" />
//             </View>

//             {/* Body */}
//             <ScrollView
//                 className="bg-gray-100"
//                 contentContainerStyle={{ paddingBottom: 100 }}
//             >
//                 {/* Categories */}
//                 <Categories />




//                 {/* Featured Row */}
//            {featuredCategories?.map(category => (
//                 <FeaturedRow 
//                 key={category._id}
//                 id={category._id}
//                 title={category.name}
//                 description={category.short_description}
//             />
//             ))}


//             {/* <FeaturedRow 
//                 id="123"
//                 title="Featured"
//                 description="Paid placements from our partners"
//             />

//             <FeaturedRow 
//                 id="1234"
//                 title="Featured"
//                 description="Paid placements from our partners"
//             />

//             <FeaturedRow 
//                 id="12345"
//                 title="Featured"
//                 description="Paid placements from our partners"
//             /> */}
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// export default HomeScreen;




import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, RefreshControl, Linking, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserIcon, ChevronDownIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import client from '../sanity/sanityClient';
import { auth } from '../firebase'; // Імпортуй свій конфіг Firebase
import { useTranslation } from 'react-i18next';
import * as Location from 'expo-location'; // Додаємо імпорт для локації
import DishRow from '../components/DishRow';
import ResturantCard from '../components/ResturantCard';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  const [locationLoading, setLocationLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { t } = useTranslation();



  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Перезавантаження даних
      const data = await client.fetch(`
        *[_type == "featured"] {
            ...,
            restaurants[]->{
                ...,
                dishes[]->
            }
        }`
      );
      console.log("Fetched data:", data);
      setFeaturedCategories(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setRefreshing(false);
    }
  };


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const user = auth.currentUser;
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const handleUserIconPress = () => {
    const user = auth.currentUser;
    if (user) {
      navigation.navigate('CompletedProfile');
    } else {
      navigation.navigate('Profile');
    }
  };

  useEffect(() => {
    client.fetch(`
        *[_type == "featured"] {
            ...,
            restaurants[]->{
                ...,
                dishes[]->
            }
        }`
    ).then(data => {
      console.log("Fetched data:", data);
      setFeaturedCategories(data);
    });
  }, []);

  // Отримати адресу поточної локації
  const fetchCurrentAddress = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setCurrentAddress(t('location_permission_denied'));
        setLocationLoading(false);
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      let results = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      if (results && results.length > 0) {
        const addr = results[0];
        let addressString = '';
        if (addr.street) addressString += addr.street;
        if (addr.name && addr.name !== addr.street) addressString += ` ${addr.name}`;
        if (addr.city) addressString += `, ${addr.city}`;
        if (addr.region) addressString += `, ${addr.region}`;
        if (addr.postalCode) addressString += `, ${addr.postalCode}`;
        setCurrentAddress(addressString.trim());
      } else {
        setCurrentAddress('');
      }
    } catch (err) {
      setCurrentAddress('');
    }
    setLocationLoading(false);
  };

  useEffect(() => {
    fetchCurrentAddress();
  }, []);

  // Фільтрація ресторанів по назві
  useEffect(() => {
    if (searchText.trim() === '') {
      setSearchResults([]);
      return;
    }
    // Збираємо всі ресторани з featuredCategories
    const allRestaurants = featuredCategories.flatMap(fc => fc.restaurants || []);
    // Унікалізуємо ресторани по _id
    const uniqueRestaurantsMap = {};
    allRestaurants.forEach(r => {
      if (r && r._id) {
        uniqueRestaurantsMap[r._id] = r;
      }
    });
    const uniqueRestaurants = Object.values(uniqueRestaurantsMap);
    // Фільтруємо по назві
    const filtered = uniqueRestaurants.filter(r =>
      r.name && r.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchText, featuredCategories]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0C4F39" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-white pt-5" style={{ paddingBottom: 120 }}>
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{ uri: 'https://links.papareact.com/wru' }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">{t("deliver_now")}</Text>
          <TouchableOpacity activeOpacity={0.59} style={{
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Text className="font-bold text-xl flex-row items-center">
                {t("current_location")}
              </Text>
              <ChevronDownIcon size={20} color="#0C4F39" />
            </View>
            <Text className="text-xs text-gray-500" numberOfLines={2}>
              {locationLoading
                ? t("loading_location")
                : currentAddress
                  ? currentAddress
                  : ''}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleUserIconPress}>
          <UserIcon size={35} color="#0C4F39" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-2">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder={t("restaurants_and_cuisines")}
            keyboardType="default"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <AdjustmentsVerticalIcon color="#0C4F39" />

      </View>
      <View className="pb-3">
        {/* Categories */}
        <Categories />
      </View>


      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#0C4F39"]}
          />
        }
      >

        {/* If search is empty, show Featured categories */}
        {searchText.trim() === '' && (
          <>
            {featuredCategories?.map(category => (
              <FeaturedRow
                key={`featured-${category._id}`}
                id={category._id}
                title={category.name}
                description={category.short_description}
              />
            ))}
          </>
        )}

        {/* If search is NOT empty, show only search results as ResturantCard */}
        {searchText.trim() !== '' && (
          <View className="flex-row flex-wrap px-4" style={{
            marginTop: Dimensions.get('window').height * 0.025,
            flex: 1,
          }}>
            {searchResults.length === 0 ? (
              <Text className="text-gray-500 w-full" style={{
                textAlign: 'center',
                marginTop: Dimensions.get('window').height * 0.1,
              }}>{t("no_restaurants_found")}</Text>
            ) : (
              searchResults.map((r, idx) => (
                <ResturantCard
                  key={`search-${r._id}-${idx}`}
                  id={r._id}
                  imgUrl={r.image}
                  title={r.name}
                  rating={r.rating}
                  genre={r.genre}
                  address={r.address}
                  short_description={r.short_description}
                  categories_of_dishes={r.categories_of_dishes}
                  dishes={r.dishes}
                  long={r.long}
                  lat={r.lat}
                  phone={r.phone}
                  google_map_link={r.google_map_link}
                  opening_hours={r.opening_hours}
                  extras={r.extras}
                />
              ))
            )}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
